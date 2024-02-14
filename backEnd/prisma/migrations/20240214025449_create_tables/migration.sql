-- CreateTable
CREATE TABLE "SurgeryOrder" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "procedures_id" INTEGER NOT NULL,
    "doctor" TEXT NOT NULL,
    "patient" TEXT NOT NULL,
    "surgery_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observations" TEXT NOT NULL DEFAULT 'N/C',

    CONSTRAINT "SurgeryOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Procedures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Procedures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "hospital_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hospital" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurgeryOrder" ADD CONSTRAINT "SurgeryOrder_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurgeryOrder" ADD CONSTRAINT "SurgeryOrder_procedures_id_fkey" FOREIGN KEY ("procedures_id") REFERENCES "Procedures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurgeryOrder" ADD CONSTRAINT "SurgeryOrder_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
