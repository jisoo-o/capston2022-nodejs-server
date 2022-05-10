const express = require('express');

const User = require('../models/user');

const router = express.Router();


router.post('/post/nickname', async (req, res, next) => {
  const { email, nick } = req.body;
  try {
    if (!email) {
      return res.status(401).json({
        message: 'blanks are not allowed',
      });
    }

    try {
      const result = await User.update({
        nick: nick,
      }, {
        where: { email: email },
      });
      return res.status(200).json({
        message: 'post nickname succeess'
      });
    } catch (err) {
      return res.status(401).json({
        message: 'post nickname failed'
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;