// PS. The response types from podcast index still can be improved.
// Some types needs better definition and some needs to be marked as optional

export type Transcript = {
  url: string;
  type: string;
};

export type Person = {
  id: number;
  name: string;
  role: string;
  group: string;
  href: string;
  img: string;
};

export type ValueDestination = {
  name: string;
  type: string;
  address: string;
  split: number;
  fee?: boolean;
};

export type Value = {
  model: {
    type: string;
    method: string;
    suggested: string;
  };
  destinations: ValueDestination[];
};

export type Episode = {
  // The internal PodcastIndex.org episode ID.
  id: number;

  // Name of the feed
  title: string;

  // The channel-level link in the feed
  link: string;

  // The item-level description of the episode.
  // Uses the longer of the possible fields in the feed: <description>, <itunes:summary> and <content:encoded>
  description: string;

  // The unique identifier for the episode
  guid: string;

  // The date and time the episode was published
  datePublished: number;

  // The date and time the episode was published formatted as a human readable string.
  // Note: uses the PodcastIndex server local time to do conversion.
  datePublishedPretty: string;

  // The time this episode was found in the feed
  dateCrawled: number;

  // URL/link to the episode file
  enclosureUrl: string;

  // The Content-Type for the item specified by the enclosureUrl
  enclosureType: string;

  // The length of the item specified by the enclosureUrl in bytes
  enclosureLength: number;

  // The estimated length of the item specified by the enclosureUrl in seconds
  duration: number;

  // Allowed: 0┃1
  // Is feed or episode marked as explicit
  // 0: not marked explicit
  // 1: marked explicit
  explicit: 0 | 1;

  // Episode number
  episode: number;

  // The type of episode
  // Allowed: full┃trailer┃bonus
  episodeType: 'full' | 'trailer' | 'bonus';

  // Season number
  season: number;

  // The item-level image for the episode
  image: string;

  // The iTunes ID of this feed if there is one, and we know what it is.
  feedItunesId: number;

  // The channel-level image element.
  feedImage: string;

  // The internal PodcastIndex.org Feed ID.
  feedId: number;

  // Name of the feed
  feedTitle: string;

  // The channel-level language specification of the feed. Languages accord with the RSS Language Spec.
  feedLanguage: string;

  // Link to the JSON file containing the episode chapters
  chaptersUrl: string;

  // List of transcripts for the episode.
  transcripts: Transcript[];

  // List of people with an interest in this episode.
  // See the podcast namespace spec for more information.
  persons: Person[];

  // Information for supporting the podcast via one of the "Value for Value" methods.
  // Examples:
  // lightning value type: https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=169991&pretty
  // webmonetization value type: https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=779873&pretty
  value: Value;

  // Soundbite for episode
  soundbite: any;

  // Soundbites for episode
  soundbites: any[];
};

export type EpisodeByGUIDResponse = {
  // Indicates API request status
  status: 'true' | 'false';

  // Value passed to request in the feedid parameter
  id: string;

  // Value passed to request in the feedurl parameter. If no feedurl passed, value will be null.
  url: string;

  // Value passed to request in the guid parameter.
  guid: string;

  episode: Episode;

  // episode: {

  // Description of the response
  description: string;
};

export type PodcastByGUIDResponse = {
  // Allowed: true┃false
  // Indicates API request status
  status: 'true' | 'false';

  // Object containing the input query data
  query: {
    // Value passed to request in the guid field
    guid: string;

    // The Podcast Index feed ID for the feed specified by the guid field passed to the request
    id: string;
  };

  // Known details of podcast feed
  feed: {
    // The internal PodcastIndex.org Feed ID.
    id: number;

    // The GUID from the podcast:guid tag in the feed. This value is a unique, global identifier for the podcast.
    // See the namespace spec for guid for details.
    podcastGuid: string;

    // Name of the feed
    title: string;

    // Current feed URL
    url: string;

    // The URL of the feed, before it changed to the current url value.
    originalUrl: string;

    // The channel-level link in the feed
    link: string;

    // The channel-level description
    // Uses the longer of the possible fields in the feed: <description>, <itunes:summary> and <content:encoded>
    description: string;

    // The channel-level author element.
    // Usually iTunes specific, but could be from another namespace if not present.
    author: string;

    // The channel-level owner:name element.
    // Usually iTunes specific, but could be from another namespace if not present.
    ownerName: string;

    // The channel-level image element.
    image: string;

    // The seemingly best artwork we can find for the feed. Might be the same as image in most instances.
    artwork: string;

    // The channel-level pubDate for the feed, if it’s sane. If not, this is a heuristic value, arrived at by analyzing other parts of the feed, like item-level pubDates.
    lastUpdateTime: number;

    // The last time we attempted to pull this feed from its url.
    lastCrawlTime: number;

    // The last time we tried to parse the downloaded feed content.
    lastParseTime: number;

    // Timestamp of the last time we got a "good", meaning non-4xx/non-5xx, status code when pulling this feed from its url.
    lastGoodHttpStatusTime: number;

    // The last http status code we got when pulling this feed from its url.
    // You will see some made up status codes sometimes. These are what we use to track state within the feed puller. These all start with 9xx.
    lastHttpStatus: number;

    // The Content-Type header from the last time we pulled this feed from its url.
    contentType: string;

    // The iTunes ID of this feed if there is one, and we know what it is.
    itunesId: number;

    // The type as specified by the itunes:type in the feed XML.
    itunesType: string;

    // The channel-level generator element if there is one.
    generator: string;

    // The channel-level language specification of the feed. Languages accord with the RSS Language Spec.
    language: string;

    // Is feed marked as explicit
    explicit: boolean;

    // Type of source feed where:
    // Allowed: 0┃1
    // 0: RSS
    // 1: Atom
    type: 0 | 1;

    // At some point, we give up trying to process a feed and mark it as dead. This is usually after 1000 errors without a successful pull/parse cycle. Once the feed is marked dead, we only check it once per month.
    dead: number;

    // The md5 hash of the following feed items in hex format.
    // title
    // link
    // feedLanguage
    // generator
    // author
    // ownerName
    // ownerEmail (note: not exposed via the API)
    // Pseudo-code:
    //   chash = md5(title+link+feedLanguage+generator+author+ownerName+ownerEmail)
    chash: string;

    // Number of episodes for this feed known to the index.
    episodeCount: number;

    // The number of errors we’ve encountered trying to pull a copy of the feed. Errors are things like a 500 or 404 response, a server timeout, bad encoding, etc.
    crawlErrors: number;

    // The number of errors we’ve encountered trying to parse the feed content. Errors here are things like not well-formed xml, bad character encoding, etc.
    // We fix many of these types of issues on the fly when parsing. We only increment the errors count when we can’t fix it.
    parseErrors: number;

    // An array of categories, where the index is the Category ID and the value is the Category Name.
    // All Category numbers and names are returned by the categories/list endpoint.
    categories: any;

    // Allowed: 0┃1
    // Tell other podcast platforms whether they are allowed to import this feed. A value of 1 means that any attempt to import this feed into a new platform should be rejected. Contains the value of the feed's channel-level podcast:locked tag where:
    // 0: 'no'
    // 1: 'yes'
    locked: number;

    // A CRC32 hash of the image URL with the protocol (http://, https://) removed. Can be used to retrieve a resized/converted version of the image specified by image from https://podcastimages.com/.

    // Using the format: https://podcastimages.com/<hash>_<size>.jpg Replace <hash> with the value in this field. The <size> is the desired image width/height. Ex: https://podcastimages.com/1011338142_600.jpg

    // Work in Progress: the podcastimages.com system is currently not working.
    imageUrlHash: number;

    // Information for supporting the podcast via one of the "Value for Value" methods.

    // Examples:

    // lightning value type: https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=169991&pretty
    // webmonetization value type: https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=779873&pretty
    value: any;

    // Information for donation/funding the podcast.
    // See the podcast namespace spec for more information.
    funding: any;
  };
  // Description of the response
  description: string;
};
