"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const querystring_1 = require("querystring");
const superagent_1 = __importDefault(require("superagent"));
class Client {
    options;
    endpoint;
    /**
     * Creates a Youtube Finder client
     *
     * @param options - The client options
     * @param options.key - The key used for youtube requests
     * @param options.endpoint - The endpoint used for requests
     */
    constructor(options) {
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
    #request(path, params) {
        return new Promise((resolve, reject) => {
            let url = this.endpoint + path;
            if (params) {
                url = url + '?' + (0, querystring_1.encode)(params) + '&key=' + this.options.key;
            }
            superagent_1.default
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
    search(params) {
        return this.#request('/search', params);
    }
}
module.exports = Client;
