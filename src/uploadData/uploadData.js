import csv from 'csvtojson';
import jsonexport from 'jsonexport';

import fs from 'fs';
import request from 'request';
import User from '../modals/userModal';

module.exports = {
  uploadCsv: async (req, res) => {
    try {
      fs.writeFileSync('./temp/csv/file.csv', req.file.buffer);
      const jsonArray = await csv().fromFile('./temp/csv/file.csv');
      jsonArray.forEach((obj) => {
        request(
          {
            url: obj.photo,
            encoding: null,
          },
          (err, resp, buffer) => {
            fs.writeFileSync(`./temp/images/${obj.username}.jpg`, buffer);
          }
        );
        obj.photo = `./temp/images/${obj.username}.jpg`;
      });
      // await User.deleteMany();
      const users = await User.create(jsonArray);
      if (users)
        jsonexport(jsonArray, (err, csv) => {
          if (err)
            return res.status(400).json({
              err,
            });
          fs.writeFileSync('./temp/csv/file.csv', csv);
        });

      return res.status(200).json({
        message: 'csv to json converted successfully',
      });
    } catch (err) {
      // logger.error(err);
      return res.status(400).json({
        err,
      });
    }
  },
};
