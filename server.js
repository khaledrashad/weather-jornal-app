const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

const cors = require('cors');
app.use(cors());

const port = 3000;
app.listen(port, listening);
function listening(){
    console.log(`running on localhost: ${port}`);
};
let projectData = {}
app.get('/project', (req, res)=>{
    res.send(projectData)
})

app.post('/projects', (req, res)=>{
    projectData.temp = req.body.temp
    projectData.date = req.body.date
    projectData.userResponse = req.body.userResponse
    res.send("project created!")
})


