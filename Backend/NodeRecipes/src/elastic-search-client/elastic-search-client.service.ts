import { Injectable } from '@nestjs/common';
import { Client } from 'elasticsearch';
import config from '../config/config.service';

@Injectable()
export class ElasticSearchClientService {
    public client: Client;

    constructor() {
        this.client = new Client({
            host: config.elasticSearchUrl,
        });
    }

    async health(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.client.cluster.health({}, (_, resp) => {
                console.log('-- Client Health --', resp);
                resolve(resp.status === 'green');
            });
        });
    }

    async ensureAlias(name: string): Promise<void> {
        if (!await this.client.indices.existsAlias({ name, index: `${name}_temp*` })) {
            const indexName = `${name}_temp`;
            await this.createIndex(indexName);
            await this.client.indices.updateAliases({
                body: {
                    actions: [
                        { add: { index: indexName, alias: name } },
                    ],
                },
            });
            // await this.client.indices.putAlias({ name, index: indexName });
            console.log(`Alias does not exits: ${name} / ${indexName}`);
        } else {
            console.log(`Alias already exits: ${name}`);
        }
    }

    async createIndex(name: string, alias?: string): Promise<void> {
        if (!await this.client.indices.exists({ index: name })) {
            await this.client.indices.create({ index: name, body: {  } });
        }
    }

    async deleteIndex(name: string): Promise<void> {
        if (await this.client.indices.exists({ index: name })) {
            await this.client.indices.delete({ index: name });
        }
    }

    async add<T>(index: string, body: T): Promise<void> {
        await this.client.index({
            index,
            type: 'recipe',
            body,
        });
    }

    async clear(index: string): Promise<void> {
        await this.client.indices.delete({ index });
    }

    async switchAlias(index: string, alias: string): Promise<void> {
        await this.client.indices.updateAliases({
            body : {
                actions: [
                    {
                        remove: { alias, index: `${alias}*` },
                    },
                    {
                        add : { index, alias },
                    },
                ],
            },
        });
    }

    allSearchQuery(_all: string) {
        if (!_all) {
            return;
        } else {
            return {
                query: {
                    query_string: {
                        fields: ['recipeName'],
                        query: `*${_all}*`,
                    },
                },
            };
        }
    }

    async search<T>(index: string, search: string): Promise<{
        totalCount: number,
        items: any[],
    }> {
        await this.createIndex(index);
        const { hits } = await this.client.search({
            index,
            body: this.allSearchQuery(search),
        });

        return {
            items: hits.hits.map(h => h._source),
            totalCount: hits.total,
        };
    }
}
