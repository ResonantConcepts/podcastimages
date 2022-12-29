import crypto from 'crypto-browserify';
import qs from 'query-string';
import { EpisodeByGUIDResponse, PodcastByGUIDResponse } from './types';

const ENDPOINT = 'https://api.podcastindex.org/';

const getApiHeaderTime = () => {
  return Math.floor(Date.now() / 1000);
};

const getAuthorization = (apiHeaderTime: number) => {
  const sha1Hash = crypto.createHash('sha1');
  const data4Hash = API_KEY + API_SECRET + apiHeaderTime;
  sha1Hash.update(data4Hash);
  const hash4Header = sha1Hash.digest('hex');
  return hash4Header;
};

const handleError = (error: any) => {};

async function GET<T = any>(
  url: string,
  query: Record<string, any>
): Promise<T> {
  try {
    const apiHeaderTime = getApiHeaderTime();
    const authorization = getAuthorization(apiHeaderTime);
    const response = await fetch(
      `${ENDPOINT}/api/1.0/${url}?${qs.stringify(query)}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'X-Auth-Date': apiHeaderTime.toString(),
          'X-Auth-Key': API_KEY,
          Authorization: authorization,
          'User-Agent': 'PodcastImages.com/1.0', // this is required
        },
      }
    );
    return response.json();
  } catch (e: any) {
    throw handleError(e);
  }
}

const createPodcastIndexClient = () => {
  return {
    getPodcastByGUID: async (guid: string) => {
      return GET<PodcastByGUIDResponse>('podcasts/byguid', { guid });
    },
    getEpisodeByGUID: async (podcastGuid: string, episodeGuid: string) => {
      return GET<EpisodeByGUIDResponse>('episodes/byguid', {
        guid: episodeGuid,
        podcastguid: podcastGuid,
      });
    },
  };
};

const client = createPodcastIndexClient();

export default client;
