import { Server } from "socket.io"

let io
let users = {}

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  })

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id)

    socket.on("register", (userId) => {
      users[userId] = socket.id
    })

    socket.on("disconnect", () => {
      for (let key in users) {
        if (users[key] === socket.id) {
          delete users[key]
        }
      }
    })
  })
}

// ✅ THESE TWO MUST EXIST
export const getIO = () => io
export const getUsers = () => users