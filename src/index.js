// require('dotenv').config({path: './env'})
import dotenv from 'dotenv' // better approch
import connectDB from "./db/index.js";

import express from "express";
const app = express()

dotenv.config({
  path: './.env '
})
connectDB().then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is runnig at port: ${process.env.PORT}`);
  })
})
  .catch((err) => {
    console.log(`Mongodb connection failed: ${err}`);
  })



/*  first approch


  // iifi
  (async () => {
    try {
      await mongoose.connect(`${process.env.MONODB_URI}/${DB_NAME}`)
      app.on('error', (error) => {
        console.log("Error", error);
        throw error
      })

      app.listen(process.env.PORT, () => {
        console.log(`App is listing on port ${process.env.PORT}`);
      })

    } catch (error) {
      console.log("Error ->", error);
    }
  })()
*/