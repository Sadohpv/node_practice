import express from "express";

function configViewEngine(app) {
   app.use('public', express.static("./src/public"));
   app.use('src', express.static("./src"));

   app.set('view engine','ejs');
   app.set('views','./src/views');

   
}

export default configViewEngine;