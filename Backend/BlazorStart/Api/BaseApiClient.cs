using System.Net.Http;
using System.Threading.Tasks;

public abstract class BaseApiClient {
    private readonly HttpClient _client;
    private readonly string baseUrl;

    public BaseApiClient (string apiUrl, HttpClient client) {
        _client = client;
        baseUrl = apiUrl;
    }
}
