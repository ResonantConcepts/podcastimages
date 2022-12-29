![Logo](/logo.svg)

# Podcast images

> Store, optimize, and deliver podcast images with Cloudflare

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

## Getting Started

### Prerequisites

- [x] An API Key and Secret from [The Podcast Index](https://podcastindex.org/)
- [x] A Pro or above Cloudflare plan with [Cloudflare Image Resizing enabled](https://developers.cloudflare.com/images/image-resizing/enable-image-resizing/) on your domain

### Installation
1. Clone the project:
   ```sh
   git clone https://github.com/resonantconcepts/podcastimages.git
   ```
1. Navigate into the project’s directory and set it up:
   ```sh
   cd podcastimages/ && yarn
   ```
1. Rename `wrangler.toml.example` to `wrangler.toml` and fill in your environment variables and routes
1. Deploy to Cloudflare workers with:
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

> Receives a podcastGUID, queries the Podcast Image for the current image URL, returns an image from the cache, or serves the original image and queues a process to cache it.

```html
<img src="http://localhost:8787/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/128">
```

#### Episode query

`/feed/:podcastGUID/item/:episodeGUID/:variant?`

> Receives a podcastGUID and an episodeGUID, queries the Podcast Image for the current image URL, returns an image from the cache, or serves the original image and queues a process to cache it.

```html
<img src="http://localhost:8787/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/item/ef45a8c0-ec1d-11ec-8862-2be879b39c9e/1024">
```

## Roadmap

- [x] Show images
- [x] Episode Images
- [ ] Landscape Cover Images
- [ ] Dominant Color Endpoint

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
