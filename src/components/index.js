import express from 'express';

import user from './user/userRoutes';
import uploadData from './uploadData/uploadDataRoutes';
import exportData from './export/exportDataRoutes';

const router = express.Router();

router.use('/users', user);
router.use('/upload-data', uploadData);
router.use('/export-data', exportData);

export default router;
