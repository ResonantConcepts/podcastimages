import { Router } from 'itty-router';
import PIndexClient from './features/podcastindex/podcastindex';
import ImageClient, { VARIANT_OPTIONS } from './features/images/images-api';

const router = Router();

router.get('/feed/:podcastGUID/:variant?', async ({ params }) => {
  if (!params) return new Response('No params', { status: 400 });

  try {
    const { podcastGUID, variant } = params;

    const response = await PIndexClient.getPodcastByGUID(podcastGUID);

    const { image, imageUrlHash } = response.feed;

    if (response.description === 'No feeds match this guid.')
      return new Response('Show not found.', { status: 404 });

    if (response.status === 'false')
      return new Response('Invalid parameters', { status: 404 });

    const upload: any = await ImageClient.uploadImage(
      image,
      imageUrlHash.toString()
    );

    // image already exists on Cloudflare or it was uplodaded with success
    const success =
      upload.statusText === 'Conflict' || (await upload.json()).success;

    if (success) {
      let imgUrl = `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${imageUrlHash}`;
      if (variant && [VARIANT_OPTIONS.includes(variant)])
        imgUrl += `/${variant}`;
      else imgUrl += '/1024';

      return fetch(imgUrl);
    }
  } catch (error) {
    console.error(error);
    return new Response('Internal error', { status: 400 });
  }

  // GUID not found
  return new Response('Invalid parameters', { status: 404 });
});

router.get(
  '/feed/:podcastGUID/item/:episodeGUID/:variant?',
  async ({ params }) => {
    if (!params) return new Response('No params', { status: 400 });

    try {
      const { podcastGUID, episodeGUID, variant } = params;

      const response = await PIndexClient.getEpisodeByGUID(
        podcastGUID,
        episodeGUID
      );

      if (response.description === 'Episode not found.')
        return new Response('Episode not found', { status: 404 });

      if (response.status === 'false')
        return new Response('Invalid parameters', { status: 404 });

      const image = response.episode.image || response.episode.feedImage;
      const imageUrlHash = response.episode.imageUrlHash || response.episode.feedImageUrlHash;

      const upload: any = await ImageClient.uploadImage(
        image,
        imageUrlHash.toString()
      );

      // image already exists on Cloudflare or it was uplodaded with success
      const success =
        upload.statusText === 'Conflict' || (await upload.json()).success;

      if (success) {
        let imgUrl = `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${imageUrlHash}`;
        if (variant && [VARIANT_OPTIONS.includes(variant)])
          imgUrl += `/${variant}`;
        else imgUrl += '/1024';

        return fetch(imgUrl);
      }
    } catch (error) {
      console.error(error);
      return new Response('Internal error', { status: 400 });
    }

    // GUID not found
    return new Response('Invalid parameters', { status: 404 });
  }
);

router.get(
  '/hash/:imageUrlHash/:variant?',
  async ({ params }) => {
    if (!params) return new Response('No params', { status: 400 });

    try {
      const { imageUrlHash, variant } = params;

      let imgUrl = `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${imageUrlHash}`;
      if (variant && [VARIANT_OPTIONS.includes(variant)])
        imgUrl += `/${variant}`;
      else imgUrl += '/1024';

      return fetch(imgUrl);

    } catch (error) {
      console.error(error);
      return new Response('Internal error', { status: 400 });
    }
  }
);

router.all('*', () => new Response('404, not found!', { status: 404 }));

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
});
