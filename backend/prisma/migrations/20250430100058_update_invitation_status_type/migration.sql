/*
  Warnings:

  - The `status` column on the `invitations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'USED', 'EXPIRED');

-- AlterTable
ALTER TABLE "invitations" DROP COLUMN "status",
ADD COLUMN     "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING';

-- CreateIndex
CREATE INDEX "invitations_status_expires_at_idx" ON "invitations"("status", "expires_at");
