![Logo](/logo.svg)

# Podcast images

> Store, optimize, and deliver podcast images with the Podcast Index and Cloudflare

## Table of Contents

1. [About The Project](#about-the-project)
1. [Pricing](#pricing)
1. [Getting Started](#getting-started)
1. [Glossary](#glossary)
1. [Usage](#usage)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)
1. [Funding](#funding)
1. [License](#license)

## About The Project

Apple’s [artwork requirements](https://podcasters.apple.com/support/896-artwork-requirements) requires a square 3000×3000 `JPG` or `PNG` file for show covers. In reality, trusting that all feeds will conform to that guidance is a recipe for disaster. From simple issues like non-square images to slow-loading, multi-megabyte `PSD` files, scraping RSS feeds reveals a perplexing array of outliers.

With The Podcast Index, we can retrieve show and episode artwork URLs. Cloudflare Image Resizing allows us to deliver optimzed variants cheaply:

## Pricing

* [The Podcast Index](https://podcastindex.org/): Free podcast API
* [Image Resizing](https://www.cloudflare.com/plans/#add-ons): 50,000 monthly resizing requests included with Pro, Business. $9 per additional 50,000 resizing requests.
* [Cloudflare Workers](https://developers.cloudflare.com/workers/platform/pricing/): The free pan includes 100,000 requests per day. Crossing into their paid plan has a minimum fee of $5 USD per month, but includes 10 million requests per month, + $0.50 per additional million.

|Monthly Requests|Workers with Discounts|
|:----|:----|
|50,000|$0.00|
|100,000|$9.00|
|500,000|$81.00|
|1,000,000|$171.00|
|5,000,000|$891.00|
|10,000,000|$1,791.00|

With caching, the costs shrink further.

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

#### imageUrlHash

A CRC32 hash of the podcast or episode image URL with the protocol (`http://`, `https://`) removed. It can be retreived from the Podcast Index’s [`/podcasts/byfeedurl`](https://podcastindex-org.github.io/docs-api/#get-/podcasts/byfeedurl), [`/podcasts/byguid`](https://podcastindex-org.github.io/docs-api/#get-/podcasts/byguid), [`/episodes/byguid`](https://podcastindex-org.github.io/docs-api/#get-/episodes/byguid) endpoints.

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

`hash/:imgUrlHash/feed/:podcastGUID/:variant?`

```html
<img src="http://SUBDOMAIN.DOMAIN.COM/hash/3463027081/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/512">
```

#### Episode query

`hash/:imgUrlHash/feed/:podcastGUID/item/:episodeGUID/:variant?`

```html
<img src="http://SUBDOMAIN.DOMAIN.COM/hash/2837567118/feed/b9cd9278-2679-5cfd-9bc7-7f1e04f1cba4/item/ef45a8c0-ec1d-11ec-8862-2be879b39c9e/512">
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
- [x] Landscape Cover Images
- [ ] Dominant Color Endpoint
- [ ] Cache purging

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Funding

This is an independent open-source project self-funded by [Nathan Gathright](https://github.com/nathangathright). If you use it in your own work, please consider supporting its ongoing development by using one of the options below:

[Stripe →](https://buy.stripe.com/eVa15scEr1XAgOQ3cc) [Alby →](https://getalby.com/p/nathang)

### Micropayments
If you wish to send streaming micropayments over the Lightning network, add the following info to your RSS feed’s [value tag](https://github.com/Podcastindex-org/podcast-namespace/blob/main/docs/1.0.md#value):

```xml
<podcast:value type="lightning" method="keysend">
   <podcast:valueRecipient name="nathang@getalby.com" type="node" address="030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3" customKey="696969" customValue="2yjUCncyVMyWY31einuk" split="100"/>
</podcast:value>
```

## License

Distributed under the MIT License. See `LICENSE.md` for more information.
