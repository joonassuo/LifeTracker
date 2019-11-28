const router = require('express').Router();
let Summary = require('../models/daily.summary.model');

router.route('/').get((req, res) => {
    Summary.find()
        .then(summaries => res.json(summaries))
        .catch(err => res.status(400).json('Error: ' + err));
});

// ROUTE TO ADD A SUMMARY
router.route('/add').post((req, res) => {
    let r = req.body;
    const username = r.username; 
    const nicotine = Number(r.nicotine);
    const excersice = r.excersice;
    const sleep_start = r.sleep_start;
    const sleep_stop = r.sleep_stop;
    const meditation = Number(r.meditation);
    const mood = Number(r.mood);
    const date = Date.parse(r.date);

    const newSummary = new Summary({
        username,
        nicotine,
        excersice,
        sleep_start,
        sleep_stop,
        meditation,
        mood,
        date
    });

    newSummary.save()
        .then(() => res.json('New summary added!'))
        .catch((err) => res.status(400).json('Error: ' + err));
});

// ROUTE TO GET A SUMMARY WITH ID
router.route('/:id').get((req, res) => {
    Summary.findById(req.params.id)
        .then(excersice => res.json(excersice))
        .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;