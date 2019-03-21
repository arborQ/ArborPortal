using System;
using System.Collections.Generic;
using System.Linq;
using CoreStart.CrossCutting.Structure.IoC;
using CoreStart.CrossCutting.Structure.Search;
using Elasticsearch.Net;
using Nest;

namespace CoreStart.Data.Search
{
    public static class RegisterSearch
    {
        public static IEnumerable<ContainerRegisterFunction> ResolveIndexerFunctions(IReadOnlyCollection<string> searchNodes)
        {
            yield return ContainerRegisterFunction.Service<IElasticClient, ElasticClient>(() =>
            {
                var nodes = searchNodes.Select(n => new Uri(n)).ToArray();

                var pool = new StaticConnectionPool(nodes);
                var settings = new ConnectionSettings(pool);
                var client = new ElasticClient(settings);

                return client;
            });
        }

        public static IEnumerable<ContainerRegister> ResolveIndexer()
        {
            yield return ContainerRegister.Service<SearchIndexer, ISearchIndexer>(nameof(SearchIndexer));
        }

    }
}
