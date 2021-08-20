const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1185998",
    key: "b10444504d1ebd20401e",
    secret: "b3a75dafe8fbe93bea86",
    cluster: "us2",
    useTLS: true
  });

router.get('/', (req,res) => {
    res.send('POLL');
});

router.post('/', (req,res) => {
    pusher.trigger('Lunch-poll', 'Lunch-vote', {
        points: 1,
        os: req.body.os
      });

      return res.json({succeed: true, message: 'thank you for voting!'});
});

module.exports = router;