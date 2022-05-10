// const express = require('express');

// const User = require('../models/user');
// const Word = require('../models/word');
// const db = require
// const router = express.Router();


// router.post('/search/word', async (req, res, next) => {
//   const { email, word } = req.body;
//   try {
//     if (!email || !word) {
//       return res.status(401).json({
//         message: 'blanks are not allowed',
//       });
//     }

//     try {
//       const word = Word.findOne({ where: {word}});
//       if (word) {
//         User.hasMany()

//         return res.status(200).json({
//           meaning: word.
//         });
//       } else {
//         return res.status(401).json({
//           message: 'word doesn\'t exist'
//         });
//       }


      






//       await User.update({
//         nick: nick,
//       }, {
//         where: { email: email },
//       });
//       return res.status(200).json({
//         message: 'post nickname succeess'
//       });


//     } catch (err) {
//       return res.status(401).json({
//         message: 'post search word failed'
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return next(error);
//   }
// });

// module.exports = router;