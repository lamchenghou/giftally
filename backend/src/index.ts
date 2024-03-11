import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// CORS Middleware
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// ========== Staff API ==========
app.get("/staff", async (req, res) => {
  const searchQueryParam = req.query.search as string;
  if (searchQueryParam) {
    const narrowedStaff = await prisma.staff.findMany({
      where: {
        staffPassId: {
          contains: searchQueryParam,
          mode: "insensitive",
        },
      },
    });
    res.json(narrowedStaff);
  } else {
    const staff = await prisma.staff.findMany();
    res.json(staff);
  }
});

app.get("/staff/count", async (req, res) => {
  const searchQueryParam = req.query.team as string;
  if (searchQueryParam) {
    const count = await prisma.staff.count({
      where: {
        teamName: searchQueryParam,
      },
    });
    res.json({ count });
  } else {
    res.json({ count: 0 });
  }
});

// ========== Teams API ==========
app.get("/teams", async (req, res) => {
  const count = Number(req.query.count);
  const offset = Number(req.query.offset);

  const teams = await prisma.team.findMany({
    orderBy: [
      {
        hasRedeemed: "desc",
      },
      {
        redeemedAt: "desc",
      },
    ],
    skip: offset,
    take: count,
  });
  res.json(teams);
});

app.get("/teams/count", async (_req, res) => {
  const count = await prisma.team.count();

  res.json({ count });
});

// Query redemption history
app.get("/teams/redemption-hist", async (req, res) => {
  const count = Number(req.query.count);
  const offset = Number(req.query.offset);

  const teams = await prisma.team.findMany({
    where: {
      hasRedeemed: true,
    },
    orderBy: {
      redeemedAt: "desc",
    },
    skip: offset,
    take: count,
  });

  res.json(teams);
});

// Query redemption history count
app.get("/teams/redemption-hist/count", async (_req, res) => {
  const count = await prisma.team.count({
    where: {
      hasRedeemed: true,
    },
  });

  res.json({ count });
});

app.get("/teams/:teamname", async (req, res) => {
  const { teamname } = req.params;

  const team = await prisma.team.findFirst({
    where: {
      teamName: teamname,
    },
  });

  if (team === null) {
    res.status(404).send("Team not found.");
  }

  res.json(team);
});

// ========== Teams API - Redemption ==========
app.put("/teams/:teamname/redeem", async (req, res) => {
  // Request body
  const body = req.body;
  // URL params
  const { teamname } = req.params;
  // Get the team to do perform a check on whether they can redeem
  const initialTeamData = await prisma.team.findFirst({
    where: { teamName: teamname },
    select: { hasRedeemed: true },
  });

  if (initialTeamData === null) {
    res.status(404).send("Team not found.");
  }

  if (initialTeamData?.hasRedeemed !== false) {
    res
      .status(400)
      .send(
        `Team has already redeemed. hasRedeemed: ${JSON.stringify(
          initialTeamData
        )}`
      );
  } else {
    const updatedTeamData = await prisma.team.update({
      where: {
        teamName: teamname,
      },
      data: {
        hasRedeemed: true,
        redeemedAt: String(Date.now()),
        collectorId: body.collectorId,
      },
    });

    res.json(updatedTeamData);
  }
});

app.put("/teams/:teamname/unredeem", async (req, res) => {
  // URL params
  const { teamname } = req.params;
  // Get the team to do perform a check on whether they can redeem
  const initialTeamData = await prisma.team.findFirst({
    where: { teamName: teamname },
    select: { hasRedeemed: true },
  });

  if (initialTeamData === null) {
    res.status(404).send("Team not found.");
  }

  if (initialTeamData?.hasRedeemed === false) {
    res
      .status(400)
      .send(
        `Team has not redeemed. hasRedeemed: ${JSON.stringify(initialTeamData)}`
      );
  } else {
    const updatedTeamData = await prisma.team.update({
      where: {
        teamName: teamname,
      },
      data: {
        hasRedeemed: false,
        redeemedAt: null,
        collectorId: null,
      },
    });

    res.json(updatedTeamData);
  }
});

const server = app.listen(3000, () =>
  console.log("Server listening at port 3000")
);
