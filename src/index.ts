export interface ClientOptions {
  key: string;
  endpoint?: string;
}

export type QueryType = 'channel' | 'playlist' | 'video';

export interface Params {
  part: 'snippet' | 'id';
  maxResults?: number;
  q?: string;
  type?:
    | `${QueryType}`
    | `${QueryType},${QueryType}`
    | `${QueryType},${QueryType},${QueryType}`;
  videoDuration?: 'any' | 'long' | 'medium' | 'short';
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
        url +
        '?' +
        new URLSearchParams({ ...params, key: this.options.key } as any);
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
