const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


let todos = [
    {id: 1, title: '떡국 먹기', done: false},
    {id: 2, title: '세뱃돈 받기', done: false}
];

app.use(cors());
app.use(express.json()); //body파싱 사용할떄는 req.body로 사용 가능

// To-Do 목록 조회
app.get('/todos', (req, res) =>{
    res.json(todos);
})

// To-Do 생성
app.post('/todos', (req, res) => {
    const newId = todos[todos.length -1].id +1
    const todo = {id : newId, ...req.body, done: false};
    todos.push(todo);
    res.json(todo);
    console.log(`${todo.id}가 생성되었습니다.`)
});

// To-DO 상태
app.put('/todos/:id', (req, res) => {
    const {id} = req.params
    todos = todos.map(todo => todo.id == id ? { ...todo, ...req.body} : todo);
    res.json({message: 'Todo가 업데이트 되었습니다.'})
});

app.delete('/todos/:id', (req, res) => {
    const {id} = req.params;
    todos = todos.filter(todo => todo.id != id );
    res.json({message: 'Todo가 삭제 되었습니다.'})
});

app.listen(port, () => {
    console.log(`${port} 포트에서 서버 가동중`)
});