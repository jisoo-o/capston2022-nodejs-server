const express = require('express');

const User = require('../models/user');
const Word = require('../models/word');
const db = require('../models/index');

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
      const exUser = await db.User.findOne({where :{email}});

      if (exWord && exUser) {
        // incease search log count
        
        try {
          const [row, created] = await db.sequelize.models.search.findOrCreate({ 
            where : { WordId : exWord.id , UserId : exUser.id }
          });
          
          if (!created) {
            await db.sequelize.models.search.update({
              count: row.count + 1,
            }, {
              where: { WordId : exWord.id , UserId : exUser.id },
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

module.exports = router;