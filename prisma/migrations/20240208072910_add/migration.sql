/*
  Warnings:

  - Added the required column `status` to the `shipments` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shipments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "drone_id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "shipments_drone_id_fkey" FOREIGN KEY ("drone_id") REFERENCES "drones" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_shipments" ("drone_id", "id") SELECT "drone_id", "id" FROM "shipments";
DROP TABLE "shipments";
ALTER TABLE "new_shipments" RENAME TO "shipments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
