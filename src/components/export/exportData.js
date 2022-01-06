import xlsx from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { logger } from '../../helpers/logger';
import User from '../user/userModal';

module.exports = {
  exportAsExcel: async (req, res) => {
    try {
      const data = await User.find()
        .select({ _id: false, __v: false, createdAt: false, updatedAt: false })
        .lean();

      const workBook = xlsx.utils.book_new(); // create a workbook
      const workSheet = xlsx.utils.json_to_sheet(data); // create a worsheet

      xlsx.utils.book_append_sheet(workBook, workSheet); // add worksheet to workbook
      xlsx.writeFile(workBook, './public/data/export/users.xlsx'); // save workbook to specified path

      return res.status(200).json({
        message: 'Data exported successfully',
      });
    } catch (err) {
      return res.status(400).json({
        err,
      });
    }
  },
  exportAsPdf: async (req, res) => {
    try {
      const doc = new jsPDF(); // Initiate jsPDF to create new pdf doc

      const data = await User.find()
        .select({ _id: false, __v: false, createdAt: false, updatedAt: false })
        .lean(); // Fetch data

      const keys = Object.keys(data[0]); // Extract keys from Json array
      const valuesArray = [];
      data.forEach((obj) => {
        valuesArray.push(Object.values(obj)); // Extract keys from Json array
      });

      // construct table in pdf , add keys and values
      doc.autoTable({
        theme: 'grid',
        head: [keys],
        body: valuesArray,
      });

      doc.save('./public/data/export/users.pdf'); // Save pdf

      return res.status(200).json({
        message: 'Data exported successfully',
      });
    } catch (err) {
      logger.error(err);
      return res.status(400).json({
        err,
      });
    }
  },
};
