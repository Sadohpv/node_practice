import express from "express";
import 'dotenv/config';
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import initWebRoutes from './routes/web'
import configViewEngine from "./config/viewEngine";
import { connectDB } from "./config/connectDB";
import cors from 'cors'
const app = express();
app.use(cors());
app.use(fileUpload());
// app.use(express.static("files"));
// Add headers before the routes are defined
// app.use(function (req, res, next) {


//   // Website you wish to allow to connect
//     // running front-end application on port 3000
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     // Pass to next layer of middleware
//     next();
// });
//config app

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

configViewEngine(app);
initWebRoutes(app);


connectDB();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})