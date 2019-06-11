const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Data-Type" : "json"
};

function handleAjax<T>(ajax: Promise<Response>): Promise<T> {
  return ajax
    .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        return response;
    })
    .then(async (r: any) => {
      try {
        const json = await r.json();

        return json;
      } catch (err) {
        return {};
      }
    });
}

export function post<T>(url: string, data?: any): Promise<T> {
  const request = new Request(url, {
    body: !!data ? JSON.stringify(data) : null,
    headers: new Headers(headers),
    method: "POST"
  });

  return handleAjax(fetch(request));
}

export function update<T>(url: string, data: any): Promise<T> {
  const request = new Request(url, {
    body: !!data ? JSON.stringify(data) : null,
    headers: new Headers(headers),
    method: "PUT"
  });

  return handleAjax(fetch(request));
}

export function remove(url: string, data?: any): Promise<void> {
  const request = new Request(url, {
    body: !!data ? JSON.stringify(data) : null,
    headers: new Headers(headers),
    method: "DELETE"
  });

  return handleAjax(fetch(request));
}

export function get<T>(url: string): Promise<T> {
  return handleAjax(fetch(url));
}
