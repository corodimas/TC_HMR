const express = require('express');
const db = require('./models')
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());

//Routers
const postRouter = require('./routs/patient')
const courseRouter = require('./routs/course')
const employeesRouter = require('./routs/employee')
app.use("/patient",postRouter)
app.use("/course",courseRouter)
app.use("/employee",employeesRouter)

db.sequelize.sync().then(()=>
{
    app.listen(3001,()=>{
        console.log("Server running on port 3001");
    });
    
})

