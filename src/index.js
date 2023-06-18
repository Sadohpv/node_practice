import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import initWebRoutes from './routes/web'
import configViewEngine from "./config/viewEngine";
import { connectDB } from "./config/connectDB";
import cors from 'cors'
const app = express();
app.use(cors());

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

configViewEngine(app);
initWebRoutes(app);


connectDB();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})