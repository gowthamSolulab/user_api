import express from 'express';
import { exportAsExcel, exportAsPdf } from './exportData';

const router = express.Router();

router.route('/excel').get(exportAsExcel);
router.route('/pdf').get(exportAsPdf);

export default router;
