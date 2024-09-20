import express from 'express';

// creating and instance from express server
const app = express();
// checking the server configuration
app.listen(3000 , ()=>{
    console.log('server is running')
})