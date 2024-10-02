const Todo=require('../models/Todo.js');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });
        res.status(200).json(todos);
    }catch (err) {
        res.status(500).send('Server error');
    }
};

const createTodo= async (req,res)=>{
    try {
    
        const newTodo = new Todo({
          tittle: req.body.tittle,
      description: req.body.description,
      completed: req.body.completed,
      userId: req.userId
        });
        const todo = await newTodo.save();
        res.status(201).json(todo);
      } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
      }
    };


const updateTodo=async (req,res)=>{
    try {
        const todo = await Todo.findByIdAndUpdate(
          { _id: req.params.id, userId: req.userId },
           req.body, { new: true });
           if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
           }
        res.status(200).json(todo);
      } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
      }

}

const deleteTodo = async (req,res)=>{
    try {
        const deletedTodo = await Todo.findByIdAndDelete({ _id: req.params.id, userId: req.userId });
        if (!deletedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json({ message: 'Todo successfully deleted', deletedTodo });
      } catch (error) {
        res.status(500).json({ error: 'Server error', message: error.message });
      }
}


module.exports = {
 createTodo,
getTodos,
    updateTodo,
    deleteTodo,

};