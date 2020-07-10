const express = require('express')

const db = require('../data/helpers/projectModel');

const router = express.Router();

router.get('/', (req,res)=>{
    db.get()
    .then(projects=>{
        res.status(200).json(projects)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}) 

router.post('/', (req,res)=>{
    const newProject = req.body

    if(!newProject.name || !newProject.description){
        res.status(400).json({ message: "Please provide name and description"})
    } else if (newProject.name && newProject.description){
    db.insert(newProject)
    .then(project=>{
        res.status(204).json({message:project.name})
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
}) 
router.put('/:id', (req,res)=>{
    const newPut = req.body
    const {id} = req.params

    if(!newPut.name || !newPut.description){
        res.status(400).json({ message: "Please provide name and description"})
    } else if (newPut.name && newPut.description){
    db.update(id, newPut)
    .then(put=>{
        res.status(200).json(newPut)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
}) 
router.delete('/:id', (req,res)=>{
    const {id} = req.params
    if(!id){
        res.status(404).json({errorMessage:"Id not found"})
    } else if (id){
    db.remove(id)
    .then(deleted=>{
        res.status(200).json({deleted})
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
}) 

router.get("/:id", (req,res)=>{
    const {id} = req.params

    db.getProjectActions(id)
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})



module.exports = router
