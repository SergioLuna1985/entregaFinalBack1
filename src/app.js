import express from 'express';
import routerApp from './routes/routes.js';
import handlebars from 'express-handlebars';

const app = express();
const port = 8080;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');  
app.set('view engine', 'handlebars');

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

app.use(routerApp);