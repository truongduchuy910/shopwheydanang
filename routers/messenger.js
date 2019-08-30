const messenger = require('../modules/messenger')
module.exports = function (app) {

    app.post('/webhooks/messenger', (webhook_event, res) => {
        console.log('event_received');
        let body = webhook_event.body;
        if (body.object === 'page') {

            body.entry.forEach(entry => {
                messenger.hand_entry(entry);
            });
            res.status(200).send('EVENT_RECEIVED');
        } else {
            res.sendStatus(404);
        }
    })
    app.get('/webhooks/messenger', (req, res) => {
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];
        if (mode && token) {
            if (mode === 'subscribe' && token === 'truongduc.huy') {
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);

            } else {
                res.sendStatus(403);
            }
        }
    })
}