-- CreateEnum
CREATE TYPE "ClientHistoryEventType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'EMAIL_CHANGED', 'PHONE_CHANGED', 'WEBSITE_CHANGED', 'DESCRIPTION_CHANGED', 'NAME_CHANGED', 'ADDRESS_CHANGED');

-- CreateEnum
CREATE TYPE "ClientField" AS ENUM ('name', 'email', 'phone', 'website', 'description', 'address');

-- CreateTable
CREATE TABLE "ClientHistory" (
    "id" SERIAL NOT NULL,
    "clientId" INTEGER NOT NULL,
    "actorId" INTEGER,
    "eventType" "ClientHistoryEventType" NOT NULL,
    "field" "ClientField",
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ClientHistory" ADD CONSTRAINT "ClientHistory_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientHistory" ADD CONSTRAINT "ClientHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
