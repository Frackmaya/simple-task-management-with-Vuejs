<template>
  <div class="page">
    <h2>Todo List</h2>
    <form @submit.prevent="addTodo">
      <label for="tittle">Title:</label>
      <input type="text" id="tittle" v-model="newTodo.tittle" required>
      <label for="description">Description:</label>
      <textarea id="description" v-model="newTodo.description"></textarea>
      <label for="completed">Completed:</label>
      <input type="checkbox" id="completed" v-model="newTodo.completed">
      <button type="submit">Add Todo</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo._id" :class="{'odd-row': index % 2 === 0, 'even-row': index % 2 !== 0}">
        <div v-if="editingTodo && editingTodo._id === todo._id" class="edit-container">
          <input type="text" v-model="editingTodo.tittle" required>
          <textarea v-model="editingTodo.description"></textarea>
          <label for="completed">Completed:</label>
          <input type="checkbox" v-model="editingTodo.completed">
          <button @click="updateTodo">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
        <div v-else class="todo-container">
          <span>{{ todo.tittle }}</span> : <span>{{ todo.description }}</span>
          <div class="button-group">
            <button @click="editTodo(todo)">Edit</button>
            <button @click="deleteTodo(todo._id)">Delete</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      todos: [],
      newTodo: {
        tittle: '',
        description: '',
        completed: false
      },
      editingTodo: null,
      error: ''
    };
  },
  mounted() {
    this.fetchTodos();
  },
  methods: {
    async fetchTodos() {
      try {
        const response = await axios.get('http://localhost:4444/api/todos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo() {
      try {
        const response = await axios.post('http://localhost:4444/api/todos', this.newTodo, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        this.todos.push(response.data);
        this.newTodo = { tittle: '', description: '', completed: false };
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`http://localhost:4444/api/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        this.todos = this.todos.filter(todo => todo._id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    async updateTodo() {
      try {
        const response = await axios.put(`http://localhost:4444/api/todos/${this.editingTodo._id}`, this.editingTodo, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
          }
        });
        const index = this.todos.findIndex(todo => todo._id === this.editingTodo._id);
        this.todos.splice(index, 1, response.data);
        this.editingTodo = null;
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
    editTodo(todo) {
      this.editingTodo = { ...todo };
    },
    cancelEdit() {
      this.editingTodo = null;
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
  min-height: 100vh;
}

form {
  max-width: 400px;
  width: 100%;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, textarea {
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: none;
  height: 80px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 5px;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

li {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.odd-row {
  background: rgba(113, 200, 255, 0.1);
}

.even-row {
  background: rgba(113, 200, 255, 0.2);
}

.todo-container, .edit-container {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding:4px;
  background-color:#ccc;


}

.todo-container span {
  font-size: 20px;
  margin: 5px;
  
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  gap:10px;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
