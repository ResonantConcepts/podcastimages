# Podcast images

## Goal

Cache and host podcast images allowing the entire web to use thse links.

## Glossary

### Wrangler

command line tool used by cloudflare to manage the serveless environment.

### GUID

Global Unique Identifier. GUID from a podcast episode or show comes from podcast index.

### Podcast Index

Platform that brings tools to help work with the podcast. It provides an API to make easier to query podcast shows and episodes.

### Crypto module

The JavaScript runtime of Cloudflare Workers is not based on Node. So there won't be a pre-bundled module called crypto that you can require or import.

## Installation

- Install wragler globally: `yarn global add wrangler`
- Run `yarn` in the installed folder
- create a file called `.dev.vars` in the root folder and add the following configuragion:

```
API_KEY = "PODCAST_INDEX_API_KEY"
API_SECRET = "PODCAST_INDEX_SECRET"
CLOUDFLARE_ACCOUNT_ID = "CLOUDFLARE_ACCOUNT_ID"
CLOUDFLARE_ACCOUNT_HASH = "CLOUDFLARE_ACCOUNT_HASH"
CLOUDFLARE_API_TOKEN = "CLOUDFLARE_API_TOKEN"
```

## Variant

Images variants can be 32px, 64px, 128px, 256px, 512px or 1024px.

## Usage

- To run locally: `yarn start`

- To deploy/publish: `yarn deploy`

## Routes

`/feed/:podcastGUID/variant?`: receives a GUID of a podcast and returns the related image. It can receive size variants as argument to return the image with a specific format.

- checks if there is already an cached image for the request. If there is one, return it. If there is not serve the original image and queue a process to cache it.

`/feed/:feedId/item/:episodeGUID`: receives a feedId of a podcast and a GUID of a episode and returns the episode image. It can receive specific size variantes as arguments to return the image on the specific format

- checks if there is already an cached image for the request. If there is one, return it. If there is not serve the original image and queue a process to cache it.

`404/not found`: if it's a invalid path or invalid parameters the API will return a simple 404 error

## Tests Examples

### Show query

http://127.0.0.1:8787/feed/9b024349-ccf0-5f69-a609-6b82873eab3c

### Episode query

http://127.0.0.1:8787/feed/920666/item/PC2084

## Deploy

- Run `yarn deploy`
- Go to your clodflare settings and add the production environment variables there.
  - You can also add these credentials on `wrangler.toml` but it may expose these variables on github. So it's safer to copy and paste these variables again on cloudflare.
