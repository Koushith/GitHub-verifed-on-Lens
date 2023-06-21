/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `intrests` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "GitLinks" ADD COLUMN     "lensHandle" VARCHAR(10),
ADD COLUMN     "requiredSkills" VARCHAR(1000);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bio",
DROP COLUMN "email",
DROP COLUMN "intrests",
ADD COLUMN     "lensHandle" TEXT,
ADD COLUMN     "lensProfile" TEXT,
ADD COLUMN     "wallet" TEXT;
