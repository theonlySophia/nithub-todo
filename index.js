import express from "express"; 
import {PORT} from "./Config/constants.js";
import {authenticateDB} from "./Config/db.js";
import {defineAssociations} from "./Models/Associations.js";
import {Task_Details} from "./Models/Task_Details.js";
import {Task_Info} from "./Models/Task_Info.js";
import {User_Table} from "./Models/user_Table.js";
import {notFound} from "./Middlewares/notFound.js";
import{errHandler} from "./Middlewares/errHandler.js";
import {todoRoutes} from "./Routes/todoRoutes.js";


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Home Page"
    })
})

app.use('/ToDo',todoRoutes)

app.use(notFound)
app.use(errHandler)

const startApp = ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is listening on port ${PORT} `)

    })
    authenticateDB();
}

defineAssociations();

startApp()