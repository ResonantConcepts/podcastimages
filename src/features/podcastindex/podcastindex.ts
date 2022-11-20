import crypto from 'crypto-browserify';
import qs from 'query-string';
import { EpisodeByGUIDResponse, PodcastByGUIDResponse } from './types';

const ENDPOINT = 'https://api.podcastindex.org/';
// const SHA1_ALGORITHM = 'sha1';
// const SHA1_HASH = crypto.createHash(SHA1_ALGORITHM);

/*
example of show query:
{"status":"true","query":{"guid":"9b024349-ccf0-5f69-a609-6b82873eab3c","id":227573},"feed":{"id":227573,"podcastGuid":"9b024349-ccf0-5f69-a609-6b82873eab3c","title":"Podnews Daily","url":"https://podnews.net/rss","originalUrl":"https://podnews.net/rss","link":"https://podnews.net","description":"Daily news about the global podcasting and on-demand audio industry. Curated by James Cridland editor@podnews.net - visit https://podnews.net to get our free newsletter for all the links and more. [Podcast Index/mp3]","author":"Podnews LLC","ownerName":"","image":"https://podnews.net/static/podnews-2000x2000.png","artwork":"https://podnews.net/static/podnews-2000x2000.png","lastUpdateTime":1668909639,"lastCrawlTime":1668909619,"lastParseTime":1668909645,"lastGoodHttpStatusTime":1668909619,"lastHttpStatus":200,"contentType":"application/xml","itunesId":1325018583,"itunesType":"episodic","generator":"This feed produced by Podnews LLC for Podcast Index","language":"en","explicit":false,"type":0,"dead":0,"chash":"32a3824ded38a4f823139af2449760d7","episodeCount":50,"crawlErrors":0,"parseErrors":0,"categories":{"9":"Business","55":"News","56":"Daily","102":"Technology"},"locked":0,"imageUrlHash":1390138684,"value":{"model":{"type":"lightning","method":"keysend","suggested":"0.00000015000"},"destinations":[{"name":"Podnews","type":"node","address":"02b307fdad2e68d08ba5a59cfc8a0a7ec0ff375291e1082fa22a5524e68608c520","split":50},{"name":"james@getalby.com","type":"node","address":"030a58b8653d32b99200a2334cfe913e51dc7d155aa0116c176657a4f1722677a3","split":50,"customKey":"696969","customValue":"sMTUI4g4v8hPG7rMfHBj"},{"name":"Podcastindex.org","address":"03ae9f91a0cb8ff43840e3c322c4c61f019d8c1c3cea15a25cfc425ac605e61a4a","type":"node","fee":true,"split":1}]},"funding":{"url":"https://podnews.net/article/advertising","message":"Support us"}},"description":"Found matching feeds."}
*/

/*
example of episode query:
https://api.podcastindex.org/api/1.0/episodes/byguid?guid=PC2084&feedid=920666&pretty
status":"true","id":"920666","url":null,"guid":"PC2084","episode":{"id":8031009367,"title":"Episode 84: All Aboard to On-Board!","link":"http://adam.curry.com/html/PC208420220506Podcas-9vksRH4FlPRKdPB0QqFRHZ1GnmRNbz.html","description":"<p>Podcasting 2.0 for May 6th 2022 Episode 84: \"All Aboard to On-Board!\"</p>\n<p>Adam & Dave discuss the week's developments on podcastindex.org and we're joined by Fountain's Oscar Merry</p>\n\n<p>Download the mp3</p>\n<p>Podcast Feed</p>\n<p>PodcastIndex.org</p>\n<p>Preservepodcasting.com</p>\n<p>Check out the podcasting 2.0 apps and services newpodcastapps.com</p>\n<p>Support us with your Time Talent and Treasure</p>\n<p>Positioning</p>\n<p>Boost Bait</p>\n<p>ShowNotes</p>\n<p>Put us in your value split</p>\n<p>Oscar Merry Fountain.fm</p>\n<p>Jensen SF</p>\n<p>Khalil Rountree's Bitcoin Awakening</p>\n...","guid":"PC2084","datePublished":1651867250,"datePublishedPretty":"May 06, 2022 3:00pm","dateCrawled":1668807507,"enclosureUrl":"https://op3.dev/e/mp3s.nashownotes.com/PC20-84-2022-05-06-Final.mp3","enclosureType":"audio/mpeg","enclosureLength":84757256,"duration":7058,"explicit":0,"episode":null,"episodeType":"full","season":0,"image":"https://noagendaassets.com/enc/1601061118.678_pciavatar.jpg","feedItunesId":1584274529,"feedImage":"https://noagendaassets.com/enc/1601061118.678_pciavatar.jpg","feedId":920666,"feedTitle":"Podcasting 2.0","feedLanguage":"en","chaptersUrl":"http://34.117.70.159/http%3Amp3s.nashownotes.compc20rss.xml/PC2084","persons":[{"id":2887562,"name":"Adam Curry","role":"host","group":"cast","href":"http://curry.com","img":"https://feeds.podcastindex.org/adam_avatar.jpg"},{"id":2887563,"name":"Dave Jones","role":"host","group":"cast","href":"http://dave.sobr.org","img":"https://feeds.podcastindex.org/dave_avatar.jpg"},{"id":2887564,"name":"Oscar Merry","role":"guest","group":"cast","href":"https://fountain.fm/","img":"https://cdn.masto.host/podcastindexsocial/accounts/avatars/106/308/425/108/516/919/original/94816333ea4c146a.jpg"}],"transcripts":[{"url":"https://mp3s.nashownotes.com/PC20-84-Captions.srt","type":"application/srt"}],"value":{"model":{"type":"lightning","method":"keysend","suggested":"0.00000005000"},"destinations":[{"name":"Podcastindex.org","type":"node","address":"03ae9f91a0cb8ff43840e3c322c4c61f019d8c1c3cea15a25cfc425ac605e61a4a","split":64},{"name":"Oscar Merry - Fountain","type":"node","address":"02a128c92baf0ede00ed0fc3720a92ba2c6392e0b58aa4decab1d787a666d94cb7","split":25,"customKey":"112111100","customValue":"wal_ZmqFg13NB31oek"},{"name":"Dreb Scott (Chapters)","type":"node","address":"02453e4e93322d60219808c00c2e6d1f1c673420e95b5511a33c40cfb4df5e9148","split":5},{"name":"Sovereign Feeds","type":"node","address":"02a128c92baf0ede00ed0fc3720a92ba2c6392e0b58aa4decab1d787a666d94cb7","split":5,"customKey":"112111100","customValue":"wal_MB9T45QHGyW"},{"name":"Boostagram Monitor","type":"node","address":"038399372001f2741d58d6ec4846fccb78daa1a485e69e2eebc5aadba047d35956","split":1}]}},"description":"Found matching item."}

*/

const getApiHeaderTime = () => {
  return Math.floor(Date.now() / 1000);
};

const getAuthorization = (apiHeaderTime: number) => {
  // const data4Hash = API_KEY + API_SECRET + apiHeaderTime;
  // SHA1_HASH.update(data4Hash);
  // const hash4Header = SHA1_HASH.digest('hex');
  // return hash4Header;
  // const sha1Algorithm = 'sha1';
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
      // `https://api.podcastindex.org/api/1.0/podcasts/byguid?guid=${guid}`,
      `${ENDPOINT}/api/1.0/${url}?${qs.stringify(query)}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'X-Auth-Date': apiHeaderTime.toString(),
          'X-Auth-Key': API_KEY,
          Authorization: authorization,
          'User-Agent': 'SuperPodcastPlayer/1.8', // this is required
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
    getEpisodeByGUID: async (feedid: string, guid: string) => {
      return GET<EpisodeByGUIDResponse>('episodes/byguid', { guid, feedid });
    },
  };
};

const client = createPodcastIndexClient();

export default client;

// import axios from 'axios';
// import qs from 'query-string';
// // import * as crypto from 'crypto-js';
// // import { SHA1 } from 'crypto-js';
// // import sha1 from 'crypto-js/sha1';
// // import CryptoJS from "crypto-js";

// // SHA1

// // crypto.subtle.

// const ENDPOINT = '"https://api.podcastindex.org/';
// const API_KEY = 'MHRU34FGNQHUXQYNLNVU';
// const API_SECRET = '7UvtKLS#VDL2ynhZquJCjXcw5UJ2Xk3GB4K^fqPe';
// // const API_HEADER_TIME = Math.floor(Date.now() / 1000).toString();
// // const sha1Algorithm = 'sha1';
// const SHA1_ALGORITHM = 'sha1';
// // const SHA1_HASH = csha1(SHA1_ALGORITHM);
// const SHA1_HASH = crypto.createHash(SHA1_ALGORITHM);
// // const data4Hash = API_KEY + API_SECRET + API_HEADER_TIME;
// // sha1Hash.update(data4Hash);
// // const hash4Header = sha1Hash.digest('hex');

// const getApiHeaderTime = () => {
//   return Math.floor(Date.now() / 1000);
// };

// const getAuthorization = (apiHeaderTime: number) => {
//   const data4Hash = API_KEY + API_SECRET + apiHeaderTime;
//   SHA1_HASH.update(data4Hash);
//   const hash4Header = SHA1_HASH.digest('hex');
//   return hash4Header;
// };

// export const getHeaders = (): {
//   'X-Auth-Date': string;
//   Authorization: string;
// } => {
//   const apiHeaderTime = getApiHeaderTime();
//   return {
//     'X-Auth-Date': apiHeaderTime.toString(),
//     Authorization: getAuthorization(apiHeaderTime),
//   };
// };

// const createPodcastIndexClient = () => {
//   const CLIENT = axios.create({
//     baseURL: ENDPOINT,
//     timeout: 30000,
//     headers: {
//       'content-type': 'application/json',
//       'X-Auth-Key': API_KEY,
//       // 'User-Agent': 'SuperPodcastPlayer/1.8',
//     },
//     responseType: 'json',
//     // paramsSerializer: (params) => qs.stringify(params),
//   });

//   async function GET<T = any>(
//     url: string,
//     query: Record<string, string | string[] | boolean> | null = null
//   ): Promise<T> {
//     try {
//       const headers = getHeaders();
//       const result = await CLIENT.get(`/api/1.0${url}`, {
//         params: query,
//         headers,
//       });
//       return result.data;
//     } catch (e: any) {
//       throw handleError(e);
//     }
//   }

//   const handleError = (e: any) => {
//     const data = e.response?.data;
//     // return reconstructError(data || e);
//     return e;
//   };

//   return {
//     getPodcastByGUID(guid: string) {
//       return GET<{ response: any }>(`/podcasts/byguid?guid=${guid}`);
//     },
//     getEpisodeByGUID(guid: string, feedId: string) {
//       return GET<{ response: any }>(
//         `/episodes/byguid?guid=${guid}&feedid=${feedId}`
//       );
//     },
//   };
// };

// const apiClient = createPodcastIndexClient();

// export default apiClient;
