import express from 'express';
import { uploadFile } from '../middleware/fileUpload';
import { uploadCsv } from '../uploadData/uploadData';
const router = express.Router();

router.route('/csv-file').post(uploadFile, uploadCsv);

export default router;
