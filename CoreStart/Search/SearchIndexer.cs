using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoreStart.CrossCutting.Structure.Repository;
using CoreStart.CrossCutting.Structure.Search;
using Nest;

namespace CoreStart.Data.Search
{
    internal class SearchIndexer : ISearchIndexer
    {
        protected IElasticClient _elasticClient;
        protected string _indexName;


        public SearchIndexer(IElasticClient elasticClient, string indexName)
        {
            _elasticClient = elasticClient;
            _indexName = indexName;
        }

        public async Task CreateIndex(IElasticClient elasticClient, string indexName)
        {
            if (!elasticClient.IndexExists(indexName).Exists)
            {
               await elasticClient.CreateIndexAsync(indexName, c => c.InitializeUsing(new IndexState { Settings = new IndexSettings { NumberOfReplicas = 1, NumberOfShards = 2 } }));
            }
        }

        public async Task ReIndex<T>(IReadOnlyCollection<T> items) where T : class, IEntity
        {
            var exists = await _elasticClient.IndexExistsAsync(_indexName);

            if (exists.Exists)
            {
                await _elasticClient.DeleteIndexAsync(_indexName);
                await _elasticClient.CreateIndexAsync(_indexName);
            }

            await Task.WhenAll(items.Select(async item => await AddItem(item)));
            await _elasticClient.RefreshAsync(new RefreshRequest(_indexName));
        }

        public async Task AddItem<T>(T item) where T : class, IEntity
        {
            var itemresponse = await _elasticClient.IndexAsync(item, index => index.Index(_indexName).Type<T>().Id(item.Id));
            await _elasticClient.RefreshAsync(new RefreshRequest(_indexName));

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(itemresponse.DebugInformation);
        }

        public async Task EditItem<T>(T item) where T : class, IEntity
        {
            var itemresponse = await _elasticClient.UpdateAsync(new DocumentPath<T>(item), (u) => u.Index(_indexName).Type<T>());
            await _elasticClient.RefreshAsync(new RefreshRequest(_indexName));

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(itemresponse.DebugInformation);
        }

        public async Task<IReadOnlyCollection<T>> GetItems<T>() where T : class, IEntity
        {
            var result = await _elasticClient.SearchAsync<T>(new SearchRequest(_indexName, typeof(T)) { });

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(result.DebugInformation);

            return result.Documents;
        }

        public async Task RemoveItem<T>(long itemId) where T : class, IEntity
        {
            var itemresponse = await _elasticClient.DeleteAsync(new DeleteRequest(_indexName, typeof(T), itemId));
            await _elasticClient.RefreshAsync(new RefreshRequest(_indexName));

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(itemresponse.DebugInformation);
        }
    }
}
