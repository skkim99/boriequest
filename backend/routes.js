const express = require('express')
const router = express.Router();

const Question = require('./models/question')
const helpers = require('./helper')

const { exec } = require('child_process');

const commands = {'scheme':'mit-scheme','haskell':'ghci','prolog':'gprolog','smalltalk':'gst'}

router.post('/:language/exec', (req, res) => {
    lines = ['echo "']
    req.body.code.forEach(element => {
        lines.push(element + '\n')
    });
    lines.push('" | ' + commands[req.params.language])
    exec(lines.join('').trim(), (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return
        }
        res.json({output: stdout})
    })
})

router.get('/:language/questions', (req, res) => {
    Question.find({ language: req.params.language}, '_id name').exec((err, qlist) => {
        if (err) {return next(err);}
        res.json(qlist)
    })
})

router.get('/:language/questions/:id', (req, res) => {
    Question.find({ _id: req.params.id}).exec((err, q) => {
        if (err) {return next(err);}
        res.json(q)
    })
})

module.exports = router