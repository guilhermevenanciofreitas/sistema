--empresas
CREATE TABLE IF NOT EXISTS "empresas"();
ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "razaoSocial" VARCHAR(100);
ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "nomeFantasia" VARCHAR(100);
ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "empresas" ADD COLUMN IF NOT EXISTS "endereco" JSONB;

--usuarios
CREATE TABLE IF NOT EXISTS "usuarios"();
ALTER TABLE "usuarios" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "usuarios" ADD COLUMN IF NOT EXISTS "email" VARCHAR(100);
ALTER TABLE "usuarios" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(80);

--parceiros
CREATE TABLE IF NOT EXISTS "parceiros"();
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "isCliente" BOOLEAN;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "isFornecedor" BOOLEAN;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "isTransportadora" BOOLEAN;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "isFuncionario" BOOLEAN;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(100);
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "apelido" VARCHAR(100);
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "nascimento" DATE;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "sexo" SMALLINT;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "estadoCivil" SMALLINT;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "rg" VARCHAR(20);
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "ie" VARCHAR(30);
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "im" VARCHAR(30);
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "escolaridade" SMALLINT;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "profissao" VARCHAR(80);
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "tabelaPrecoId" UUID;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "isAtivo" BOOLEAN DEFAULT true;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "isBloquearVenda" BOOLEAN DEFAULT false;
ALTER TABLE "parceiros" ADD COLUMN IF NOT EXISTS "isBloquearCompra" BOOLEAN DEFAULT false;

--parceirosContato
CREATE TABLE IF NOT EXISTS "parceirosContato"();
ALTER TABLE "parceirosContato" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "parceirosContato" ADD COLUMN IF NOT EXISTS "parceiroId" UUID;
ALTER TABLE "parceirosContato" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(80);
ALTER TABLE "parceirosContato" ADD COLUMN IF NOT EXISTS "telefone" VARCHAR(30);
ALTER TABLE "parceirosContato" ADD COLUMN IF NOT EXISTS "email" VARCHAR(120);

--parceirosEndereco
CREATE TABLE IF NOT EXISTS "parceirosEndereco"();
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "parceiroId" UUID;
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "cep" VARCHAR(8);
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "logradouro" VARCHAR(100);
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "numero" VARCHAR(20);
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "complemento" VARCHAR(50);
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "bairro" VARCHAR(50);
ALTER TABLE "parceirosEndereco" ADD COLUMN IF NOT EXISTS "estadoId" UUID;

--estados
CREATE TABLE IF NOT EXISTS "estados"();
ALTER TABLE "estados" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "estados" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(60);
ALTER TABLE "estados" ADD COLUMN IF NOT EXISTS "uf" VARCHAR(2);
ALTER TABLE "estados" ADD COLUMN IF NOT EXISTS "ibge" INT;
ALTER TABLE "estados" ADD COLUMN IF NOT EXISTS "pais" INT;
ALTER TABLE "estados" ADD COLUMN IF NOT EXISTS "ddd" JSON;

--estados
CREATE TABLE IF NOT EXISTS "municipio"();
ALTER TABLE "municipio" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "municipio" ADD COLUMN IF NOT EXISTS "estadoId" UUID;
ALTER TABLE "municipio" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(60);

--produtos
CREATE TABLE IF NOT EXISTS "produtos"();
ALTER TABLE "produtos" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtos" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);
ALTER TABLE "produtos" ADD COLUMN IF NOT EXISTS "isCombinacao" BOOLEAN;

--produtoCombinacaoGrupo
CREATE TABLE IF NOT EXISTS "produtoCombinacaoGrupo"();
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "isObrigatorio" BOOLEAN;
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "minimo" INTEGER;
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "maximo" INTEGER;

--produtoCombinacaoItem
CREATE TABLE IF NOT EXISTS "produtoCombinacaoItem"();
ALTER TABLE "produtoCombinacaoItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtoCombinacaoItem" ADD COLUMN IF NOT EXISTS "combinacaoId" UUID;
ALTER TABLE "produtoCombinacaoItem" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--produtoCombinacao
CREATE TABLE IF NOT EXISTS "produtoCombinacao"();
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "produtoId" UUID;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "combinacaoId" UUID;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "isObrigatorio" BOOLEAN;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "minimo" INTEGER;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "maximo" INTEGER;

--servicos
CREATE TABLE IF NOT EXISTS "servicos"();
ALTER TABLE "servicos" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "servicos" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--tabelasPreco
CREATE TABLE IF NOT EXISTS "contratos"();
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "clienteId" UUID;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "inicio" DATE;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "termino" DATE;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "rescisaoId" UUID;

--pedidoVendaStatus
CREATE TABLE IF NOT EXISTS "pedidoVendaStatus"();
ALTER TABLE "pedidoVendaStatus" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaStatus" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);
ALTER TABLE "pedidoVendaStatus" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;

--pedidoVenda
CREATE TABLE IF NOT EXISTS "pedidoVenda"();
ALTER TABLE "pedidoVenda" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVenda" ADD COLUMN IF NOT EXISTS "clienteId" UUID;
ALTER TABLE "pedidoVenda" ADD COLUMN IF NOT EXISTS "tipoEntregaId" UUID;
ALTER TABLE "pedidoVenda" ADD COLUMN IF NOT EXISTS "pedidoVendaStatusId" UUID;
ALTER TABLE "pedidoVenda" ADD COLUMN IF NOT EXISTS "entregadorId" UUID;
ALTER TABLE "pedidoVenda" ADD COLUMN IF NOT EXISTS "entrega" JSONB;

--pedidoVendaTipoEntrega
CREATE TABLE IF NOT EXISTS "pedidoVendaTipoEntrega"();
ALTER TABLE "pedidoVendaTipoEntrega" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaTipoEntrega" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--pedidoVendaAndamento
CREATE TABLE IF NOT EXISTS "pedidoVendaAndamento"();
ALTER TABLE "pedidoVendaAndamento" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaAndamento" ADD COLUMN IF NOT EXISTS "pedidoVendaId" UUID;
ALTER TABLE "pedidoVendaAndamento" ADD COLUMN IF NOT EXISTS "data" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "pedidoVendaAndamento" ADD COLUMN IF NOT EXISTS "statusId" UUID;

--pedidoVendaItem
CREATE TABLE IF NOT EXISTS "pedidoVendaItem"();
ALTER TABLE "pedidoVendaItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaItem" ADD COLUMN IF NOT EXISTS "pedidoVendaId" UUID;
ALTER TABLE "pedidoVendaItem" ADD COLUMN IF NOT EXISTS "produtoId" UUID;
ALTER TABLE "pedidoVendaItem" ADD COLUMN IF NOT EXISTS "quantidade" DECIMAL(10, 3);
ALTER TABLE "pedidoVendaItem" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(10, 2);

--pedidoVendaItemCombinacao
CREATE TABLE IF NOT EXISTS "pedidoVendaItemCombinacao"();
ALTER TABLE "pedidoVendaItemCombinacao" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaItemCombinacao" ADD COLUMN IF NOT EXISTS "pedidoVendaItemId" UUID;
ALTER TABLE "pedidoVendaItemCombinacao" ADD COLUMN IF NOT EXISTS "combinacaoId" UUID;

--pedidoVendaItemCombinacaoItem
CREATE TABLE IF NOT EXISTS "pedidoVendaItemCombinacaoItem"();
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "pedidoVendaItemCombinacaoId" UUID;
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "itemCombinacaoId" UUID;
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "quantidade" DECIMAL(10, 3);

--pedidoVendaItem
CREATE TABLE IF NOT EXISTS "pedidoVendaPagamento"();
ALTER TABLE "pedidoVendaPagamento" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaPagamento" ADD COLUMN IF NOT EXISTS "pedidoVendaId" UUID;
ALTER TABLE "pedidoVendaPagamento" ADD COLUMN IF NOT EXISTS "formaPagamentoId" UUID;
ALTER TABLE "pedidoVendaPagamento" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(10, 2);

--pedidoVendaDeliveryRoute
CREATE TABLE IF NOT EXISTS "pedidoVendaDeliveryRoute"();
ALTER TABLE "pedidoVendaDeliveryRoute" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaDeliveryRoute" ADD COLUMN IF NOT EXISTS "pedidoVendaId" UUID;
ALTER TABLE "pedidoVendaDeliveryRoute" ADD COLUMN IF NOT EXISTS "deliveryRouteId" UUID;

--delivery
CREATE TABLE IF NOT EXISTS "delivery"();
ALTER TABLE "delivery" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "delivery" ADD COLUMN IF NOT EXISTS "entregadorId" UUID;
ALTER TABLE "delivery" ADD COLUMN IF NOT EXISTS "saiuParaEntrega" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "delivery" ADD COLUMN IF NOT EXISTS "finalizado" TIMESTAMP WITHOUT TIME ZONE;

--deliveryRoute
CREATE TABLE IF NOT EXISTS "deliveryRoute"();
ALTER TABLE "deliveryRoute" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "deliveryRoute" ADD COLUMN IF NOT EXISTS "deliveryId" UUID;
ALTER TABLE "deliveryRoute" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;
ALTER TABLE "deliveryRoute" ADD COLUMN IF NOT EXISTS "entregue" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "deliveryRoute" ADD COLUMN IF NOT EXISTS "cancelado" TIMESTAMP WITHOUT TIME ZONE;

--formaPagamento
CREATE TABLE IF NOT EXISTS "formaPagamento"();
ALTER TABLE "formaPagamento" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "formaPagamento" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--tabelasPreco
CREATE TABLE IF NOT EXISTS "tabelasPreco"();
ALTER TABLE "tabelasPreco" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "tabelasPreco" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--contasPagar
CREATE TABLE IF NOT EXISTS "contasPagar"();
ALTER TABLE "contasPagar" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "contasPagar" ADD COLUMN IF NOT EXISTS "numeroDocumento" VARCHAR(100);
ALTER TABLE "contasPagar" ADD COLUMN IF NOT EXISTS "recebedorId" UUID;
ALTER TABLE "contasPagar" ADD COLUMN IF NOT EXISTS "emissao" DATE;
ALTER TABLE "contasPagar" ADD COLUMN IF NOT EXISTS "vencimento" DATE;
ALTER TABLE "contasPagar" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(10, 2);
ALTER TABLE "contasPagar" ADD COLUMN IF NOT EXISTS "pagamentoId" UUID;