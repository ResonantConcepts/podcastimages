![Logo](/logo.svg)

# Podcast images

> Store, optimize, and deliver podcast images with the Podcast Index and Cloudflare

## Table of Contents

1. [About The Project](#about-the-project)
1. [Getting Started](#getting-started)
1. [Glossary](#glossary)
1. [Usage](#usage)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)
1. [License](#license)

## About The Project

Apple’s [artwork requirements](https://podcasters.apple.com/support/896-artwork-requirements) requires a square 3000×3000 `JPG` or `PNG` file for show covers. In reality, trusting that all feeds will conform to that guidance is a recipe for disaster. From simple issues like non-square images to slow-loading, multi-megabyte `PSD` files, scraping RSS feeds reveals a perplexing array of outliers.

With The Podcast Index, we can retrieve show and episode artwork URLs. Cloudflare Image Resizing allows us to deliver optimzed variants at [fantastic prices](https://www.cloudflare.com/plans/#add-ons). With caching, the costs shrink further.

## Getting Started

### Prerequisites

- [x] An API Key and Secret from [The Podcast Index](https://podcastindex.org/)
- [x] A Pro or above Cloudflare plan with [Cloudflare Image Resizing enabled](https://developers.cloudflare.com/images/image-resizing/enable-image-resizing/)

### Setup
1. Clone the project and navigate into it’s directory:
   ```sh
   git clone https://github.com/resonantconcepts/podcastimages.git && cd podcastimages/
   ```
1. Install dependancies and login to Cloudflare:
   ```sh
   yarn && npm install -g wrangler && wrangler login
   ```
1. Create a `wrangler.toml` from the example.
   ```sh
   cp wrangler.toml.example wrangler.toml
   ```
1. Add your environment variables and routes to `wrangler.toml`
1. Deploy to Cloudflare Workers with:
   ```sh
   yarn deploy
   ```

## Glossary

#### Podcast GUID

A global unique identifier for a podcast. It may be found in an RSS feed within the [`<podcast:guid>`](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md#guid) tag or retreived from the Podcast Index’s [`/podcasts/byfeedurl`](https://podcastindex-org.github.io/docs-api/#get-/podcasts/byfeedurl) endpoint.

#### Episode GUID

A global unique identifier for an episode. It may be found in an RSS feed within an episode’s [`<guid>`](https://podcasters.apple.com/support/837-change-the-rss-feed-url#:~:text=What%E2%80%99s%20an%20episode%20GUID%3F) tag or retreived from the Podcast Index’s [`/episodes/byfeedurl`](https://podcastindex-org.github.io/docs-api/#get-/episodes/byfeedurl) endpoint.

## Usage

> **Warning**
> Cloudflare Image Resizing is not simulated locally. Local requests will always fetch unresized images. To see the effect of Image Resizing you must deploy the Worker.

### Routes

All routes receive parameters and serve a cached response if available. Otherwise, they query The Podcast Index for the current image URL, resizes it, caches the response, and delivers the image.

#### Show query

`/feed/:podcastGUID/:variant?`

```html
<img src="http://SUBDOMAIN.DOMAIN.COM/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/512">
```

#### Episode query

`/feed/:podcastGUID/item/:episodeGUID/:variant?`

```html
<img src="http://SUBDOMAIN.DOMAIN.COM/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/item/ef45a8c0-ec1d-11ec-8862-2be879b39c9e/512">
```

### Variants

By default, images will be resized down to 1024×1024, using `fit=cover` for non-square when needed. Smaller images can be requested by appending one of the listed size variants to any URL. Current sizes include:

- 32
- 64
- 128
- 256
- 512
- 1024

To generate landscape images for social media, using `landscape` as the variant will produce a 1280×720 image with the artwork set within a 512×512 square.

```html
<meta property="og:image" content="http://SUBDOMAIN.DOMAIN.COM/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/landscape"/>
```

## Roadmap

- [x] Show images
- [x] Episode Images
- [ ] Landscape Cover Images
- [ ] Dominant Color Endpoint
- [ ] Fill and purge cache with 

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
