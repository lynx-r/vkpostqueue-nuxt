import { PutObjectCommand } from '@aws-sdk/client-s3'
import express from "express";
import { S3Client } from './_S3Client'

const app = express();


app.use(express.json());

app.post('/putPostToS3', async (req, res, next) => {
  const params = req.body;
  const d = await S3Client.send(new PutObjectCommand(params));
  res.json(d);
});

module.exports = app;
