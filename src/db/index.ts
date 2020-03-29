import Dexie from 'dexie';

type LiveField = {
  id: number;
  videoId: string;
  channelId: string;
  isMuted: boolean;
  updatedAt: number;
};

type ApiKeyField = {
  id: number;
  key: string;
};

class Database extends Dexie {
  lives: Dexie.Table<LiveField, number>;

  apiKey: Dexie.Table<ApiKeyField, number>;

  constructor() {
    super('ytlSwitcher');
    this.version(1).stores({
      lives: '&++id, videoId, channelId, isMuted, updatedAt',
      apiKey: '&id, key',
    });

    this.lives = this.table('lives');
    this.apiKey = this.table('apiKey');
  }

  addLive(live: Live) {
    const add = async () => {
      const id = (await this.lives.toArray()).length + 1;
      this.lives.add({ id, ...live });
    };
    add();
  }

  deleteLive(videoId: string) {
    const del = async () => {
      const id = await this.lives.where({ videoId }).first((v) => v?.id);
      if (id) this.lives.delete(id);
    };
    del();
  }

  updateLive(live: Live) {
    const update = async () => {
      const id = await this.lives
        .where({ channelId: live.channelId })
        .first((v) => v?.id);
      if (id) this.lives.update(id, live);
    };
    update();
  }

  putApiKey(apiKey: string) {
    this.apiKey.put({ id: 1, key: apiKey });
  }

  async fetchData() {
    return {
      lives: await this.lives.toArray(),
      apiKey: (await this.apiKey.get({ id: 1 }))?.key || '',
    };
  }
}

export default new Database();
