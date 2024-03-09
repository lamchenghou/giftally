-- CreateTable
CREATE TABLE "staff" (
    "staff_pass_id" VARCHAR(64) NOT NULL,
    "team_name" VARCHAR(64),

    CONSTRAINT "staff_pkey" PRIMARY KEY ("staff_pass_id")
);

-- CreateTable
CREATE TABLE "team" (
    "team_name" VARCHAR(64) NOT NULL,
    "has_redeemed" BOOLEAN DEFAULT false,
    "redeemed_at" VARCHAR(64),

    CONSTRAINT "team_pkey" PRIMARY KEY ("team_name")
);

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_team_name_fkey" FOREIGN KEY ("team_name") REFERENCES "team"("team_name") ON DELETE NO ACTION ON UPDATE NO ACTION;

