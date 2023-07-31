const express = require('express');
const db = require('./models')
const cors = require('cors')
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

//Routers
const postRouter = require('./routs/patient')
const courseRouter = require('./routs/course')
const employeesRouter = require('./routs/employee')
const UsersRouter = require('./routs/Users')
app.use("/patient",postRouter)
app.use("/course",courseRouter)
app.use("/employee",employeesRouter)
app.use('/auth',UsersRouter)

db.sequelize
.sync()
.then(()=>{
        app.listen(process.env.PORT || 3001, () =>{
            console.log("Server running on port 3001")
        }) 
    }).catch((err)=>{
        console.log(err);
    })


