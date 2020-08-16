const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const path = require('path')
const app = express();
const http = require('http').createServer(app);
import todoRoutes from './routes/todosRoutes';
import userRoutes from './routes/usersRoutes';

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cookieParser())

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
  };
  app.use(cors(corsOptions));
}

app.use('/api/todos', todoRoutes)
app.use('/api/users', userRoutes)

const port = process.env.PORT || 3030;
http.listen(port, () => {
  console.log('apps listen at port', port);
});
