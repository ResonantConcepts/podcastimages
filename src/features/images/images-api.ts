export const VARIANT_OPTIONS = ['32', '64', '128', '256', '512', '1024'];

const createImagesClient = () => {
  return {
    uploadImage: async (url: string, id: string) => {
      const body = new FormData();
      body.append('url', url);
      body.append('id', id);
      body.append('requireSignedURLs', false);

      const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
          },
          body,
        }
      );

      try {
        return response;
      } catch (error) {
        return error;
      }
    },
  };
};

const client = createImagesClient();

export default client;
