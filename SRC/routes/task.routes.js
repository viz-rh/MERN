const express = require("express");
const router = express.Router()
const Task = require('../models/task');

const { request } = require("express");


router.get("/",async (req,res) => {
    const tasks = await Task.find()
 
    res.json(tasks)
})

router.get("/:id",async (req,res) => {
    const task = await Task.findById(req.params.id)
    res.json(task)
})

router.post('/', async (req, res) =>{
    const {title, description} = req.body
    const task  = new Task({title, description})
    await task.save()
    res.json(status= "tarea guardada")
})
router.put('/:id', async (req, res) =>{
   const {title, description} = req.body
   const newtask = {title, description}
    await Task.findByIdAndUpdate(req.params.id, newtask,{useFindAndModify: false})
   console.log(req.params.id)
    res.json({status: "task update",value: newtask, id: req.body.id})
})
router.delete('/:id', async (req,res) =>{
  await  Task.findByIdAndRemove(req.params.id)
  res.json({status: "tarea eliminada"})
})

module.exports = router