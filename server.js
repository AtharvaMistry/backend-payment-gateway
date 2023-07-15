const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpayInstance = new Razorpay({
    key_id: "rzp_test_zzQAKJeQte4phG",
    key_secret: "N6MwCmAw250CI0xAC9tHsvFB",
});

const app = express();
app.use(express.json());

app.post('/createOrder', (req, res) => {
    const { amount, currency, notes } = req.body;
    razorpayInstance.orders.create({ amount, currency, notes }, (err, order) => {
        if (!err)
            res.json(order);
        else
            res.send(err);
    });
});

app.post('/verifyOrder', (req, res) => {
    const { order_id, payment_id } = req.body;
    const razorpay_signature = req.headers['x-razorpay-signature'];
    const key_secret = "N6MwCmAw250CI0xAC9tHsvFB";
    let hmac = crypto.createHmac('sha256', key_secret);
    hmac.update(order_id + "|" + payment_id);
    const generated_signature = hmac.digest('hex');
    if (razorpay_signature === generated_signature) {
        res.json({ success: true, message: "Payment has been verified" });
    } else {
        res.json({ success: false, message: "Payment verification failed" });
    }
});

app.listen(3000, () => {
    console.log("Server is Listening on 3000");
});
