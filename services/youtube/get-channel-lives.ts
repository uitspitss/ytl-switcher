import axios from 'axios';

import { SearchResult } from './models/search-result';

const getChannelLives = async (videoId: string) => {
  let searchResult: SearchResult | null = null;
  const result = await axios.get(
    `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API_KEY}&part=snippet&type=video&eventType=live&videoId=${videoId}`,
  );

  if (result.data) {
    searchResult = result.data;
  }

  return searchResult;
};

export default getChannelLives;
