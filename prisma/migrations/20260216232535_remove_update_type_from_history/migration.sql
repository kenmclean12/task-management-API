/*
  Warnings:

  - The values [UPDATED] on the enum `AddressHistoryEventType` will be removed. If these variants are still used in the database, this will fail.
  - The values [UPDATED] on the enum `ClientHistoryEventType` will be removed. If these variants are still used in the database, this will fail.
  - The values [UPDATED] on the enum `JobHistoryEventType` will be removed. If these variants are still used in the database, this will fail.
  - The values [UPDATED] on the enum `ProjectHistoryEventType` will be removed. If these variants are still used in the database, this will fail.
  - The values [UPDATED] on the enum `UserHistoryEventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AddressHistoryEventType_new" AS ENUM ('CREATED', 'DELETED', 'STREET_CHANGED', 'CITY_CHANGED', 'STATE_CHANGED', 'COUNTRY_CHANGED', 'POSTALCODE_CHANGED', 'CLIENT_CHANGED');
ALTER TABLE "AddressHistory" ALTER COLUMN "eventType" TYPE "AddressHistoryEventType_new" USING ("eventType"::text::"AddressHistoryEventType_new");
ALTER TYPE "AddressHistoryEventType" RENAME TO "AddressHistoryEventType_old";
ALTER TYPE "AddressHistoryEventType_new" RENAME TO "AddressHistoryEventType";
DROP TYPE "AddressHistoryEventType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ClientHistoryEventType_new" AS ENUM ('CREATED', 'DELETED', 'EMAIL_CHANGED', 'PHONE_CHANGED', 'WEBSITE_CHANGED', 'DESCRIPTION_CHANGED', 'NAME_CHANGED', 'ADDRESS_CHANGED');
ALTER TABLE "ClientHistory" ALTER COLUMN "eventType" TYPE "ClientHistoryEventType_new" USING ("eventType"::text::"ClientHistoryEventType_new");
ALTER TYPE "ClientHistoryEventType" RENAME TO "ClientHistoryEventType_old";
ALTER TYPE "ClientHistoryEventType_new" RENAME TO "ClientHistoryEventType";
DROP TYPE "ClientHistoryEventType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "JobHistoryEventType_new" AS ENUM ('CREATED', 'DELETED', 'TITLE_CHANGED', 'DESCRIPTION_CHANGED', 'STATUS_CHANGED', 'PRIORITY_CHANGED', 'START_DATE_CHANGED', 'DUE_DATE_CHANGED', 'FINISH_DATE_CHANGED', 'PROJECT_CHANGED');
ALTER TABLE "JobHistory" ALTER COLUMN "eventType" TYPE "JobHistoryEventType_new" USING ("eventType"::text::"JobHistoryEventType_new");
ALTER TYPE "JobHistoryEventType" RENAME TO "JobHistoryEventType_old";
ALTER TYPE "JobHistoryEventType_new" RENAME TO "JobHistoryEventType";
DROP TYPE "JobHistoryEventType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ProjectHistoryEventType_new" AS ENUM ('CREATED', 'DELETED', 'NAME_CHANGED', 'DESCRIPTION_CHANGED', 'STATUS_CHANGED', 'PRIORITY_CHANGED', 'START_DATE_CHANGED', 'DUE_DATE_CHANGED', 'FINISH_DATE_CHANGED', 'CLIENT_CHANGED');
ALTER TABLE "ProjectHistory" ALTER COLUMN "eventType" TYPE "ProjectHistoryEventType_new" USING ("eventType"::text::"ProjectHistoryEventType_new");
ALTER TYPE "ProjectHistoryEventType" RENAME TO "ProjectHistoryEventType_old";
ALTER TYPE "ProjectHistoryEventType_new" RENAME TO "ProjectHistoryEventType";
DROP TYPE "ProjectHistoryEventType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "UserHistoryEventType_new" AS ENUM ('CREATED', 'DELETED', 'EMAIL_CHANGED', 'PASSWORD_CHANGED', 'FIRSTNAME_CHANGED', 'LASTNAME_CHANGED', 'ROLE_CHANGED', 'AVATARURL_CHANGED');
ALTER TABLE "UserHistory" ALTER COLUMN "eventType" TYPE "UserHistoryEventType_new" USING ("eventType"::text::"UserHistoryEventType_new");
ALTER TYPE "UserHistoryEventType" RENAME TO "UserHistoryEventType_old";
ALTER TYPE "UserHistoryEventType_new" RENAME TO "UserHistoryEventType";
DROP TYPE "UserHistoryEventType_old";
COMMIT;
