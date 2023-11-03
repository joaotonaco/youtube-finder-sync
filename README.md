[![NPM](https://nodei.co/npm/youtube-finder-sync.png?downloads=true&stars=true)](https://nodei.co/npm/youtube-finder-sync/)

# youtube-finder

A client for connect YOUTUBE API with an application javascript. All promise-based.

## Install

```sh
$ npm install youtube-finder-sync
$ yarn add youtube-finder-sync
$ pnpm add youtube-finder-sync
```

## Usage

```js
const YTClient = require('youtube-finder-sync');
const client = new YTClient({ key: 'YOUR_API_KEY' });
```

## Search

```js
const params = {
  part: 'snippet',
  q: 'Rick Roll',
  maxResults: 5,
};

client
  .search(params)
  .then(data => {
    // your code
  })
  .catch(err => {});
```

### Mandatory parameters

```json
part
    The part names that can be included in the parameter value are:
        - snippet
        - id
```

## Filters and additional parameters

```json
* maxResults
    Acceptable values are {0/} a 50, both inclusive. The default is 5.

* q
    The parameter q specifies the query term to be searched

* type
    The acceptable values are:
        * channel
        * playlist
        * video
    default value is: video,channel,playlist

* videoDuration
    Acceptable values are:
        * any: do not filter search results videos by duration. This is the default value.
        * long: Include only videos more than 20 minutes.
        * medium: Include only videos between 4 and 20 minutes (inclusive) in length.
        * short: Include only videos of less than 4 minutes.

more info at website official: https://developers.google.com/youtube/v3/docs/search/list#parmetros
```
