//@ts-ignore
import { Server, Socket } from "socket.io";
export default (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:9000",
    },
  });

  io.on("connection", (socket) => {
    console.log("Oh baby a triple!");

    function getSocketGameRoom(socket: Socket): any {
      const socketRooms = Array.from(socket.rooms.values()).filter(
        (r) => r !== socket.id
      );
      const gameRoom = socketRooms && socketRooms[0];

      return gameRoom;
    }

    // Room logic
    socket.on("join_game", async (message) => {
      console.log("New user joining room: ", message);
      const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
      console.log("Connected sockets: ", connectedSockets);
      if (!connectedSockets && !message.isHost) {
        console.log("Room doesnt exist");
        socket.emit("room_doesnt_exist", {
          error: "Room does not exist, please create one or enter a valid code",
        });
      } else if (
        !message.isHost &&
        connectedSockets &&
        connectedSockets.size === 3
      ) {
        console.log("room_join_error");
        socket.emit("room_join_error", {
          error: "Room is full",
        });
      } else {
        console.log("room_joined");
        await socket.join(message.roomId);
        socket.emit("room_joined");
        const gameRoom = getSocketGameRoom(socket);
        socket.to(gameRoom).emit("on_user_joined", message);
      }
    });

    socket.on("update_opponent", (message) => {
      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("on_updated_opponent", message);
    });

    // Game logic

    socket.on("play_turn", (message) => {
      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("on_turn_played", message);
    });

    socket.on("start_game", (message) => {
      const gameRoom = getSocketGameRoom(socket);
      console.log(gameRoom);
      console.log(message);
      socket.to(gameRoom).emit("game_started", message);
    });

    socket.on("end_round", (message) => {
      const gameRoom = getSocketGameRoom(socket);
      if (message.winner !== null) {
        message.winner = !message.winner;
      }
      socket.to(gameRoom).emit("round_ended", message);
    });

    socket.on("new_round", (message) => {
      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("new_round_started", message);
    });

    socket.on("end_session", (message) => {
      const gameRoom = getSocketGameRoom(socket);
      socket.to(gameRoom).emit("session_ended", message);
    });
  });
  return io;
};
