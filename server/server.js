const express = require('express');
require('dotenv').config();
const {hash, compare} = require('./hashing/hashingOperation');
const userModel = require('./database/schemas/userSchema');
const magicString = require('./magicString');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL.toString(), {
  useNewUrlParser: true,
});

app.get('/', (req, res) => {
  res.send('hello world, bu denemedir.');
});

app.post('/api/createUser', async (req, res) => {
  const data = req.body;
  try {
    const isMailUsable = await new Promise((resolve, reject) => {
      userModel.find({mail: data.mail}, (err, users) => {
        if (err) throw err;
        if (users.length > 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    const hashedPassword = await hash(data.password);

    if (isMailUsable) {
      userModel.create({
        name: data.name,
        surname: data.surname,
        mail: data.mail,
        password: hashedPassword,
      });
    } else {
      throw magicString.MAIL_ALREADY_EXISTS;
    }
    res.json({
      code: 200,
      message: 'success',
    });
  } catch (error) {
    res.json({
      code: 400,
      message: error,
    });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const data = req.body;
    const userData = await new Promise((resolve, reject) => {
      userModel.findOne({mail: data.mail}, (err, data) => {
        if (err) throw err;
        resolve(data);
      });
    });
    if (userData === null) {
      throw magicString.USER_DOESNT_EXISTS;
    }

    const IsPasswordMatching = await compare(data.password, userData.password);
    if (IsPasswordMatching) {
      res.json({
        code: 200,
        message: 'success',
        user: {
          name: userData.name,
          surname: userData.surname,
          mail: userData.mail,
          _id: userData._id,
        },
      });
    } else {
      throw magicString.WRONG_PASSWORD;
    }
  } catch (error) {
    res.json({code: 400, message: error});
  }
});

app.listen(process.env.PORT);