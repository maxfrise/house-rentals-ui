/**
 * DataSource class that provides an api for datasources
 */

class HTTPResponseError extends Error {
  constructor(response: any) {
    super(`HTTP Error Response: ${response.status}`);
  }
}

type URLSearchParamsInit = ConstructorParameters<typeof URLSearchParams>[0];

type RequestOptions = {
  params?: URLSearchParamsInit;
};

export interface GetRequest extends RequestOptions {
  method?: "GET";
  body?: never;
}

export interface RequestWithBody extends RequestOptions {
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
  body?: object;
}

type DataSourceRequest = GetRequest | RequestWithBody;

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  headers?: Record<string, string>;
}

export class DataSource {
  baseURL?: string;

  constructor(baseURL?: string) {
    this.baseURL = baseURL;
  }

  async fetch<TResult = any>(
    path: string,
    request: DataSourceRequest
  ): Promise<TResult | undefined> {
    let body = "";
    let fetchOptions: FetchOptions = {
      method: request.method ?? "GET",
    };
    const url = new URL(path, this.baseURL);

    if (request.params) {
      this.appendParams(url, request.params);
    }

    if (request.body) {
      body = JSON.stringify(request.body);
      fetchOptions = {
        ...fetchOptions,
        headers: { "Content-Type": "application/json" },
        body,
      };
    }

    try {
      const response = await fetch(url, fetchOptions);

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (response.status !== 204) {
          if (contentType?.startsWith("application/json")) {
            return response.json();
          } else {
            return response.text() as TResult;
          }
        }
      } else {
        throw new HTTPResponseError(response);
      }
    } catch (error: any) {
      return Promise.reject(error.message);
    }
  }

  private appendParams(url: URL, params: RequestOptions["params"]) {
    const urlSearchParams = new URLSearchParams(params);
    const pathItems = url.pathname.split("/");

    for (const [name, value] of urlSearchParams) {
      if (pathItems.some((pathItem) => pathItem === `:${name}`)) {
        url.pathname = url.pathname.replace(
          new RegExp(`:${name}`, "g"),
          encodeURIComponent(value)
        );
      } else {
        url.searchParams.append(name, encodeURIComponent(value));
      }
    }
  }
}
