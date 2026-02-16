-- CreateEnum
CREATE TYPE "UserHistoryEventType" AS ENUM ('CREATED', 'UPDATED', 'DELETED', 'EMAIL_CHANGED', 'PASSWORD_CHANGED', 'FIRSTNAME_CHANGED', 'LASTNAME_CHANGED', 'ROLE_CHANGED', 'AVATARURL_CHANGED');

-- CreateEnum
CREATE TYPE "UserField" AS ENUM ('email', 'password', 'firstName', 'lastName', 'role', 'avatarUrl');

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,
    "eventType" "UserHistoryEventType" NOT NULL,
    "field" "UserField",
    "oldValue" JSONB,
    "newValue" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
