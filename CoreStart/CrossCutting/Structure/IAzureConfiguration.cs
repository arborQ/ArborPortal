namespace CoreStart.CrossCutting.Structure
{
    public interface IAzureConfiguration
    {
        string AccountName { get; }

        string AccountKey { get; }

        string ImageContainer { get; }
    }
}
