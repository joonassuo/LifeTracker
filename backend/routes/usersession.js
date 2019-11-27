const router = require('express').Router();
let UserSession = require('../models/user.session.model');

router.route('/').get((req, res) => {
    UserSession.find()
        .then(userSession => res.json(userSession))
        .catch(err => console.log('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const newSession = new UserSession();
    newSession.userId = req.body.userId;
    newSession.username = req.body.username;
    newSession.timestamp = req.body.timestamp;

    newSession.save()
        .then(() => res.json('New usersession added!'))
        .catch(err => console.log('Error: ') + err)
})

module.exports = router;