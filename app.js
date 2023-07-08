const Express = require("express");

const todoList = require('./utils/database');

const lista = require("./models/todos.model");
const  cors = require('cors');

const app = Express();
require('dotenv').config();

const PORT = process.env.PORT ?? 8000

lista;

todoList.authenticate()
.then( () => {
    console.log("Se conecto a la base de datos.");
})
.catch( (error) => console.log(error));

todoList.sync()
.then( () => console.log("Se sincronizo la base de datos"))

app.use(Express.json());
app.use(cors());

app.post('/todos',async (req,res) => {
    try {
        const newTodo = req.body;
        const xd = await lista.create(newTodo);
        res.status(201).json(xd);
    } catch (error) {
        res.status(400).json(error);
    }
})

app.get('/todos', async (req ,res) => {
    try {
        const listas = await lista.findAll({
            attributes : {
                exclude: ['createdAt','updatedAt']
            }
        });
        res.json(listas)
    } catch (error) {
        res.status(400).json(error);
    }
})


app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const listitas = await lista.findByPk(id)
        res.json(listitas)
    } catch (error) {
        res.status(400).json(error);
    }
})


app.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title , description , completed} = req.body;
        await lista.update({title, description ,completed },{
            where : { id }
        });
        res.status(201).send();
    } catch (error) {
        res.status(201).send();
    }
});

app.delete('/todos/:id',  async (req, res) => {
    try {
        const { id } = req.params;
        await lista.destroy({
            where : { id }
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json(error)
    }
})

app.get('/', (req, res) => {
    res.send("TodoLits Activo");
});

app.listen(PORT, () => {
    console.log(`Servidor activo por el puerto  ${PORT}`);
});