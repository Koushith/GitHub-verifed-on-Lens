/*
  Warnings:

  - You are about to drop the column `biotest` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'VERIFIED', 'FAILED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "biotest";

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

    CONSTRAINT "GitLinks_pkey" PRIMARY KEY ("id")
);
