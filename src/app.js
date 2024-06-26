import express from 'express'
import cors from "cors";
import cookiesParser from "cookies-parser";
const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

// 3 major express middlewares
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static('public'))
app.use(cookiesParser())

// routes
import userRouter from "./routes/user.routes.js"


// route declaration
app.use("/api/v1/user", userRouter)

// https://localhost:8080/api/v1/users/register
export { app } 