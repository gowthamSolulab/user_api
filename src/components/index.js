import express from 'express';

import user from './user/userRoutes';
import uploadData from './uploadData/uploadDataRoutes';

const router = express.Router();

router.use('/users', user);
router.use('/upload-data', uploadData);

export default router;
