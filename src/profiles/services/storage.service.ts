import { Injectable } from '@nestjs/common';
// Imports the Google Cloud client library
import { Storage } from '@google-cloud/storage';
// Note, ideally we should move this to a config
// file and inject it via constructor
// Skipped for this demo
const storage = new Storage({
  keyFilename: 'prod.json',
  projectId: 'ignasi-155812',
});
const bucketName = 'visage-demo-v2';

@Injectable()
export class StorageService {
  async create(filePath: string, filename: string) {
    await storage.bucket(bucketName).upload(
      filePath,
      {
        destination: filename,
      },
      (e) => {
        throw Error(e.message);
      },
    );
  }
}
