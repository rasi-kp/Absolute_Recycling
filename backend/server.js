const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
require("./config/postgreesql")
var logger = require('morgan');
const userRouter = require("./routes/user")
const adminRouter = require("./routes/admin")
const app = express()

const cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', userRouter);
app.use('/admin', adminRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});