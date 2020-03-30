import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.disable('x-powered-by');
app.listen(process.env.PORT, () =>
  console.log(
    '\x1b[7m\x1b[5m\x1b[42m\x1b[94m%s\x1b[0m',
    `Application listening on PORT ${process.env.PORT}`
  )
);
