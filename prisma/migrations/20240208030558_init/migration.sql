-- CreateTable
CREATE TABLE "drones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "battery_capacity" INTEGER NOT NULL,
    "state" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "medications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "shipments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "drone_id" TEXT NOT NULL,
    CONSTRAINT "shipments_drone_id_fkey" FOREIGN KEY ("drone_id") REFERENCES "drones" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "shipment_loads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medication_id" TEXT NOT NULL,
    CONSTRAINT "shipment_loads_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "medications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
