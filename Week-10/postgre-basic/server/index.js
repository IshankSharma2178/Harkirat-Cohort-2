const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

app.use(cors())
app.use(express.json());

//create Todo 
app.post("/createtodo",async(req,res)=>{
    try{    
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *" , [description] )
        res.json(newTodo.rows);

    }catch(e){
        console.log(e.message);
    }
})

// Show all todos
app.get("/todo",async(req,res)=>{
    try{
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    }catch(err){
        console.log(err.message)
    }
})

// show only specified todo
app.get("/todo/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        res.json(todo.rows[0]);
    }catch(error){
        console.log(error.message)
    }
})

// update a particular todo
app.put("/updatetodo/:id",async(req,res)=>{
    try{
        const {description} = req.body;
        const {id} = req.params;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description,id])

        res.json("todo updated ")

    }catch(error){
        console.log(error.message)
    }
})

// delete a specific todo
app.delete("/deletetodo/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);

        res.json("Todo deleted successfully")

    }catch(error){
        console.log(error.message)
    }
})

app.listen(5000,()=>{
    console.log("Server started on port 5000")
})