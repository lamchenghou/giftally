import { PrismaClient } from "@prisma/client";
import { staffData } from "./seedData";

// Seeding as per Prisma documentation
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
const prisma = new PrismaClient();

async function main() {
  const teamSet = [...new Set(staffData.map((staff) => staff.teamName))];

  for (const teamName of teamSet) {
    await prisma.team.upsert({
      where: { teamName },
      update: {},
      create: {
        teamName,
      },
    });
  }

  for (const staff of staffData) {
    await prisma.staff.upsert({
      where: { staffPassId: staff.staffPassId },
      update: {},
      create: {
        staffPassId: staff.staffPassId,
        teamName: staff.teamName,
        createdAt: staff.createdAt,
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
