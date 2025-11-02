import { Client } from '@notionhq/client';
import { PageObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { cache } from 'react';
import 'server-only';

export const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const fetchPages = cache(async () => {
    return notion.dataSources.query({
        data_source_id: process.env.NOTION_DATABASE_ID!,
        filter: {
            property: "Status",
            select: {
                equals: "Live",
            },
        },
    });
});

export const fetchBySlug = cache(async (slug: string) => {
    const response = await notion.dataSources.query({
        data_source_id: process.env.NOTION_DATABASE_ID!,
        filter: {
            property: "slug",
            rich_text: {
                equals: slug,
            },
        },
    });

    return response.results[0] as PageObjectResponse | undefined;
});

export const fetchPageBlocks = cache(async (pageId: string) => {
    const response = await notion.blocks.children.list({
        block_id: pageId,
    });

    return response.results as BlockObjectResponse[];
});