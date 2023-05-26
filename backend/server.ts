import { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Chance from "chance";
import { DataTypes, Sequelize } from "sequelize";
import express from "express";

dotenv.config();
const chance = new Chance();
const app: Express = express();
app.use(cors({ origin: "http://localhost:3000" }));

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.host,
  port: Number(process.env.port),
  username: process.env.user,
  password: process.env.password,
  database: process.env.dbname,
});

const Persons = sequelize.define("Persons", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.JSONB,
  },
  phone: {
    type: DataTypes.STRING,
  },
});

async function addModel() {
  await Persons.sync();
  console.log("Database sync success!");
}
addModel();

// create random persons
function addPersons() {
  for (let i = 1; i <= 20; i++) {
    const newPerson = Persons.build({
      name: chance.name(),
      email: chance.email(),
      gender: chance.gender(),
      address: {
        street: chance.street(),
        city: chance.city(),
      },
      phone: chance.phone(),
    });
    newPerson.save();
  }
}
// addPersons();

// GET
app.get("/Persons", async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const { count, rows } = await Persons.findAndCountAll({
    limit,
    offset,
    order: [["name", "ASC"]],
  });

  const allPersonsLength = await Persons.count();
  const data = {
    rows,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    allPersonsLength,
  };
  res.json(data);
});

// POST
app.post("/Persons", async (req: Request, res: Response) => {
  const { name, email, gender, address, phone } = req.body;
  const newPerson = await Persons.create({
    name,
    email,
    gender,
    address,
    phone,
  });
  res.json(newPerson);
  console.log("Person added successfully");
});

// UPDATE
app.put("/Persons/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, gender, address, phone } = req.body;

  try {
    const updatedPerson = {
      ...(name && { name }),
      ...(email && { email }),
      ...(gender && { gender }),
      ...(address && { address }),
      ...(phone && { phone }),
    };

    const [numUpdatedRows] = await Persons.update(updatedPerson, {
      where: { id },
    });

    if (numUpdatedRows === 0) {
      return res.status(404).json({ message: `Row with ID ${id} not found` });
    }

    res.json({ message: `Person with ID ${id} updated successfully` });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Internal server error" });
  }
});

// DELETE
app.delete("/Persons/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const delPerson = await Persons.destroy({ where: { id } });

  if (delPerson > 0) {
    res.json({ message: "Person deleted successfully" });
  } else {
    res.status(404).json("Person not found");
  }
});

app.listen(3001, () => {
  console.log("Server running on port: 3001");
});
