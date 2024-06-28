import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import personRoutes from './routes/person'
import dutyRoutes from './routes/duty'
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT 

app.use(cors())

app.use(express.json())

app.use('/api/person', personRoutes)
app.use('/api/duty', dutyRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at port: ${port}`);
});