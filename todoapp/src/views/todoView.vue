<template>
    <div id="app" class="container mt-5">
        <h1 class="text-center mb-4">My To-DO List</h1>
        <div class="row">
            <div class="col-md-8 mx auto">
                <form @submit.prevent = "addTodos" class="input-group mb-3">
                <input type="text" class="form-control" v-model="newTodoText" placeholder="새로운 todo 목록을 작성해주세요.">
                <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">입력</button>
                </div>
                </form>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr :key="todo.id" v-for="todo in todos">
                            <td>{{ todo.id }}</td>
                            <td>{{ todo.title }}</td>
                            <td>
                                <input type="checkbox" v-model="todo.done" @change="statusTodos(todo)">
                            </td>
                            <td>
                                <button @click="deleteTodo(todo.id)" class="btn btn-danger btn-sm">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    components: {},
    data() {
        return {
            newTodoText: '',
            todos : []
        }
    },
    created() {
        this.getTodos();
    },
    mounted() {},
    unmounted() {},
    methods: {
        async getTodos() {
            const response = await axios.get('http://localhost:3000/todos');
            this.todos = response.data;
        },
        async addTodos() {
            const response = await axios.post('http://localhost:3000/todos', { title : this.newTodoText });
            this.todos.push(response.data);
        },
        async statusTodos(todo) {
            await axios.put(`http://localhost:3000/todos/${todo.id}`, { done : todo.done });
        },
        async deleteTodo(id) {
            await axios.delete(`http://localhost:3000/todos/${id}`);
            this.todos = this.todos.filter(todo => todo.id !== id)
        }
    }
};
</script>