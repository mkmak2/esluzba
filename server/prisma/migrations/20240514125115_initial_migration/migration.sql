-- CreateTable
CREATE TABLE "Person" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "company" INTEGER NOT NULL,
    "section" INTEGER NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Duty" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "assistantId" TEXT NOT NULL,

    CONSTRAINT "Duty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Duty" ADD CONSTRAINT "Duty_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
