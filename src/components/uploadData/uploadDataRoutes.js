import express from 'express';
import { uploadFile } from '../../middleware/fileUpload'; //  middleware for file uploads
import { uploadCsv } from './uploadData';

const router = express.Router();

router.route('/csv-file').post(uploadFile, uploadCsv);

export default router;
