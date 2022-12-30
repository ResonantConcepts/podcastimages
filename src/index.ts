import { Router } from 'itty-router';
import PIndexClient from './podcastindex';

const VARIANT_OPTIONS = ['32', '64', '128', '256', '512', '1024'];
const router = Router();

router.get('/hash/:imgUrlHash/feed/:podcastGUID/:variant?', async ({ params }) => {
  if (!params) return new Response('No params', { status: 400 });

  try {
    const { imgUrlHash, podcastGUID, variant } = params;

    const response = await PIndexClient.getPodcastByGUID(podcastGUID);

    const { image } = response.feed;

    if (response.description === 'No feeds match this guid.')
      return new Response('Show not found.', { status: 404 });

    if (response.status === 'false')
      return new Response('Invalid parameters', { status: 404 });

    const size = variant && [VARIANT_OPTIONS.includes(variant)]
      ? parseInt(variant)
      : 1024;

    let options = {
      anim: false,
      fit: 'cover',
      width: size,
      height: size,
    };

    if (variant === 'landscape') {
      options.fit = 'contain';
      options.width = 512;
      options.height = 512;
      options.border = {
        color: "#FFFFFF",
        top: 104,
        right: 384,
        bottom: 104,
        left: 384
      };
    }

    return fetch(image, {
      cf: {
        image: {
          ...options,
        },
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Internal error', { status: 400 });
  }
});

router.get(
  '/hash/:imgUrlHash/feed/:podcastGUID/item/:episodeGUID/:variant?',
  async ({ params }) => {
    if (!params) return new Response('No params', { status: 400 });

    try {
      const { imgUrlHash, podcastGUID, episodeGUID, variant } = params;

      const response = await PIndexClient.getEpisodeByGUID(
        podcastGUID,
        episodeGUID
      );

      if (response.description === 'Episode not found.')
        return new Response('Episode not found', { status: 404 });

      if (response.status === 'false')
        return new Response('Invalid parameters', { status: 404 });

      const image = response.episode.image || response.episode.feedImage;

      const size = variant && [VARIANT_OPTIONS.includes(variant)]
        ? parseInt(variant)
        : 1024;
      
      let options = {
        anim: false,
        fit: 'cover',
        width: size,
        height: size,
      };
  
      if (variant === 'landscape') {
        options.fit = 'contain';
        options.width = 512;
        options.height = 512;
        options.border = {
          color: "#FFFFFF",
          top: 104,
          right: 384,
          bottom: 104,
          left: 384
        };
      }

      return fetch(image, {
        cf: {
          image: {
            ...options,
          },
        },
      });
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
