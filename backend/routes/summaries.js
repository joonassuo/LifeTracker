const router = require('express').Router();
let Summary = require('../models/daily.summary.model');

router.route('/').get((req, res) => {
    Summary.find()
        .then(summaries => res.json())
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    let r = req.body;
    const username = r.username; 
    const nicotine = Number(r.nicotine);
    const excersice = r.excersice;
    const sport = r.sport;
    const duration = r.duration;
    const meditation = Number(r.meditation);
    const mood = Number(r.mood);
    const date = Date.parse(r.date);

    const newSummary = new Summary({
        username,
        nicotine,
        excersice,
        sport,
        duration,
        meditation,
        mood,
        date
    });

    newSummary.save()
        .then(() => res.json('New summary added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;