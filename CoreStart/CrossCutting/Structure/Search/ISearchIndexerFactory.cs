namespace CoreStart.CrossCutting.Structure.Search
{
    public interface ISearchIndexerFactory
    {
        ISearchIndexer GetSearchIndexer(string indexName);
    }
}
