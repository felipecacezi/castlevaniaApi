-- CreateTable
CREATE TABLE "Game_titles" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "console" TEXT NOT NULL,
    "release_date" DATETIME NOT NULL,
    "cover_link" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Clans" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "clan_summary" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_title_id" INTEGER NOT NULL,
    "clan_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "character_summary" TEXT NOT NULL,
    CONSTRAINT "Characters_game_title_id_fkey" FOREIGN KEY ("game_title_id") REFERENCES "Game_titles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Characters_clan_id_fkey" FOREIGN KEY ("clan_id") REFERENCES "Clans" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
