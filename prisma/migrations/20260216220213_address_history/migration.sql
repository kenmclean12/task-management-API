-- CreateEnum
CREATE TYPE "AddressHistoryEventType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'STREET_CHANGED', 'CITY_CHANGED', 'STATE_CHANGED', 'COUNTRY_CHANGED', 'POSTALCODE_CHANGED', 'CLIENT_CHANGED');

-- CreateEnum
CREATE TYPE "AddressField" AS ENUM ('street', 'city', 'state', 'country', 'postalCode', 'client');

-- CreateTable
CREATE TABLE "AddressHistory" (
    "id" SERIAL NOT NULL,
    "addressId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "eventType" "AddressHistoryEventType" NOT NULL,
    "field" "AddressField",
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AddressHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddressHistory" ADD CONSTRAINT "AddressHistory_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AddressHistory" ADD CONSTRAINT "AddressHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
