var router = require('express').Router();
var quesDbOperations = require('./../database/questionDbOperations');
const validateReq = require('./../middlewares/Validation.js');

router.post('/addquestion', validateReq, (req, res) => {
    quesDbOperations.fetchQuestionCount().then(oprRes=>{
        quesDbOperations.addQuestion(req.body,oprRes).then(oprRes => {
            res.send(oprRes);
        })
    })
});

router.post('/fetchquestiondata', validateReq, (req, res) => {
    quesDbOperations.getQuestionData(req.body).then(oprRes=>{
        res.send(oprRes[0]);
    })
});

module.exports = router;