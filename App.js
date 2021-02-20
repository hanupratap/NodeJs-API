const express = require('express');
const app = express()
const port = process.env.PORT || 8000;

// Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use('/api/members', require('./routes/api/members'));

app.listen(port, ()=>{
    console.log(`App Listening on ${port}`);
});
