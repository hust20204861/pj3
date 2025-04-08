const http = require('http');
const socketIo = require('socket.io');
const app = require('./app/app');
require('dotenv').config();
require('./config/dbConnect')

const port = process.env.PORT || 2024;

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
      origin: "*",
    },
  });
  
  // Cấu hình socket.io
  io.on("connection", (socket) => {
    console.log("New client connected");
  
    // Tham gia phòng dựa trên taskId
    socket.on("join-task", (taskId) => {
      socket.join(taskId);
      console.log(`Client joined task: ${taskId}`);
    });
  
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
  
  // Thêm `io` vào `req` để các router có thể sử dụng
  app.use((req, res, next) => {
    req.io = io;
    next();
  });

const userRouter = require('./routers/userRouter');
const projectRouter = require('./routers/projectRouter');
const taskRouter = require('./routers/taskRouter')

app.use('/api/v1/user', userRouter);
app.use('/api/v1/project', projectRouter);
app.use('/api/v1/task', taskRouter)
  
server.listen(port, console.log(`Server is running on ${port}`))
