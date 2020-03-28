import getChannelLives from './get-channel-lives';

const getLatestLive = async (apiKey: string, channelId: string) => {
  const lives = await getChannelLives(apiKey, channelId);
  const sortedLives = lives?.items.sort((va, vb) =>
    new Date(va.snippet.publishedAt).getTime() <
    new Date(vb.snippet.publishedAt).getTime()
      ? 1
      : -1,
  );
  if (sortedLives) {
    return sortedLives[0].id.videoId;
  }
};

export default getLatestLive;
