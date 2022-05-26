const express = require('express');

const User = require('../models/user');
const Word = require('../models/word');
const Search = require('../models/search');
const db = require('../models/index');

const router = express.Router();


router.post('/search/word', async (req, res, next) => {
  const { email, word } = req.body;
  try {
    if (!email || !word) {
      return res.status(401).json({
        message: 'blanks are not allowed',
      });
    }

    try {
      const exWord = await Word.findOne({ where: { word }});
      const exUser = await User.findOne({where :{email}});

      if (exWord && exUser) {
        // incease search log count
        try {
          let record = await Search.findOne({
            where: { UserId: exUser.id, WordId: exWord.id },
          });

          if (record) {
            await Search.update({
              count: record.count + 1,
            }, {
              where: { WordId : exWord.id , UserId : exUser.id },
            });
          } else {
            await Search.create({
              UserId : exUser.id,
              WordId : exWord.id,
              count : 1
            });
          }

        } catch (err) {
          return res.status(401).json({
            message: 'register log failed'
          });
        }

        return res.status(200).json({
          word : exWord.word,
          meaning: exWord.meaning,
          path : exWord.path,
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


router.post('/search/record', async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(401).json({
        message: 'blanks are not allowed',
      });
    }

    const exUser = await db.User.findOne({where :{email}});

    if (exUser) {        
      try {
        const words = await Search.findAll({
          where: { UserId: exUser.id},
          include: {
            model: Word,
          }
        });

        return res.status(200).json(words);
      } catch (err) {
        console.log(err);
        return res.status(401).json({
          message: 'words finding error'
        });
      }
    } else {
      return res.status(401).json({
        message: 'sending response error'
      });
    }
    
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;