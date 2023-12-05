const express = require("express");
const applyMiddleWare = require("./middleware/applyMiddleware");
const connectDB = require("./db/connectDB");
const app = express();
require("dotenv").config();
// const port = process.env.PORT || 5000;



const authenticationRoutes = require ("./routes/authentication/index")
const adminRoutes = require('./routes/checkAdmin')
const createAdmin = require('./routes/users/createAdmin')
const removeAdmin = require('./routes/users/removeAdmin')
const addUser = require('./routes/users/createUser')
const getUsers = require('./routes/users/getUsers')
const deleteUser = require('./routes/users/deleteUser')
const updateUser = require('./routes/users/updateUser/Index')
const createRequest = require('./routes/bloodRequest/createRequest')
const getRequestByAdmin = require('./routes/admin/getrequests')
const getRequestCount = require('./routes/bloodRequest/requestCount')
const getUserCount = require('./routes/bloodRequest/UserCount')
const getAllUsers = require('./routes/admin/getUser')
const upadeuserStatus = require('./routes/admin/updteUserStatus')
const updateRequest = require('./routes/bloodRequest/updateRequest')
const deleteRequest = require('./routes/bloodRequest/deleteRequest')
const getSingleRequest = require('./routes/bloodRequest/getSingelRequest')
const createBlog = require('./routes/blog/createBlog')
const updateBlog = require('./routes/blog/updateBlog')
const deleteBlog = require('./routes/blog/deleteBlog')
const getBlog = require('./routes/blog/getBlog');
const createPayment = require('./routes/createPayment');
const getPayment = require('./routes/getPayments');
const intent = require('./routes/intentRoute');

applyMiddleWare(app)


app.use(authenticationRoutes);
app.use(adminRoutes);
app.use(createAdmin);
app.use(removeAdmin);
app.use(addUser);
app.use(getUsers);
app.use(deleteUser);
app.use(updateUser);
app.use(createRequest);
// app.use(getRequest);
app.use(getRequestByAdmin);
app.use(getRequestCount);
app.use(getUserCount);
app.use(getAllUsers);
app.use(upadeuserStatus);
app.use(updateRequest);
app.use(deleteRequest);
app.use(getSingleRequest);
app.use(createBlog);
app.use(updateBlog);
app.use(deleteBlog);
app.use(getBlog);
app.use(createPayment);
app.use(getPayment);
app.use(intent);

// const client = new MongoClient('mongodb+srv://intimiti18:nXyA2bbwuoIPf1NE@cluster0.7k1zdza.mongodb.net/?retryWrites=true&w=majority')
// const request = client.db('blood-donation').collection('requests')

app.get("/health",async (req, res) => {
  // const data = await request.find({}).toArray();
    res.send("Server is runig well");
  });

app.all('*', (req,res,next) => { 
    const error = new Error(`The requested url is invalid: [${req.url}]`)
    error.status = 404
    next(error)
 })

app.use((err,req,res,next) => {
    res.status(err.status || 500 ).json({
        message: err.message
    })
})
  
// const main =async () => { 
//     await connectDB();
//     app.listen(port, () => {
//       console.log(`Server is runnig on port ${port}`);
//     });
//  }
  
// main()

module.exports = app;