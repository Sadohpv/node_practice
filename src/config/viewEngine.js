import express from "express";

function configViewEngine(app) {
   app.use('/data', express.static("./src/data"));
  

   app.set('view engine','ejs');
   app.set('views','./src/views');

   
}

export default configViewEngine;