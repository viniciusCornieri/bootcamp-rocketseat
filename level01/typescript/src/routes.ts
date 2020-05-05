import { Request, Response } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
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
