const express = require('express');
const {s3Client} = require('./_s3Client');
const {PutObjectCommand} = require('@aws-sdk/client-s3');
const app = express();


app.use(express.json());

app.post('/putPostToS3', async (req, res, next) => {
  const params = req.body;
  const d = await s3Client.send(new PutObjectCommand(params));
  res.json(d);
});

module.exports = app;
