import { diskStorage } from 'multer';
import { extname } from 'path';

export const storage = diskStorage({
  destination: './uploads', // Note, ideally we should use the tmp dir
  filename: (req, file: Express.Multer.File, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file: Express.Multer.File) {
  return `${Date.now()}${extname(file.originalname)}`;
}
