const router = require('express').Router()
const fs = require('fs')
const { Router } = require('express');
const path = require("path");
const notes = require("../../db/db.json");
console.log(notes)

//api get and post code

router.get('/notes', (req, res) => {
    res.send(notes)
})

router.post('/notes', (req, res) => {
    var request = req.body
    var array = notes
    var random = Math.random()
    request.id = ((array.length * random).toString().slice(2)) || random.toString().slice(2)
    array.push(request)
    fs.writeFileSync(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify( array , null, 2)
    );

    console.log(array)
})

// couldnt figure this part out, the db.json file gets rewritten with new data
// excluding the deleted note but unless I stop and restart the server, that data doesn't
// get saved on the webpage.

router.delete('/notes/:id', (req, res) => {
    const deleteId = req.params.id
    console.log(deleteId)
    var newArray
    
    newArray = notes.filter((note) => {
        if(note.id !== deleteId) {
            return true
        }
    })

    console.log(newArray)
    fs.writeFileSync(path.join(__dirname, "../../db/db.json"),
    JSON.stringify(newArray , null, 2), (err) => {
        if (err) throw err
        else res.status(200)
    })

})

module.exports = router