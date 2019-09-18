using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

public abstract class BaseApiClient {
    private readonly HttpClient _client;
    private readonly string baseUrl;

    public BaseApiClient (HttpClient client, string apiUrl) {
        _client = client;
        baseUrl = apiUrl;
    }

    protected async Task<T> GetAsync<T>() {
        var response = await _client
            .SendAsync (new HttpRequestMessage {
                Method = HttpMethod.Get,
                RequestUri = new Uri (baseUrl),
            });

        var responseData = JsonConvert.DeserializeObject<T> (await response.Content.ReadAsStringAsync ());

        return responseData;
    }

    protected async Task<T> PostAsync<T> (object model) {
        var stringContent = new StringContent (
            JsonConvert.SerializeObject (model), Encoding.UTF8, "application/json");

        var response = await _client
            .SendAsync (new HttpRequestMessage {
                Method = HttpMethod.Post,
                    RequestUri = new Uri (baseUrl),
                    Content = stringContent
            });

        var responseData = JsonConvert.DeserializeObject<T> (await response.Content.ReadAsStringAsync ());

        return responseData;
    }
}