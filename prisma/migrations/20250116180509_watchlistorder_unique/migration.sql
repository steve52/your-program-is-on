/*
  Warnings:

  - A unique constraint covering the columns `[watchListOrder]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_watchListOrder_key" ON "Movie"("watchListOrder");
