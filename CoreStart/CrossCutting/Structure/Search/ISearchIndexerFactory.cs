namespace Structure.Search
{
    public interface ISearchIndexerFactory
    {
        ISearchIndexer GetSearchIndexer(string indexName);
    }
}
