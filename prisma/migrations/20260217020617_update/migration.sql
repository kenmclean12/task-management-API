/*
  Warnings:

  - The values [CLIENT_CHANGED] on the enum `ProjectHistoryEventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProjectHistoryEventType_new" AS ENUM ('CREATED', 'DELETED', 'ASSIGNED_USERS_CHANGED', 'NAME_CHANGED', 'DESCRIPTION_CHANGED', 'STATUS_CHANGED', 'PRIORITY_CHANGED', 'START_DATE_CHANGED', 'DUE_DATE_CHANGED', 'FINISH_DATE_CHANGED');
ALTER TABLE "ProjectHistory" ALTER COLUMN "eventType" TYPE "ProjectHistoryEventType_new" USING ("eventType"::text::"ProjectHistoryEventType_new");
ALTER TYPE "ProjectHistoryEventType" RENAME TO "ProjectHistoryEventType_old";
ALTER TYPE "ProjectHistoryEventType_new" RENAME TO "ProjectHistoryEventType";
DROP TYPE "ProjectHistoryEventType_old";
COMMIT;
