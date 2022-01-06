import csv from 'csvtojson';
import jsonexport from 'jsonexport';
import fs from 'fs';
import request from 'request';

import { logger } from '../../helpers/logger';
import User from '../user/userModal';

module.exports = {
  uploadCsv: async (req, res) => {
    try {
      fs.writeFileSync('./public/csv/file.csv', req.file.buffer); //  csv as buffer using multer
      const jsonArray = await csv().fromFile('./public/csv/file.csv');
      jsonArray.forEach((obj) => {
        request(
          {
            url: obj.photo, // Url of image to download.
            encoding: null,
          },
          (err, resp, buffer) => {
            fs.writeFileSync(`./public/img/${obj.username}.jpg`, buffer); // Downloading images to public folder
          }
        );
        obj.photo = `./public/img/${obj.username}.jpg`; // Storing image path in photo field
      });

      const users = await User.create(jsonArray);
      if (users)
        jsonexport(jsonArray, (err, jsonData) => {
          if (err)
            return res.status(400).json({
              err,
            });
          fs.writeFileSync('./public/csv/file.csv', jsonData);
        });

      return res.status(200).json({
        message: 'csv to json converted successfully',
      });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({
        err,
      });
    }
  },
};
