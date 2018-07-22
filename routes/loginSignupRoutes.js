var router = require('express').Router();
var loginSignupDbOpr=require('./../database/loginSignupDbOperations');
loginSignupDbOpr.emailer = require('../businessLayer/Emailer.js');

router.use(function (req, res, next) {
    next();
});

router.get('/', (req, res) => {
    res.send('recieved get');
});

router.get('/verify', (req, res) => {
    loginSignupDbOpr.verifyAccount(req.query.a).then((oprRes)=>{
        if (oprRes.result.n) {
            res.send(`
            <h2>DeSocialize</h2>
            <p>Your account has been verified.</p>
            <a href='/'>Click here to Login</a>`)
        }else{
            res.send(`
            <h2>DeSocialize</h2>
            <p>Maybe the link is broken?</p>
            <p>Or perhaps this account has already been verified.</p>
            <a href='/'>Click here to Login</a>`)
        }
    }).catch((err)=>{
        res.send({'message':'Maybe the link is broken??'})
    });
});

router.post('/validateUsername',(req, res)=>{
    loginSignupDbOpr.checkUsernameExistance(req.body.username).then((oprRes)=>{
        res.send({'status':oprRes});
    })
})

router.post('/addNewUser',(req, res)=>{
    loginSignupDbOpr.checkEmailExistance(req.body.email).then((oprRes)=>{
        if(!oprRes){
            loginSignupDbOpr.addLoginDetails(req.body).then((oprRes) => {
                res.send({
                    'status':oprRes.insertedCount==1
                });
                loginSignupDbOpr.emailer.mailOptions.to=req.body.email;
                loginSignupDbOpr.emailer.mailOptions.subject=`Account Verification ${req.body.userName}`;
                loginSignupDbOpr.emailer.mailOptions.html=`
                <h4>Account Verification Email</h4>
                <p style="margin:4px;">Hi ${req.body.userName}</p>
                <p style="margin:4px;">Thanks for Signing Up with DeSocialize.</p>
                <p style="margin:4px;">You must follow this link to activate your account</p>
                <p>http://obscure-sea-69570.herokuapp.com/verify?a=${oprRes.insertedId}</p>
                <p style="margin-bottom:4px;">Thanks and Regards</p>
                <p style="margin-top:4px;">The DeSocializers</p>
                `;
                loginSignupDbOpr.emailer.sendMail();
            });
        }
        else{
            res.send({
                'status': false
            });
        }
    })
})

router.post('/validateUserLogin',(req, res)=>{
    loginSignupDbOpr.validateUserLogin(req.body).then((oprRes)=>{
        res.send({
            'status':oprRes
        })
    });
})

module.exports = router;