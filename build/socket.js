"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
const socket_io_1 = require("socket.io");
exports.default = (httpServer) => {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "https://games.tatewalker.com",
        },
    });
    io.on("connection", (socket) => {
        console.log("Oh baby a triple!");
        function getSocketGameRoom(socket) {
            const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);
            const gameRoom = socketRooms && socketRooms[0];
            return gameRoom;
        }
        // Room logic
        socket.on("join_game", (message) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("New user joining room: ", message);
            const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
            console.log("Connected sockets: ", connectedSockets);
            if (!connectedSockets && !message.isHost) {
                console.log("Room doesnt exist");
                socket.emit("room_doesnt_exist", {
                    error: "Room does not exist, please create one or enter a valid code",
                });
            }
            else if (!message.isHost &&
                connectedSockets &&
                connectedSockets.size === 3) {
                console.log("room_join_error");
                socket.emit("room_join_error", {
                    error: "Room is full",
                });
            }
            else {
                console.log("room_joined");
                yield socket.join(message.roomId);
                socket.emit("room_joined");
                const gameRoom = getSocketGameRoom(socket);
                socket.to(gameRoom).emit("on_user_joined", message);
            }
        }));
        socket.on("update_users", (message) => {
            console.log("Updating user list");
            const gameRoom = getSocketGameRoom(socket);
            socket.to(gameRoom).emit("on_updated_users", message);
        });
        // Game logic
        socket.on("update_game", (message) => {
            const gameRoom = getSocketGameRoom(message);
            socket.to(gameRoom).emit("on_game_update", message);
        });
        socket.on("start_game", (message) => {
            const gameRoom = getSocketGameRoom(socket);
            socket.to(gameRoom).emit("game_started", message);
        });
        socket.on("change_category", (message) => {
            const gameRoom = getSocketGameRoom(socket);
            socket.to(gameRoom).emit("category_changed", message);
        });
        socket.on("submit_answer", (message) => {
            const gameRoom = getSocketGameRoom(socket);
            socket.to(gameRoom).emit("on_answer_submitted", message);
        });
        socket.on("end_round", (message) => {
            const gameRoom = getSocketGameRoom(socket);
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
