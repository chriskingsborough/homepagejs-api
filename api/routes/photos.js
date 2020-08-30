const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./data/homepage.db');

// get photos
router.get('/', function (req, res) {
    db.all(
        "SELECT id, photo_path, description FROM photos",
        function(err, rows) {
            if (err) {
                res.status(400).json(err)
            }
            res.status(200).json(rows);
        })
})
// delete photos

// post photos
router.post('/', function(req, res) {
    const {photo_path, description} = req.body;

    const sql = (
        `INSERT INTO photos
         (photo_path, description)
         VALUES ($photo_path, $description);
        `
    )
    db.run(sql, {
        $photo_path: photo_path,
        $description: description
    }, function(err) {
        if (err) {
            res.status(400).json(err);
        }
        res.status(200).json({status: 'Recorded Inserted'});
    })
})

module.exports = router;