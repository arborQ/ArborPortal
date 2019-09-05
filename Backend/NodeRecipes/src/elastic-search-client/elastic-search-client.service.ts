import { Injectable } from '@nestjs/common';
import { Client } from 'elasticsearch';
import config from '../config/config.service';

@Injectable()
export class ElasticSearchClientService {
    private client: Client;

    constructor() {
        this.client = new Client({
            host: config.elasticSearchUrl,
        });
    }

    async health(): Promise<boolean> {
        return new Promise<boolean>(resolve => {
            this.client.cluster.health({}, (_, resp) => {
                console.log("-- Client Health --", resp);
                resolve(resp.status === 'green');
            });
        });
    }

    async createIndex(name: string): Promise<void> {
        await this.client.indices.create({ index: name });
    }

    async deleteIndex(name: string): Promise<void> {
        await this.client.indices.delete({ index: name });
    }

    async add<T>(index: string, body: T): Promise<void> {
        await this.client.index({
            index,
            type: 'constituencies',
            body,
        });
    }

    async clear(index: string): Promise<void> {
        await this.client.indices.delete({ index });
    }

    async switchIndexes(from: string, to: string): Promise<void> {
        await this.client.reindex({
            body: {
                source: { index: from },
                dest: { index: to },
            },
        });
    }

    allSearchQuery(_all: string) {
        if (!_all) {
            return;
        } else {
            return {
                query: {
                    match: {
                        _all,
                    },
                },
            };
        }
    }

    async search<T>(index: string, search: string): Promise<{
        totalCount: number,
        items: any[],
    }> {
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
