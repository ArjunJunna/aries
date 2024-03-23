/*
  Warnings:

  - Made the column `archive` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `document` on table `files` required. This step will fail if there are existing NULL values in that column.
  - Made the column `whiteboard` on table `files` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "files" ALTER COLUMN "archive" SET NOT NULL,
ALTER COLUMN "document" SET NOT NULL,
ALTER COLUMN "whiteboard" SET NOT NULL;
