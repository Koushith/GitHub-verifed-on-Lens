-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'VERIFIED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "lensHandle" TEXT,
    "wallet" TEXT,
    "lensProfile" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Intrests" (
    "id" SERIAL NOT NULL,
    "intrest" TEXT,

    CONSTRAINT "Intrests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "postedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobDescription" TEXT NOT NULL,
    "salaryRange" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pgmigrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(225) NOT NULL,
    "run_on" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "pgmigrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GitLinks" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(30) NOT NULL,
    "repo" VARCHAR(50) NOT NULL,
    "isVerified" BOOLEAN NOT NULL,
    "callback_id" VARCHAR(1000) NOT NULL,
    "proofs" TEXT,
    "status" "Status" NOT NULL,
    "template_id" VARCHAR(200) NOT NULL,
    "template_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "requiredSkills" VARCHAR(1000),
    "lensProfile" VARCHAR(10),

    CONSTRAINT "GitLinks_pkey" PRIMARY KEY ("id")
);
