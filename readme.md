![Logo](/logo.svg)

# Podcast images

> Store, optimize, and deliver podcast images with Cloudflare

## Table of Contents

1. [About The Project](#about-the-project)
1. [Glossary](#glossary)
1. [Getting Started](#getting-started)
1. [Usage](#usage)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)
1. [License](#license)

## About The Project

Apple’s [artwork requirements](https://podcasters.apple.com/support/896-artwork-requirements) requires a square 3000×3000 `JPG` or `PNG` file for show covers. In reality, trusting that all feeds will conform to that guidance is a recipe for disaster. From simple issues like non-square images to slow-loading, multi-megabyte `PSD` files, scraping RSS feeds reveals a perplexing array of outliers.

## Glossary

#### Podcast GUID

A global unique identifier for a podcast. It may be found in an RSS feed within the [`<podcast:guid>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md#guid) tag or retreived from the Podcast Index’s [`/podcasts/byfeedurl`](https://podcastindex-org.github.io/docs-api/#get-/podcasts/byfeedurl) endpoint.

#### Episode GUID

A global unique identifier for an episode. It may be found in an RSS feed within an episode’s [`<guid>`](https://podcasters.apple.com/support/837-change-the-rss-feed-url#:~:text=What%E2%80%99s%20an%20episode%20GUID%3F) tag or retreived from the Podcast Index’s [`/episodes/byfeedurl`](https://podcastindex-org.github.io/docs-api/#get-/episodes/byfeedurl) endpoint.

#### imageUrlHash

A CRC32 hash of the podcast or episode image URL with the protocol (`http://`, `https://`) removed. It can be retreived from the Podcast Index’s [`/podcasts/byfeedurl`](https://podcastindex-org.github.io/docs-api/#get-/podcasts/byfeedurl), [`/podcasts/byguid`](https://podcastindex-org.github.io/docs-api/#get-/podcasts/byguid), [`/episodes/byguid`](https://podcastindex-org.github.io/docs-api/#get-/episodes/byguid) endpoints.

## Getting Started

### Installation

1. Create an account with [The Podcast Index](https://api.podcastindex.org/signup) to acquire API keys.
1. Cloudflare Image Resizing requires a **PRO** or higher Cloudflare account and [must be activated](https://developers.cloudflare.com/images/image-resizing/enable-image-resizing/).
1. [Create an API token](https://developers.cloudflare.com/images/cloudflare-images/api-request/) to use with Cloudflare
1. Install wragler globally:
   ```sh
   yarn global add wrangler
   ```
1. Clone the project:
   ```sh
   git clone https://github.com/resonantconcepts/podcastimages.git
   ```
1. Navigate into the project’s directory and set it up:
   ```sh
   cd podcastimages/ && yarn
   ```
1. Create a file called `.dev.vars` in the root folder and add the following configuragion:
   ```
   API_KEY = "PODCAST_INDEX_API_KEY"
   API_SECRET = "PODCAST_INDEX_SECRET"
   CLOUDFLARE_ACCOUNT_ID = "CLOUDFLARE_ACCOUNT_ID"
   CLOUDFLARE_ACCOUNT_HASH = "CLOUDFLARE_ACCOUNT_HASH"
   CLOUDFLARE_API_TOKEN = "CLOUDFLARE_API_TOKEN"
   ```
1. To run locally: `yarn start`

> **Note**
> Cloudflare Image Resizing doesn’t work locally. All local requests will return the original image.

### Deploy

Run `yarn deploy`

#### First deploy Configuration

1. Add your environment variables in your Cloudflare dashboard or your `wrangler.toml` file.
2. Add your custom domain to Cloudflare.
3. Inside your domain configurations associate the worker route to the domain.
4. Inside `wranger.toml` add the following configuration:

```
routes = [
	{ pattern = "SUBDOMAIN.DOMAIN.COM", custom_domain = true, zone_name = "DOMAIN.COM" }
]
```

> **Note**
> Avoid adding additional break lines to this configuration, it may break the deploy.

## Usage

### Variants

By default, images will be resized down to 1024×1024 square images. Smaller images can be requested by appending one of the listed size variants to any URL. Current sizes include:

- 32
- 64
- 128
- 256
- 512
- 1024

### Routes

#### Show query

`/feed/:podcastGUID/:variant?`

> Receives a podcastGUID, queries the Podcast Image for the current image URL and imageUrlHash, returns a podcast image from the cache, or serves the original image and queues a process to cache it.

```
<img src="http://localhost:8787/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/128">
```

#### Episode query

`/feed/:podcastGUID/item/:episodeGUID/:variant?`

> Receives a podcastGUID and an episodeGUID, queries the Podcast Image for the current image URL and imageUrlHash, returns an episode image from the cache, or serves the original image and queues a process to cache it.

```
<img src="http://localhost:8787/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/item/ef45a8c0-ec1d-11ec-8862-2be879b39c9e/1024">
```

#### Hash query with fallback

`/hash/:imageUrlHash/:variant?`

> Receives an imageUrlHash, skips the Podcast Index lookup, 404s if the image has not been cached. We recommend falling back to one of the other routes.

```
<img src="http://localhost:8787/hash/283379236/128" data-fallback="/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/item/f8e00bc8-9f47-11ec-adea-33b8a6094f44/128">
<script>
  let podcastimages = document.querySelectorAll('[data-fallback]');
  podcastimages.forEach(image => {
    image.addEventListener("error", (event) => {
      image.src!=image.dataset.fallback ? image.src=image.dataset.fallback : false;
    })
  });
</script>
```

## Roadmap

- [x] Show images
- [x] Episode Images
- [ ] Landscape Cover Images
- [ ] [`<podcast:person>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md#person) Images
- [ ] [`<podcast:chapters>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/chapters/jsonChapters.md#json-chapters-format) Images
- [ ] [`<podcast:images>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md#images) Images

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

The script preview of the Worker editor ignores fetch() options, and will always fetch unresized images. To see the effect of Image Resizing you must deploy the Worker script and use it outside of the editor.
