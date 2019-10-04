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

    protected async Task<HttpResponseMessage> GetAsync(string queryParams = null) {
        return await _client
            .SendAsync (new HttpRequestMessage {
                Method = HttpMethod.Get,
                RequestUri = new Uri ($"{baseUrl}{queryParams}"),
            });
    }

    protected async Task<T> GetAsync<T> (string queryParams = null) {
        var response = await GetAsync(queryParams);
        var responseData = JsonConvert.DeserializeObject<T> (await response.Content.ReadAsStringAsync ());

        return responseData;
    }

    protected async Task<T> PutAsync<T>(object model) {
        return await SendRequest<T>(model, HttpMethod.Put);
    }

    protected async Task<T> PostAsync<T> (object model) {
        return await SendRequest<T>(model, HttpMethod.Post);
    }

    private async Task<T> SendRequest<T>(object model, HttpMethod method) {
        var stringContent = new StringContent (
            JsonConvert.SerializeObject (model), Encoding.UTF8, "application/json");

        var response = await _client
            .SendAsync (new HttpRequestMessage {
                Method = method,
                    RequestUri = new Uri (baseUrl),
                    Content = stringContent
            });

        var responseData = JsonConvert.DeserializeObject<T> (await response.Content.ReadAsStringAsync ());

        return responseData;
    }
}