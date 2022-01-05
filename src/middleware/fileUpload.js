import multer from 'multer';

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
});

module.exports = {
  uploadFile: upload.single('csv'),
};
