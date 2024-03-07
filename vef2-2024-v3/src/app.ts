import dotenv from 'dotenv';
import { cors } from './lib/cors.js';
import express, { NextFunction, Request, Response } from 'express';
import { router } from './routes/api.js';
import { handleError} from './lib/requests.js';

dotenv.config();


const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Boltadeildin API');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send('Something went wrong');
});

app.use(cors);
app.use(express.json());
app.use(router);
app.use(handleError);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
