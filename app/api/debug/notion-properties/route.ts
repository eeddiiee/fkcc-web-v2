import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Notion Client 초기화
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function GET() {
  try {
    const databaseId = process.env.NOTION_SERMON_DB_ID;
    
    if (!databaseId) {
      return NextResponse.json(
        { error: 'NOTION_SERMON_DB_ID 환경 변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    // 1. 데이터베이스 스키마 가져오기
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    const properties = (database as any).properties || {};
    const propertyKeys = Object.keys(properties);
    
    const schema = propertyKeys.map((key) => {
      const prop = properties[key];
      const schemaInfo: any = {
        name: key,
        type: prop.type,
      };

      // 타입별 상세 정보
      if (prop.type === 'select' && prop.select?.options) {
        schemaInfo.options = prop.select.options.map((o: any) => o.name);
      } else if (prop.type === 'multi_select' && prop.multi_select?.options) {
        schemaInfo.options = prop.multi_select.options.map((o: any) => o.name);
      } else if (prop.type === 'status' && prop.status?.options) {
        schemaInfo.options = prop.status.options.map((o: any) => o.name);
      } else if (prop.type === 'formula' && prop.formula) {
        schemaInfo.formulaExpression = prop.formula.expression;
      } else if (prop.type === 'relation' && prop.relation) {
        schemaInfo.relationDatabaseId = prop.relation.database_id;
      }

      return schemaInfo;
    });

    // 2. 실제 페이지 데이터 가져오기 (첫 번째 페이지)
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        status: {
          equals: "Live",
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      page_size: 1,
    });

    let sampleValues: Record<string, any> = {};

    if (response.results.length > 0) {
      const page = response.results[0] as PageObjectResponse;
      const pageProperties = page.properties;

      propertyKeys.forEach((key) => {
        const prop = pageProperties[key];
        if (!prop) {
          sampleValues[key] = null;
          return;
        }

        let value: any = null;

        if (prop.type === 'title' && Array.isArray(prop.title)) {
          value = prop.title.map((t: any) => t.plain_text).join('');
        } else if (prop.type === 'rich_text' && Array.isArray(prop.rich_text)) {
          value = prop.rich_text.map((t: any) => t.plain_text).join('');
        } else if (prop.type === 'select' && prop.select) {
          value = prop.select.name;
        } else if (prop.type === 'multi_select' && Array.isArray(prop.multi_select)) {
          value = prop.multi_select.map((s: any) => s.name);
        } else if (prop.type === 'date' && prop.date) {
          value = prop.date.start;
        } else if (prop.type === 'files' && Array.isArray(prop.files)) {
          value = prop.files.map((file: any) => {
            if (file.type === 'external') {
              return file.external.url;
            } else if (file.type === 'file') {
              return file.file.url;
            }
            return null;
          }).filter(Boolean);
        } else if (prop.type === 'url' && prop.url) {
          value = prop.url;
        } else if (prop.type === 'formula' && prop.formula) {
          if (prop.formula.type === 'string') {
            value = prop.formula.string;
          } else if (prop.formula.type === 'number') {
            value = prop.formula.number;
          } else if (prop.formula.type === 'boolean') {
            value = prop.formula.boolean;
          } else {
            value = prop.formula;
          }
        } else if (prop.type === 'relation' && Array.isArray(prop.relation)) {
          value = prop.relation.map((rel: any) => rel.id);
        } else if (prop.type === 'status' && prop.status) {
          value = prop.status.name;
        } else {
          value = prop;
        }

        sampleValues[key] = {
          type: prop.type,
          value: value,
        };
      });
    }

    return NextResponse.json({
      databaseName: (database as any).title?.[0]?.plain_text || 'N/A',
      schema: schema,
      sampleValues: sampleValues,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

  } catch (error) {
    console.error('에러 발생:', error);
    return NextResponse.json(
      { 
        error: 'Notion API 호출 실패',
        message: error instanceof Error ? error.message : '알 수 없는 에러',
      },
      { status: 500 }
    );
  }
}

