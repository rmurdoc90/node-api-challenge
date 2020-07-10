const express = require('express')

const db = require('../data/helpers/actionModel');

const router = express.Router();

router.get('/', (req,res)=>{
    db.get()
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}) 

router.get('/:id', (req,res)=>{
    const {id} = req.params
    db.get(id)
    .then(actions=>{
        res.status(200).json(actions)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}) 

router.post('/', (req,res)=>{
    const newAction = req.body

    if(!newAction.description){
        res.status(400).json({ message: "Please provide description"})
    } else if (newAction.description){
    db.insert(newAction)
    .then(data=>{
        res.status(204).json(data)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}
}) 

router.put('/:id', (req,res)=>{
    const newPut = req.body
    const {id} = req.params

    if(!newPut.description){
        res.status(400).json({ message: "Please provide name and description"})
    } else if (newPut.description){
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


module.exports = router