const ms = require('../modules/API/messenge');
const user_messenger = require('../models/user_messenger')
//ms.send(2623896034305678, {
//    text: "Thông tin đơn hàng"
//}, (err, docs) => {
//    console.log(docs);
//})
function hand_entry(entry) {
    entry.messaging.forEach(e => {
        user_messenger.find({
            PSID: e.sender.id,
        }, (err, docs) => {
            console.log(docs);
            if (docs.length) {
                if (e.message && e.message.text && e.message.text == 'shopwheydanang') {
                    user_messenger.update({
                        PSID: e.sender.id,
                        role: 'admin'
                    }, (err, docs) => {
                        ms.send(e.sender.id, {
                            text: "Bạn vừa đăng ký nhận thông tin đơn hàng"
                        }, (err, docs) => {
                        })
                    })
                }
            } else {
                user_messenger.insertMany({
                    PSID: e.sender.id,
                    role: 'user'
                }, (err, docs) => {
                    console.log('đã thêm user');
                })
            } 
        })

    })

}
module.exports.hand_entry = hand_entry;
