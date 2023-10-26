-- CreateTable
CREATE TABLE "Game_titles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "console" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "cover_link" TEXT NOT NULL,

    CONSTRAINT "Game_titles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clans" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clan_summary" TEXT NOT NULL,

    CONSTRAINT "Clans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Characters" (
    "id" SERIAL NOT NULL,
    "game_title_id" INTEGER NOT NULL,
    "clan_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "history" TEXT NOT NULL,
    "character_summary" TEXT NOT NULL,

    CONSTRAINT "Characters_pkey" PRIMARY KEY ("id")
);
