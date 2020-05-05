"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var CreateUser_1 = __importDefault(require("./services/CreateUser"));
function helloWorld(request, response) {
    var user = CreateUser_1.default({
        email: "vmc@mail.com",
        password: "123456",
        techs: [
            'NodeJS',
            'React',
            'ReactNative',
            { title: 'JS', experience: 20 },
        ]
    });
    return response.json({ message: "Hello World" });
}
exports.helloWorld = helloWorld;
