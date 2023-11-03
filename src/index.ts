export interface ClientOptions {
  key: string;
  endpoint?: string;
}

export interface Params {
  [key: string]: any;
}

export default class Client {
  options: ClientOptions;
  endpoint: string;

  /**
   * Creates a Youtube Finder client
   *
   * @param options - The client options
   * @param options.key - The key used for youtube requests
   * @param options.endpoint - The endpoint used for requests
   */
  constructor(options: ClientOptions) {
    this.options = options || {};
    this.endpoint = options.endpoint || 'https://www.googleapis.com/youtube/v3';
  }

  /**
   * Makes a request
   *
   * @param path - The path to the endpoint
   * @param params - The params for the request
   *
   * @private
   */
  async #request(path: string, params: Params) {
    let url = this.endpoint + path;

    if (params) {
      url =
        url + '?' + new URLSearchParams({ ...params, key: this.options.key });
    }

    const res = await fetch(url, { headers: { Accept: 'application/json' } });

    if (res && res.ok) {
      return res.json();
    }
  }

  /**
   * Makes a search in Youtube
   *
   * @param params - The params for the request
   *
   * @returns The data from the request
   */
  search(params: Params) {
    return this.#request('/search', params);
  }
}
