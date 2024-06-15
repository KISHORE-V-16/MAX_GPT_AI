const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose
        .connect(
           process.env.MONGODB_CONNECT
        )
        .then(() => {
            console.log("DB Connected");
        });
};

module.exports = {connectDB};