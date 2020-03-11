import { useEffect, useState } from 'react';

import getChannelLives from '../services/youtube/get-channel-lives';
import { LatestLive } from '../services/youtube/models/search-result';

const useYTL = (channelId: string) => {
  const [latestLive, setLatestLive] = useState<LatestLive | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      if (channelId.length >= 1) {
        setLoading(true);
        try {
          const lives = await getChannelLives(channelId);
          const sortedLives = lives?.items.sort((va, vb) =>
            new Date(va.snippet.publishedAt).getTime() <
            new Date(vb.snippet.publishedAt).getTime()
              ? 1
              : -1,
          );
          if (sortedLives) {
            setLatestLive({ videoId: sortedLives[0].id.videoId });
          }
        } catch (err) {
          setError(err);
          setLatestLive(null);
        }
        setLoading(false);
      }
    };

    load();
  }, [channelId]);

  return { latestLive, loading, error };
};

export default useYTL;
