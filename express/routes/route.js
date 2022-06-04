const express = require('express')
const router = express()

const Contact = require('../models/contact')

router.get('/contacts', (req, res, next) => {
    Contact.find((err, contacts) => {
        res.json(contacts)
    })
})

router.post('/contacts', (req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
    })
    newContact.save((err, contact)=>{
        if(err){
            res.json({msg:err})
        }
        else{
            res.json({msg:"success"})
        }
    })
})

router.delete('/contacts/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            res.json(err)
        } else {
            res.json("success")
        }
    });
})

module.exports = router
