const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

router.post('/login', async (req, res, next) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(401).json({
        message: 'blanks are not allowed',
      });
    }

    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(200).json({
        message: 'register already done'
      });
    }

    await User.create({
      email,
    });
    return res.status(200).json({
      message: 'register success'
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;