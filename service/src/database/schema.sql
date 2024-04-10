--company
CREATE TABLE IF NOT EXISTS "company"();
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "razaoSocial" VARCHAR(100);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "nomeFantasia" VARCHAR(100);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "endereco" JSONB;
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "pedidoDigital" JSONB;

--user
CREATE TABLE IF NOT EXISTS "user"();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email" VARCHAR(100);
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(80);

--partner
CREATE TABLE IF NOT EXISTS "partner"();
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isCliente" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isFornecedor" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isTransportadora" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isFuncionario" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(100);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "apelido" VARCHAR(100);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "nascimento" DATE;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "sexo" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "estadoCivil" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "rg" VARCHAR(20);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "ie" VARCHAR(30);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "im" VARCHAR(30);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "escolaridade" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "profissao" VARCHAR(80);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "tabelaPrecoId" UUID;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isAtivo" BOOLEAN DEFAULT true;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isBloquearVenda" BOOLEAN DEFAULT false;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isBloquearCompra" BOOLEAN DEFAULT false;

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

--product
CREATE TABLE IF NOT EXISTS "product"();
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(100);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "categoriaId" UUID;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "isCombinacao" BOOLEAN;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(10, 2);

--productCategory
CREATE TABLE IF NOT EXISTS "productCategory"();
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "imagem" BYTEA;
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;

--produtoCombinacaoGrupo
CREATE TABLE IF NOT EXISTS "produtoCombinacaoGrupo"();
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "isObrigatorio" BOOLEAN;
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "minimo" INTEGER;
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "maximo" INTEGER;
ALTER TABLE "produtoCombinacaoGrupo" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;

--produtoCombinacaoItem
CREATE TABLE IF NOT EXISTS "produtoCombinacaoItem"();
ALTER TABLE "produtoCombinacaoItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtoCombinacaoItem" ADD COLUMN IF NOT EXISTS "combinacaoId" UUID;
ALTER TABLE "produtoCombinacaoItem" ADD COLUMN IF NOT EXISTS "nome" VARCHAR(100);
ALTER TABLE "produtoCombinacaoItem" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--produtoCombinacao
CREATE TABLE IF NOT EXISTS "produtoCombinacao"();
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "produtoId" UUID;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "combinacaoId" UUID;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "isObrigatorio" BOOLEAN;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "minimo" INTEGER;
ALTER TABLE "produtoCombinacao" ADD COLUMN IF NOT EXISTS "maximo" INTEGER;

--service
CREATE TABLE IF NOT EXISTS "service"();
ALTER TABLE "service" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "service" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--tabelasPreco
CREATE TABLE IF NOT EXISTS "contratos"();
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "clienteId" UUID;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "inicio" DATE;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "termino" DATE;
ALTER TABLE "contratos" ADD COLUMN IF NOT EXISTS "rescisaoId" UUID;

--saleOrderStatus
CREATE TABLE IF NOT EXISTS "saleOrderStatus"();
ALTER TABLE "saleOrderStatus" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderStatus" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);
ALTER TABLE "saleOrderStatus" ADD COLUMN IF NOT EXISTS "color" VARCHAR(20);
ALTER TABLE "saleOrderStatus" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;

--saleOrderStatusByFrom
CREATE TABLE IF NOT EXISTS "saleOrderStatusByFrom"();
ALTER TABLE "saleOrderStatusByFrom" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderStatusByFrom" ADD COLUMN IF NOT EXISTS "statusById" UUID;
ALTER TABLE "saleOrderStatusByFrom" ADD COLUMN IF NOT EXISTS "statusFromId" UUID;

--saleOrder
CREATE TABLE IF NOT EXISTS "saleOrder"();
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "number" VARCHAR(30);
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "costumerId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "sellerId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "tipoEntregaId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "pedidoVendaStatusId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "entregadorId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "entrega" JSONB;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(18, 2);
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITHOUT TIME ZONE;

--pedidoVendaTipoEntrega
CREATE TABLE IF NOT EXISTS "pedidoVendaTipoEntrega"();
ALTER TABLE "pedidoVendaTipoEntrega" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaTipoEntrega" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--saleOrderProgress
CREATE TABLE IF NOT EXISTS "saleOrderProgress"();
ALTER TABLE "saleOrderProgress" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderProgress" ADD COLUMN IF NOT EXISTS "pedidoVendaId" UUID;
ALTER TABLE "saleOrderProgress" ADD COLUMN IF NOT EXISTS "data" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "saleOrderProgress" ADD COLUMN IF NOT EXISTS "statusId" UUID;

--saleOrderItem
CREATE TABLE IF NOT EXISTS "saleOrderItem"();
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "saleOrderId" UUID;
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "produtoId" UUID;
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "quantidade" DECIMAL(10, 3);
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(10, 2);

--saleOrderItemCombination
CREATE TABLE IF NOT EXISTS "saleOrderItemCombination"();
ALTER TABLE "saleOrderItemCombination" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderItemCombination" ADD COLUMN IF NOT EXISTS "saleOrderItemId" UUID;
ALTER TABLE "saleOrderItemCombination" ADD COLUMN IF NOT EXISTS "combinationId" UUID;

--pedidoVendaItemCombinacaoItem
CREATE TABLE IF NOT EXISTS "pedidoVendaItemCombinacaoItem"();
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "pedidoVendaItemCombinacaoId" UUID;
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "itemCombinacaoId" UUID;
ALTER TABLE "pedidoVendaItemCombinacaoItem" ADD COLUMN IF NOT EXISTS "quantidade" DECIMAL(10, 3);

--saleOrderRecieve
CREATE TABLE IF NOT EXISTS "saleOrderRecieve"();
ALTER TABLE "saleOrderRecieve" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderRecieve" ADD COLUMN IF NOT EXISTS "pedidoVendaId" UUID;
ALTER TABLE "saleOrderRecieve" ADD COLUMN IF NOT EXISTS "formaPagamentoId" UUID;
ALTER TABLE "saleOrderRecieve" ADD COLUMN IF NOT EXISTS "vencimento" DATE;
ALTER TABLE "saleOrderRecieve" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(10, 2);

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

--tabelasPreco
CREATE TABLE IF NOT EXISTS "tabelasPreco"();
ALTER TABLE "tabelasPreco" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "tabelasPreco" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);

--bank
CREATE TABLE IF NOT EXISTS "bank"();
ALTER TABLE "bank" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "bank" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "bank" ADD COLUMN IF NOT EXISTS "logo" BYTEA;

--bankAccount
CREATE TABLE IF NOT EXISTS "bankAccount"();
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "bankId" UUID;
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "agency" VARCHAR(4);
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "agencyDigit" VARCHAR(1);
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "account" VARCHAR(20);
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "accountDigit" VARCHAR(1);
ALTER TABLE "bankAccount" ADD COLUMN IF NOT EXISTS "balance" DECIMAL(18, 2);

--bankAccountShipping
CREATE TABLE IF NOT EXISTS "bankAccountShipping"();
ALTER TABLE "bankAccountShipping" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "bankAccountShipping" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "bankAccountShipping" ADD COLUMN IF NOT EXISTS "bankAccountId" UUID;
ALTER TABLE "bankAccountShipping" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20);
ALTER TABLE "bankAccountShipping" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITHOUT TIME ZONE;

--bankAccountShippingPayment
CREATE TABLE IF NOT EXISTS "bankAccountShippingPayment"();
ALTER TABLE "bankAccountShippingPayment" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "bankAccountShippingPayment" ADD COLUMN IF NOT EXISTS "bankAccountShippingId" UUID;
ALTER TABLE "bankAccountShippingPayment" ADD COLUMN IF NOT EXISTS "paymentId" UUID;

--bankAccountPaymentForm
CREATE TABLE IF NOT EXISTS "bankAccountPaymentForm"();
ALTER TABLE "bankAccountPaymentForm" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "bankAccountPaymentForm" ADD COLUMN IF NOT EXISTS "bankAccountId" UUID;
ALTER TABLE "bankAccountPaymentForm" ADD COLUMN IF NOT EXISTS "paymentFormId" UUID;

--payment
CREATE TABLE IF NOT EXISTS "payment"();
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "number" VARCHAR(30);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "numeroDocumento" VARCHAR(100);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "recebedorId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "beneficiaryNotice" VARCHAR(100);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "emissao" DATE;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "vencimento" DATE;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "ourNumber" VARCHAR(20);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "valor" DECIMAL(18, 2);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "paymentFormId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "bankAccountId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "pagamentoId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "data" JSON;

--paymentCarried
CREATE TABLE IF NOT EXISTS "paymentCarried"();
ALTER TABLE "paymentCarried" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "paymentCarried" ADD COLUMN IF NOT EXISTS "paymentId" UUID;
ALTER TABLE "paymentCarried" ADD COLUMN IF NOT EXISTS "valor" UUID;

--nfe
CREATE TABLE IF NOT EXISTS "nfe"();
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "ide" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "emit" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "dest" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "autXML" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "det" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "total" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "transp" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "cobr" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "pag" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "infAdic" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "exporta" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "infRespTec" JSON;

ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "signature" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "protNFe" JSON;

--shippingOrder
CREATE TABLE IF NOT EXISTS "shippingOrder"();
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;

--paymentForm
CREATE TABLE IF NOT EXISTS "paymentForm"();
ALTER TABLE "paymentForm" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "paymentForm" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "paymentForm" ADD COLUMN IF NOT EXISTS "type" VARCHAR(20);

--calledOccurrence
CREATE TABLE IF NOT EXISTS "calledOccurrence"();
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "description" VARCHAR(80);
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "day" INTEGER;
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "hour" INTEGER;
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "minute" INTEGER;

--calledResolution
CREATE TABLE IF NOT EXISTS "calledResolution"();
ALTER TABLE "calledResolution" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "calledResolution" ADD COLUMN IF NOT EXISTS "description" VARCHAR(80);
ALTER TABLE "calledResolution" ADD COLUMN IF NOT EXISTS "finished" BOOLEAN;

--called
CREATE TABLE IF NOT EXISTS "called"();
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "number" VARCHAR(15);
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "status" VARCHAR(15);
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "partnerId" UUID;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "responsibleId" UUID;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "occurrenceId" UUID;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "forecast" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "priority" INTEGER;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "subject" VARCHAR(200);
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "start" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "end" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "called" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITHOUT TIME ZONE;

--calledTask
CREATE TABLE IF NOT EXISTS "calledTask"();
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "taskId" UUID;
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "responsibleId" UUID;
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "checked" BOOLEAN;

--task
CREATE TABLE IF NOT EXISTS "task"();
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "type" VARCHAR(10);
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--region
CREATE TABLE IF NOT EXISTS "region"();
ALTER TABLE "region" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "region" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--freightCalculationType
CREATE TABLE IF NOT EXISTS "freightCalculationType"();
ALTER TABLE "freightCalculationType" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "freightCalculationType" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--freightCalculation
CREATE TABLE IF NOT EXISTS "freightCalculation"();
ALTER TABLE "freightCalculation" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "freightCalculation" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "freightCalculation" ADD COLUMN IF NOT EXISTS "typeId" UUID;
ALTER TABLE "freightCalculation" ADD COLUMN IF NOT EXISTS "senderRegionId" UUID;
ALTER TABLE "freightCalculation" ADD COLUMN IF NOT EXISTS "aliquotICMS" DECIMAL(18, 2);

--freightCalculationSender
CREATE TABLE IF NOT EXISTS "freightCalculationRecipient"();
ALTER TABLE "freightCalculationRecipient" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "freightCalculationRecipient" ADD COLUMN IF NOT EXISTS "freightCalculationId" UUID;
ALTER TABLE "freightCalculationRecipient" ADD COLUMN IF NOT EXISTS "recipientRegionId" UUID;

--freightCalculationWeight
CREATE TABLE IF NOT EXISTS "freightCalculationWeight"();
ALTER TABLE "freightCalculationWeight" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "freightCalculationWeight" ADD COLUMN IF NOT EXISTS "freightCalculationId" UUID;
ALTER TABLE "freightCalculationWeight" ADD COLUMN IF NOT EXISTS "startWeight" DECIMAL(18, 3);
ALTER TABLE "freightCalculationWeight" ADD COLUMN IF NOT EXISTS "endWeight" DECIMAL(18, 3);
ALTER TABLE "freightCalculationWeight" ADD COLUMN IF NOT EXISTS "calculationType" VARCHAR(10);
ALTER TABLE "freightCalculationWeight" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);

--freightCalculationToll
CREATE TABLE IF NOT EXISTS "freightCalculationToll"();
ALTER TABLE "freightCalculationToll" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "freightCalculationToll" ADD COLUMN IF NOT EXISTS "senderRegionId" UUID;
ALTER TABLE "freightCalculationToll" ADD COLUMN IF NOT EXISTS "recipientRegionId" UUID;
ALTER TABLE "freightCalculationToll" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);