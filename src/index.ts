import { Router } from 'itty-router';
import apiClient from './features/podcastindex/podcastindex';

const router = Router();

const VARIANT_OPTIONS = ['32', '64', '128', '256', '512', '1024'];

router.get('/feed/:podcastGUID/:variant?', async ({ params }) => {
  if (!params) return new Response('No params', { status: 400 });

  const { podcastGUID, variant } = params;

  const info = await apiClient.getPodcastByGUID(podcastGUID);

  return new Response(JSON.stringify(info));
});

router.get('/feed/:feedId/item/:episodeGUID/:variant?', async ({ params }) => {
  if (!params) return new Response('No params', { status: 400 });

  const { feedId, episodeGUID, variant } = params;

  const info = await apiClient.getEpisodeByGUID(feedId, episodeGUID);

  return new Response(JSON.stringify(info));
});

router.all('*', () => new Response('404, not found!', { status: 404 }));

export interface Env {
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
}

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request));
});

// export default {
// 	async fetch(
// 		request: Request,
// 		env: Env,
// 		ctx: ExecutionContext
// 	): Promise<Response> {
// 		return new Response("Hello World!");
// 	},
// };
