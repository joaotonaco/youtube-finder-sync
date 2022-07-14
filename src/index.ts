import { encode } from 'querystring';
import request from 'superagent';

export interface ClientOptions {
  key: string;
  endpoint?: string;
}

export interface Params {
  [key: string]: any;
}

class Client {
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
  #request(path: string, params: Params) {
    return new Promise((resolve, reject) => {
      let url = this.endpoint + path;

      if (params) {
        url = url + '?' + encode(params) + '&key=' + this.options.key;
      }

      request
        .get(url)
        .set('Accept', 'application/json')
        .end(function (err, res) {
          if (err || !res.ok) {
            reject('An error ocurred in the request ' + err);
          }

          resolve(res.body);
        });
    });
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

module.exports = Client;
