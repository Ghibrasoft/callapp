import { Express, Request, Response } from "express";
import shortid from 'shortid';
import cors from "cors";


const express = require("express");
const fs = require("fs");
const app: Express = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


interface Person {
  id: number;
  name: string;
  email: string;
  gender: string;
  address: {
    street: string;
    city: string;
  };
  phone: string;
}

// allow cross-origin requests from your frontend origin
app.use(cors({ origin: "http://localhost:3000" }));

// we can do it also with that
// const data: Person[] = require("./data.json");
// console.log(data);

// get persons
app.get("/persons", (req: Request, res: Response) => {
  fs.readFile(
    "data.json",
    (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) {
        console.log(err);
        return;
      }
      const jsonData = JSON.parse(data.toString());
      const sortedData = jsonData.sort((a: any, b: any) => {
        return a["id"] >= b["id"] ? 1 : -1;
      });
      res.send(sortedData);
    }
  );
});

// auto generate unique id
const id = parseInt(shortid.generate(), 36);
// add person
app.post("/persons", (req: Request, res: Response) => {
  fs.readFile(
    "data.json",
    (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to read data");
        return;
      }
      const jsonData = JSON.parse(data.toString());
      const newPerson: Person = req.body;
      console.log(newPerson)
      newPerson.id = id;
      jsonData.push(newPerson);
      fs.writeFile(
        "data.json",
        JSON.stringify(jsonData),
        (err: NodeJS.ErrnoException | null) => {
          if (err) {
            console.log(err);
            res.status(500).send("Failed to save data");
            return;
          }
          res.send(newPerson);
        }
      );
    }
  );
});

// delete person
app.delete("/persons/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  console.log(id)
  if (isNaN(id)) {
    res.status(400).send("Invalid person ID");
    return;
  }
  fs.readFile(
    "data.json",
    (err: NodeJS.ErrnoException | null, data: Buffer) => {
      if (err) {
        console.log(err);
        res.status(500).send("Failed to read data");
        return;
      }
      const jsonData = JSON.parse(data.toString());
      const index = jsonData.findIndex((p: Person) => p.id === id);
      if (index === -1) {
        res.status(404).send("Person not found");
        return;
      }
      jsonData.splice(index, 1);
      fs.writeFile(
        "data.json",
        JSON.stringify(jsonData),
        (err: NodeJS.ErrnoException | null) => {
          if (err) {
            console.log(err);
            res.status(500).send("Failed to save data");
            return;
          }
          res.send("Person deleted successfully");
        }
      );
    }
  );
});

app.listen(3001, () => {
  console.log("Running 3001");
});
