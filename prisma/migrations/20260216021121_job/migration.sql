/*
  Warnings:

  - The `status` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('1', '2', '3', '4', '5');

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT '1';

-- DropEnum
DROP TYPE "ProjectStatus";

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "finishDate" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT '1',
    "priority" "Priority" NOT NULL DEFAULT '1',
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobAssignments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobAssignments_AB_unique" ON "_JobAssignments"("A", "B");

-- CreateIndex
CREATE INDEX "_JobAssignments_B_index" ON "_JobAssignments"("B");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobAssignments" ADD CONSTRAINT "_JobAssignments_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobAssignments" ADD CONSTRAINT "_JobAssignments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
