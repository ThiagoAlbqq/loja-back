-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "carrinho" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "carrinho_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "valor" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "ProdutosOnCarrinho" (
    "carrinhoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "desconto" REAL,

    PRIMARY KEY ("carrinhoId", "produtoId"),
    CONSTRAINT "ProdutosOnCarrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutosOnCarrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
