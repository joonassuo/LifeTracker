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
    const userId = r.userId;
    const hit_the_sack = r.hit_the_sack;
    const wake_up = r.wake_up;
    const nicotine = r.nicotine;
    const excersice = r.excersice;
    const meditation = r.meditation;
    const mood = r.mood;
    const date = r.date;

    const newSummary = new Summary({
        userId,
        hit_the_sack,
        wake_up,
        nicotine,
        excersice,
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