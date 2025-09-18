-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_carrinho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "carrinho_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_carrinho" ("id", "userId") SELECT "id", "userId" FROM "carrinho";
DROP TABLE "carrinho";
ALTER TABLE "new_carrinho" RENAME TO "carrinho";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
