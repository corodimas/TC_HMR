const express = require("express")
const router = express.Router()
const { Employees } = require('../models')

router.get("/", async (req,res)=>{
    const list_of_employees = await Employees.findAll();
    res.json(list_of_employees)
});


router.get('/:EmployeesId', async (req,res) =>{
    const PatientId = req.params.PatientId
    const courses = await Courses.findAll({where: {patientId: EmployeesId}});
    res.json(courses);
});

router.post("/", async (req,res)=>
{
    const employees = req.body
    await Employees.create(employees)
    res.json(employees);
})

module.exports = router