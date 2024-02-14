import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
//import { fileURLToPath } from 'url';
//import path, { dirname } from 'path';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Middleware

app.use(express.static('./'));
//app.use(cors());
// Or, for a more specific configuration:
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || /https:\/\/.*\.gitpod\.io/.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json()); // for parsing application/json

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todolist') //change from "localhost" to e.g. mymongo if serve.js is containerized and vice versa
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Define a schema
const TodoSchema = new mongoose.Schema({
  task: String
});
const Todo = mongoose.model('Todo', TodoSchema);

// Routes
app.get('/todolist', async (req, res) => {
  const todos = await Todo.find();
  console.log(todos)
  res.json(todos);
});

// Optionally, explicitly handle the root route
//app.get('/', (req, res) => {
//  res.sendFile(__dirname + '/index.html');
//});

app.post('/todolist', async (req, res) => {
  console.log('Received request:', req.body);
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding todo" });
  }
});

app.delete('/todolist/:todoId', async (req, res) => {
  const { todoId } = req.params;
  console.log(todoId)
  try {
    // Assuming Todo is your Mongoose model
    await Todo.findByIdAndDelete({ _id: todoId });
    res.status(200).send('Todo deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting todo');
  }
});


app.listen(port, () => {
  console.log(`Todo app backend listening at http://localhost:${port}`);
});


/* Test API with cURL: 
curl -X POST http://localhost:3000/todolist \
  -H "Content-Type: application/json" \
  -d '{"task": "Test Todo"}'

curl -H "Accept: application/json" http://localhost:3000/todolist

*/
