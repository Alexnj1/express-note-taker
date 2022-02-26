const router = require("express").Router();
const path = require("path");
const notes = require('../api/notes')

router.use(notes)

module.exports = router
