import express, { urlencoded } from "express";
import "dotenv/config"
import cors from 'cors'
import authRouter from "./routes/auth.routes";
import errormiddleware from "./middleware/errormiddleware";
import { StatusCodes } from "http-status-codes";


const app = express();




app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cors())

app.use("/api/auth",authRouter)
// app.use("/api/tasks")
// app.use("/api/manager")


app.use("*",(req,res,next)=>{
    res.status(StatusCodes.NOT_FOUND).json({message : "route not found"})
    return next()
})

app.use(errormiddleware)

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`server is running: ${port}`);
});


