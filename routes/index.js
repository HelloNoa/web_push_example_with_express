// import { sendNotification } from "web-push";
var webpush = require('web-push')
var express = require('express');
var router = express.Router();

const KEY = require('./../key.json');
const tokenList = [];

webpush.setVapidDetails(
    "https://webpush.hellonoa.dev",
    KEY.VAPID_PUBLIC_KEY,
    KEY.VAPID_PRIVATE_KEY
)
router.post("/register", function (req, res) {
    tokenList.push(req.body.subscription);
    res.send("success");
});

/* GET home page. */
router.get('/test', async function (req, res, next) {
    const options = {
        TTL: 24 * 60 * 60,
        vapidDetails: {
            // subject: "http://localhost:3000/", // 서버 주소
            subject: "https://webpush.hellonoa.dev", // 서버 주소
            publicKey: KEY.VAPID_PUBLIC_KEY,
            privateKey: KEY.VAPID_PRIVATE_KEY,
        },
    };

    const payload = JSON.stringify({ title: 'Hello', body: 'This is a push notification!' });

    try {
        await Promise.all(
            tokenList.map(async (t) => {
                console.log(t);
                webpush.sendNotification(t, payload)
                    .then(response => console.log('Sent successfully', response))
                    .catch(error => console.error('Error sending notification', error));
            })
        );
    } catch (e) {
        console.error(e);
    }

    res.send("success");
    // res.render('index', { title: 'Express' });
});

module.exports = router;
