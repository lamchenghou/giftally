import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// CORS Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/teams", async (req, res) => {
  const teams = await prisma.team.findMany();
  res.json(teams);
});

const server = app.listen(3000, () =>
  console.log("Server listening at port 3000")
);
// async function main() {
//   // ... you will write your Prisma Client queries here
//   const allTeams = await prisma.team.findMany();
//   console.log(allTeams);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
