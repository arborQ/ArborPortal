using CrossCutting.Structure.IoC;
using Elasticsearch.Net;
using Nest;
using Structure.IoC;
using Structure.Search;
using System;
using System.Collections.Generic;
using System.Linq;

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

                if (!client.IndexExists("users").Exists)
                {
                    client.CreateIndex("users", c => c.InitializeUsing(new IndexState { Settings = new IndexSettings { NumberOfReplicas = 1, NumberOfShards = 2 } }));
                }

                return client;
            });
        }
        public static IEnumerable<ContainerRegister> ResolveIndexer()
        {
            yield return ContainerRegister.Service<SearchIndexer, ISearchIndexer>();
        }

    }
}
