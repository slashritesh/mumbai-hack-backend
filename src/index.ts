import express, { NextFunction, Request, Response, urlencoded } from "express";
import cors from 'cors'
import authRouter from "./routes/auth.routes";

const app = express();
app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cors())

app.use("/api/auth",authRouter)
app.use("/api/tasks")
app.use("/api/manager")


app.use("*",(req : Request,res : Response,next : NextFunction)=>{
    res.status(404).json({message : "route not found"})
    next()
})

const port = 4000;

app.listen(port, () => {
    console.log(`server is running: ${port}`);
});
