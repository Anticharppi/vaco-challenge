/*
  Warnings:

  - You are about to drop the column `weight` on the `drones` table. All the data in the column will be lost.
  - Added the required column `weight_limit` to the `drones` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_drones" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serial_number" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "weight_limit" INTEGER NOT NULL,
    "battery_capacity" INTEGER NOT NULL,
    "state" TEXT NOT NULL
);
INSERT INTO "new_drones" ("battery_capacity", "id", "model", "serial_number", "state") SELECT "battery_capacity", "id", "model", "serial_number", "state" FROM "drones";
DROP TABLE "drones";
ALTER TABLE "new_drones" RENAME TO "drones";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
