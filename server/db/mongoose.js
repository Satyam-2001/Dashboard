const mongoose = require("mongoose")

const password = process.env.PASSWORD;
const databaseName = `employee`;
const url = `mongodb+srv://Satyam2001:${encodeURIComponent(password)}@cluster0.3bctm.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
mongoose.connect(url, {
useNewUrlParser: true,
})
