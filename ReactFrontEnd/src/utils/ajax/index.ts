function handleAjax<T>(ajax: Promise<Response>): Promise<T> {
  return ajax
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      return response;
    })
    .then((r: any) => {
      try {
        return r.json();
      } catch (err) {
        return {};
      }
    });
}

export function post<T>(url: string, data?: any): Promise<T> {
  const request = new Request(url, {
    body: !!data ? JSON.stringify(data) : null,
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    method: "POST"
  });

  return handleAjax(fetch(request));
}

export function update<T>(url: string, data: any): Promise<T> {
  const request = new Request(url, {
    body: !!data ? JSON.stringify(data) : null,
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    method: "PUT"
  });

  return handleAjax(fetch(request));
}

export function remove<T>(url: string, data: any): Promise<T> {
  const request = new Request(url, {
    body: !!data ? JSON.stringify(data) : null,
    headers: new Headers({
      "Accept": "application/json",
      "Content-Type": "application/json"
    }),
    method: "DELETE"
  });

  return handleAjax(fetch(request));
}

export function get<T>(url: string): Promise<T> {
  return handleAjax(fetch(url));
}
