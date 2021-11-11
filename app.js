// Modules
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const port = 8080;
const appName = "Task Manager";

// Middleware
app.use(express.static("./front-end"));
app.use(express.json());

// Data model (schema)
const Task = require("./models/Task");

// Routes
// app.get("/tm/v1/tasks")        - get all the tasks
// app.get("/tm/v1/tasks/:id")    - get a task
// app.post("/tm/v1/tasks")       - add a new task
// app.patch("/tm/v1/tasks/:id")  - update a task
// app.delete("/tm/v1/tasks")     - delete a task

// get all the tasks
app.get("/tm/v1/tasks", async (req,res)=>{
  try {
    const tasks = await Task.find({});
    res.status(200).json({tasks});
  } catch {
    res.status(500).json({msg: error});
  };
});

// get one task
// use mongoose findOne() function for this
app.get('/tm/va/tasks/:guid', async (req, res) => {
  try {
    const { guid } = req.params;
    const task = await Task.findOne({id: guid});
    res.status(200).json({task});
  } catch {
    res.status(500).json({msg: error});
  }
});


// add a task
app.post("/tm/v1/tasks", async (req,res)=>{
  try {
    const task = await Task.create(req.body);
    res.status(200).json({task});
  } catch {
    res.status(500).json({msg: error});
  };
});

// update a task
// use mongoose fineOneAndUpdate function for this
app.put('/tm/v1/tasks/:guid', async (req, res) => {
  try {
    const { guid } = req.params;
    const { name } = req.body;
    if (name == undefined) {
      return res.status(400).json({
        msg: "Name value required"
      });
    }
    const task = await Task.findOneAndUpdate({id: guid}, {name: name});
    res.status(200).json({task});
  } catch {
    res.status(500).json({msg: error});
  }
});

// delete a task
// use mongoose findOneAndDelete function for this
app.delete('/tm/v1/tasks/:guid')


// Connect to the database and start the appl server
const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {console.log(`An Application Server is listening on port ${port}.`)});
  } catch (error) {
    console.log(error);
  };
}

start();
