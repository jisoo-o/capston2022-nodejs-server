const express = require('express');

const User = require('../models/user');
const Word = require('../models/word');
const db = require
const router = express.Router();


router.get('/search/word', async (req, res, next) => {
  const { email, word } = req.body;
  try {
    if (!email || !word) {
      return res.status(401).json({
        message: 'blanks are not allowed',
      });
    }

    try {
      const exWord = await Word.findOne({ where: { word }});

      if (exWord) {
        return res.status(200).json({
          word : exWord.word,
          meaning: exWord.meaning,
          path : exWord.path
        });
      } else {
        return res.status(401).json({
          message: 'word doesn\'t exist'
        });
      }


    } catch (err) {
      return res.status(401).json({
        message: 'post search word failed'
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;