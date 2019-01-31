using Nest;
using Structure.Search;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoreStart.Data.Search
{
    internal class SearchIndexer : ISearchIndexer
    {
        protected IElasticClient _elasticClient;

        public SearchIndexer(IElasticClient elasticClient)
        {
            _elasticClient = elasticClient;
        }

        public async Task AddItem<T>(T item, string indexName) where T : class
        {
            var itemresponse = await _elasticClient.IndexDocumentAsync(item);

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(itemresponse.DebugInformation);
        }

        public async Task AddItem<T>(T item) where T : class
        {
            await AddItem(item, typeof(T).FullName.ToLower());
        }

        public async Task<IReadOnlyCollection<T>> GetItems<T>(string index) where T : class
        {
            var result = await _elasticClient.SearchAsync<T>(s => s.AllIndices().AllTypes());
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(result.DebugInformation);

            return result.Documents;
        }

        public async Task<IReadOnlyCollection<T>> GetItems<T>() where T : class
        {
            return await GetItems<T>(typeof(T).FullName.ToLower());
        }
    }
}
