/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `biotest` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isVerified` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "biotest" TEXT NOT NULL,
ADD COLUMN     "intrests" JSONB,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Intrests" (
    "id" SERIAL NOT NULL,
    "intrest" TEXT,

    CONSTRAINT "Intrests_pkey" PRIMARY KEY ("id")
);
