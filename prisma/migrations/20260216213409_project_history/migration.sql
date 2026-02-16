-- CreateEnum
CREATE TYPE "ProjectHistoryEventType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'NAME_CHANGED', 'DESCRIPTION_CHANGED', 'STATUS_CHANGED', 'PRIORITY_CHANGED', 'START_DATE_CHANGED', 'DUE_DATE_CHANGED', 'FINISH_DATE_CHANGED', 'CLIENT_CHANGED');

-- CreateEnum
CREATE TYPE "ProjectField" AS ENUM ('name', 'description', 'status', 'priority', 'startDate', 'dueDate', 'finishDate', 'client');

-- CreateTable
CREATE TABLE "ProjectHistory" (
    "id" SERIAL NOT NULL,
    "projectId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "eventType" "ProjectHistoryEventType" NOT NULL,
    "field" "ProjectField",
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectHistory" ADD CONSTRAINT "ProjectHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
