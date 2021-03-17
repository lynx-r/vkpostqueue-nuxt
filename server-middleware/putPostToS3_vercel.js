import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const S3_BUCKET = process.env.S3_BUCKET;

const s3 = new S3Client({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  },
  region: process.env.S3_REGION
});

export default async (req, res) => {
  try {
    if (req.method === 'POST') {
      console.log(1);
      console.log(-1, Object.getOwnPropertyNames(req));
      const putParams = {...req.body, Bucket: S3_BUCKET};
      console.log(2, putParams);
      const putRes = await s3.send(new PutObjectCommand(putParams));
      res.json(putRes);
    } else {
      res.status(405);
    }
  } catch (e) {
    res.end(e.message);
  }
}
