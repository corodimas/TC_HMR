const express = require("express")
const router = express.Router()
const { patients, clinics } = require('../models')

router.get("/", async (req,res)=>{
    const list_of_patients = await patients.findAll();
    res.json(list_of_patients)
});

router.get('/byId/:id', async (req,res)=>
{
    const id = req.params.id
    const post = await patients.findByPk(id)
    res.json(post);
})

router.get('/clinic', async (req,res) =>{
    const list_of_clinics = await clinics.findAll();
    res.json(list_of_clinics);
});

router.get('/clinic/byId/:id', async (req,res) =>{
    const id = req.params.id
    const post = await clinics.findByPk(id)
    res.json(post);
});

router.post("/", async (req,res)=>
{
    const post = req.body
    await patients.create(post)
    res.json(post);
})

module.exports = router