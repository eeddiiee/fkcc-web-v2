import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

// Notion Client 초기화
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

async function checkNotionProperties() {
  try {
    const databaseId = process.env.NOTION_SERMON_DB_ID;
    
    if (!databaseId) {
      console.error('NOTION_SERMON_DB_ID 환경 변수가 설정되지 않았습니다.');
      return;
    }

    console.log('='.repeat(80));
    console.log('Notion 데이터베이스 프로퍼티 확인');
    console.log('='.repeat(80));

    // 1. 데이터베이스 스키마 가져오기
    console.log('\n[1] 데이터베이스 스키마:');
    const database = await notion.databases.retrieve({
      database_id: databaseId,
    });

    console.log('\n데이터베이스 이름:', (database as any).title?.[0]?.plain_text || 'N/A');
    console.log('\n프로퍼티 목록:');
    const properties = (database as any).properties || {};
    const propertyKeys = Object.keys(properties);
    
    propertyKeys.forEach((key, index) => {
      const prop = properties[key];
      console.log(`\n${index + 1}. "${key}"`);
      console.log(`   타입: ${prop.type}`);
      
      // 타입별 상세 정보 출력
      if (prop.type === 'rich_text') {
        console.log(`   설명: Rich Text (텍스트)`);
      } else if (prop.type === 'title') {
        console.log(`   설명: Title (제목)`);
      } else if (prop.type === 'select') {
        console.log(`   설명: Select (선택)`);
        if (prop.select?.options) {
          console.log(`   옵션: ${prop.select.options.map((o: any) => o.name).join(', ')}`);
        }
      } else if (prop.type === 'multi_select') {
        console.log(`   설명: Multi-select (다중 선택)`);
        if (prop.multi_select?.options) {
          console.log(`   옵션: ${prop.multi_select.options.map((o: any) => o.name).join(', ')}`);
        }
      } else if (prop.type === 'date') {
        console.log(`   설명: Date (날짜)`);
      } else if (prop.type === 'files') {
        console.log(`   설명: Files (파일)`);
      } else if (prop.type === 'url') {
        console.log(`   설명: URL (링크)`);
      } else if (prop.type === 'formula') {
        console.log(`   설명: Formula (수식)`);
        console.log(`   수식 타입: ${prop.formula?.expression || 'N/A'}`);
      } else if (prop.type === 'relation') {
        console.log(`   설명: Relation (관계)`);
        console.log(`   연결된 DB: ${prop.relation?.database_id || 'N/A'}`);
      } else if (prop.type === 'status') {
        console.log(`   설명: Status (상태)`);
        if (prop.status?.options) {
          console.log(`   옵션: ${prop.status.options.map((o: any) => o.name).join(', ')}`);
        }
      } else {
        console.log(`   설명: ${prop.type}`);
      }
    });

    // 2. 실제 페이지 데이터 가져오기 (첫 번째 페이지)
    console.log('\n\n' + '='.repeat(80));
    console.log('[2] 실제 페이지 데이터 샘플 (첫 번째 페이지):');
    console.log('='.repeat(80));

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

    if (response.results.length > 0) {
      const page = response.results[0] as PageObjectResponse;
      const pageProperties = page.properties;

      console.log('\n페이지 프로퍼티 값:');
      propertyKeys.forEach((key) => {
        const prop = pageProperties[key];
        if (!prop) {
          console.log(`\n"${key}": 프로퍼티 없음`);
          return;
        }

        console.log(`\n"${key}" (${prop.type}):`);
        
        if (prop.type === 'title' && Array.isArray(prop.title)) {
          const value = prop.title.map((t: any) => t.plain_text).join('');
          console.log(`  값: "${value}"`);
        } else if (prop.type === 'rich_text' && Array.isArray(prop.rich_text)) {
          const value = prop.rich_text.map((t: any) => t.plain_text).join('');
          console.log(`  값: "${value}"`);
        } else if (prop.type === 'select' && prop.select) {
          console.log(`  값: "${prop.select.name}"`);
        } else if (prop.type === 'multi_select' && Array.isArray(prop.multi_select)) {
          const values = prop.multi_select.map((s: any) => s.name);
          console.log(`  값: [${values.map((v: string) => `"${v}"`).join(', ')}]`);
        } else if (prop.type === 'date' && prop.date) {
          console.log(`  값: "${prop.date.start}"`);
        } else if (prop.type === 'files' && Array.isArray(prop.files)) {
          prop.files.forEach((file: any, idx: number) => {
            if (file.type === 'external') {
              console.log(`  파일 ${idx + 1}: ${file.external.url}`);
            } else if (file.type === 'file') {
              console.log(`  파일 ${idx + 1}: ${file.file.url}`);
            }
          });
        } else if (prop.type === 'url' && prop.url) {
          console.log(`  값: "${prop.url}"`);
        } else if (prop.type === 'formula' && prop.formula) {
          if (prop.formula.type === 'string') {
            console.log(`  값: "${prop.formula.string}"`);
          } else if (prop.formula.type === 'number') {
            console.log(`  값: ${prop.formula.number}`);
          } else if (prop.formula.type === 'boolean') {
            console.log(`  값: ${prop.formula.boolean}`);
          } else {
            console.log(`  값: ${JSON.stringify(prop.formula)}`);
          }
        } else if (prop.type === 'relation' && Array.isArray(prop.relation)) {
          console.log(`  관계 ID 개수: ${prop.relation.length}`);
          prop.relation.forEach((rel: any, idx: number) => {
            console.log(`  관계 ${idx + 1}: ${rel.id}`);
          });
        } else if (prop.type === 'status' && prop.status) {
          console.log(`  값: "${prop.status.name}"`);
        } else {
          console.log(`  값: ${JSON.stringify(prop, null, 2)}`);
        }
      });
    } else {
      console.log('\nLive 상태인 페이지가 없습니다.');
    }

    console.log('\n' + '='.repeat(80));
    console.log('확인 완료!');
    console.log('='.repeat(80));

  } catch (error) {
    console.error('에러 발생:', error);
    if (error instanceof Error) {
      console.error('에러 메시지:', error.message);
    }
  }
}

// 스크립트 실행
checkNotionProperties()
  .then(() => {
    console.log('\n프로세스 종료');
    process.exit(0);
  })
  .catch((error) => {
    console.error('치명적 에러:', error);
    process.exit(1);
  });

