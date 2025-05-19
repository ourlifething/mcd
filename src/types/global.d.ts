import { MongoClient } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
// ※ export {} を最後に入れることでこのファイルを「モジュール」として扱い、グローバルスコープの衝突を防ぎます。