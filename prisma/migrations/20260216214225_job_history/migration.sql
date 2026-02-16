-- CreateEnum
CREATE TYPE "JobHistoryEventType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'TITLE_CHANGED', 'DESCRIPTION_CHANGED', 'STATUS_CHANGED', 'PRIORITY_CHANGED', 'START_DATE_CHANGED', 'DUE_DATE_CHANGED', 'FINISH_DATE_CHANGED', 'PROJECT_CHANGED');

-- CreateEnum
CREATE TYPE "JobField" AS ENUM ('title', 'description', 'status', 'priority', 'startDate', 'dueDate', 'finishDate', 'project');

-- CreateTable
CREATE TABLE "JobHistory" (
    "id" SERIAL NOT NULL,
    "jobId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "eventType" "JobHistoryEventType" NOT NULL,
    "field" "JobField",
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobHistory" ADD CONSTRAINT "JobHistory_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobHistory" ADD CONSTRAINT "JobHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
