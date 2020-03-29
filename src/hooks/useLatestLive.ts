import { useEffect, useState } from 'react';

import getLatestLive from '../services/youtube/get-latest-live';
import { LatestLive } from '../services/youtube/models/search-result';

const useLatestLive = (
  apiKey: string,
  { channelId, videoId, updatedAt }: Live,
) => {
  const [latestLive, setLatestLive] = useState<LatestLive>({
    channelId,
    videoId,
    updatedAt,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      if (channelId && channelId.length > 0) {
        setLoading(true);
        try {
          const now = new Date().getTime();
          if (updatedAt === -1 || now - updatedAt < 3 * 60 * 60 * 1000) return;
          setLatestLive({ channelId, videoId, updatedAt });
          const vid = await getLatestLive(apiKey, channelId);
          if (vid) {
            setLatestLive({
              channelId,
              videoId: vid,
              updatedAt: new Date().getTime(),
            });
          }
        } catch (err) {
          setError(err);
        }
        setLoading(false);
      }
    };

    load();
  }, [apiKey, channelId, videoId, updatedAt]);

  return { latestLive, loading, error };
};

export default useLatestLive;
