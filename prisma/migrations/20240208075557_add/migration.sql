/*
  Warnings:

  - Added the required column `shipment_id` to the `shipment_loads` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shipment_loads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medication_id" TEXT NOT NULL,
    "shipment_id" TEXT NOT NULL,
    CONSTRAINT "shipment_loads_medication_id_fkey" FOREIGN KEY ("medication_id") REFERENCES "medications" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "shipment_loads_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "shipments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_shipment_loads" ("id", "medication_id") SELECT "id", "medication_id" FROM "shipment_loads";
DROP TABLE "shipment_loads";
ALTER TABLE "new_shipment_loads" RENAME TO "shipment_loads";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
