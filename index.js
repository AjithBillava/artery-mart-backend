require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser")
const cors = require("cors")

const {initializeDBConnection} = require("./db/db.connect")

const product = require("./routes/product.router")
const cart = require("./routes/cart.router")
const wishlist = require("./routes/wishlist.router")
const user = require("./routes/user.router");

initializeDBConnection()

app.get('/', (req, res) => {
  res.json("Welcome, to artery-mart-backend...")
})


app.use(bodyParser.json());
app.use(cors())

app.use("/v1/api/products",product)
app.use("/v1/api/user",user)
app.use("/v1/api/user",wishlist)
app.use("/v1/api/user",cart)


app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "An error occurred, see the errorMessage key for more details",
		errorMessage: err.message,
	});
});


app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)})