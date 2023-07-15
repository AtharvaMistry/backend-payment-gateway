const Razorpay = require('razorpay');

// creating an instance(store)
const razorpay = new Razorpay({
    key_id:"5vFTzUeumWi4l3",
    key_secret: "jpCTUvNWRPKCGUKjen6QYnWB",
});

// function to create an order on the server(order book)
exports.createOrder = async ( amount, currency, notes) =>{
    try{
        const options = {
            amount : amount,
            current: currency,
            notes: notes,
        }

        const order = await razorpay.orders.create(options);
        return order;
    }catch(error){
        console.error("error creating order::::", error);
        throw new Error("unable to create order");
    }
};

let createOrder1 = mongoose.model('payment', createOrder);

module.exports = { createOrder1 }

