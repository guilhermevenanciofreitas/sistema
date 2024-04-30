--company
CREATE TABLE IF NOT EXISTS "company"();
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "surname" VARCHAR(100);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "address" JSONB;
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "pedidoDigital" JSONB;

--user
CREATE TABLE IF NOT EXISTS "user"();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email" VARCHAR(100);
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "name" VARCHAR(80);

--partner
CREATE TABLE IF NOT EXISTS "partner"();
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isCostumer" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isSupplier" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isShippingCompany" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isEmployee" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "surname" VARCHAR(100);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "birth" DATE;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "sex" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "estadoCivil" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "rg" VARCHAR(20);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "ie" VARCHAR(30);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "im" VARCHAR(30);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "escolaridade" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "profissao" VARCHAR(80);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "tabelaPrecoId" UUID;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isAtivo" BOOLEAN DEFAULT true;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isBlockSale" BOOLEAN DEFAULT false;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isBloquearCompra" BOOLEAN DEFAULT false;

--partnerContact
CREATE TABLE IF NOT EXISTS "partnerContact"();
ALTER TABLE "partnerContact" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "partnerContact" ADD COLUMN IF NOT EXISTS "partnerId" UUID;
ALTER TABLE "partnerContact" ADD COLUMN IF NOT EXISTS "name" VARCHAR(80);
ALTER TABLE "partnerContact" ADD COLUMN IF NOT EXISTS "phone" VARCHAR(30);
ALTER TABLE "partnerContact" ADD COLUMN IF NOT EXISTS "email" VARCHAR(120);

--partnerAddress
CREATE TABLE IF NOT EXISTS "partnerAddress"();
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "partnerId" UUID;
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "cep" VARCHAR(8);
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "logradouro" VARCHAR(100);
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "numero" VARCHAR(20);
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "complemento" VARCHAR(50);
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "bairro" VARCHAR(50);
ALTER TABLE "partnerAddress" ADD COLUMN IF NOT EXISTS "estadoId" UUID;

--state
CREATE TABLE IF NOT EXISTS "state"();
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "description" VARCHAR(60);
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "acronym" VARCHAR(2);
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "ibge" INT;
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "pais" INT;
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "ddd" JSON;

--estados
CREATE TABLE IF NOT EXISTS "city"();
ALTER TABLE "city" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "city" ADD COLUMN IF NOT EXISTS "stateId" UUID;
ALTER TABLE "city" ADD COLUMN IF NOT EXISTS "name" VARCHAR(60);

--product
CREATE TABLE IF NOT EXISTS "product"();
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "categoryId" UUID;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "isCombination" BOOLEAN;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);

--productCategory
CREATE TABLE IF NOT EXISTS "productCategory"();
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "image" BYTEA;
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;

--produtoCombinationGroup
CREATE TABLE IF NOT EXISTS "produtoCombinationGroup"();
ALTER TABLE "produtoCombinationGroup" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "produtoCombinationGroup" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "produtoCombinationGroup" ADD COLUMN IF NOT EXISTS "isObrigatorio" BOOLEAN;
ALTER TABLE "produtoCombinationGroup" ADD COLUMN IF NOT EXISTS "minimo" INTEGER;
ALTER TABLE "produtoCombinationGroup" ADD COLUMN IF NOT EXISTS "maximo" INTEGER;
ALTER TABLE "produtoCombinationGroup" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;

--productCombinationItem
CREATE TABLE IF NOT EXISTS "productCombinationItem"();
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "combinationId" UUID;
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--productCombination
CREATE TABLE IF NOT EXISTS "productCombination"();
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "productId" UUID;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "combinacaoId" UUID;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "isObrigatorio" BOOLEAN;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "minimo" INTEGER;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "maximo" INTEGER;

--productSupplier
CREATE TABLE IF NOT EXISTS "productSupplier"();
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "productId" UUID;
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "supplierId" UUID;

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
ALTER TABLE "saleOrderStatus" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
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
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "number" VARCHAR(30);
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "costumerId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "sellerId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "statusId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "shippingTypeId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "shippingCompanyId" UUID;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "shippingAddress" JSONB;
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITHOUT TIME ZONE;

--saleOrderShippingType
CREATE TABLE IF NOT EXISTS "saleOrderShippingType"();
ALTER TABLE "saleOrderShippingType" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderShippingType" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

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
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "productId" UUID;
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "quantity" DECIMAL(18, 3);
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "saleOrderItem" ADD COLUMN IF NOT EXISTS "discount" DECIMAL(18, 2);

--saleOrderItemCombination
CREATE TABLE IF NOT EXISTS "saleOrderItemCombination"();
ALTER TABLE "saleOrderItemCombination" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderItemCombination" ADD COLUMN IF NOT EXISTS "saleOrderItemId" UUID;
ALTER TABLE "saleOrderItemCombination" ADD COLUMN IF NOT EXISTS "combinationId" UUID;

--saleOrderItemCombinationItem
CREATE TABLE IF NOT EXISTS "saleOrderItemCombinationItem"();
ALTER TABLE "saleOrderItemCombinationItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderItemCombinationItem" ADD COLUMN IF NOT EXISTS "saleOrderItemCombinationId" UUID;
ALTER TABLE "saleOrderItemCombinationItem" ADD COLUMN IF NOT EXISTS "itemCombinationId" UUID;
ALTER TABLE "saleOrderItemCombinationItem" ADD COLUMN IF NOT EXISTS "quantity" DECIMAL(18, 3);

--saleOrderNfe
CREATE TABLE IF NOT EXISTS "saleOrderNfe"();
ALTER TABLE "saleOrderNfe" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderNfe" ADD COLUMN IF NOT EXISTS "saleOrderId" UUID;
ALTER TABLE "saleOrderNfe" ADD COLUMN IF NOT EXISTS "nfeId" UUID;

--saleOrderReceivie
CREATE TABLE IF NOT EXISTS "saleOrderReceivie"();
ALTER TABLE "saleOrderReceivie" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "saleOrderReceivie" ADD COLUMN IF NOT EXISTS "saleOrderId" UUID;
ALTER TABLE "saleOrderReceivie" ADD COLUMN IF NOT EXISTS "receivieFormId" UUID;
ALTER TABLE "saleOrderReceivie" ADD COLUMN IF NOT EXISTS "dueDate" DATE;
ALTER TABLE "saleOrderReceivie" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);

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

--productPrice
CREATE TABLE IF NOT EXISTS "productPrice"();
ALTER TABLE "productPrice" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productPrice" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

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
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "receiverId" UUID;
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

--cte
CREATE TABLE IF NOT EXISTS "cte"();
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "ide" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "emit" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "rem" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "dest" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "vPrest" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "imp" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "infCTeNorm" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "autXML" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "infCTeSupl" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "signature" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "protCTe" JSON;

--vehicle
CREATE TABLE IF NOT EXISTS "vehicle"();
ALTER TABLE "vehicle" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "vehicle" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "vehicle" ADD COLUMN IF NOT EXISTS "plate" VARCHAR(8);

--shippingOrderStatus
CREATE TABLE IF NOT EXISTS "shippingOrderStatus"();
ALTER TABLE "shippingOrderStatus" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "shippingOrderStatus" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--shippingOrder
CREATE TABLE IF NOT EXISTS "shippingOrder"();
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "senderId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "recipientId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "statusId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "driverId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "vehicleId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "weight" DECIMAL(18, 3);

--shippingOrderNfe
CREATE TABLE IF NOT EXISTS "shippingOrderNfe"();
ALTER TABLE "shippingOrderNfe" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "shippingOrderNfe" ADD COLUMN IF NOT EXISTS "shippingOrderId" UUID;
ALTER TABLE "shippingOrderNfe" ADD COLUMN IF NOT EXISTS "nfeId" UUID;

--shippingOrderVehicle
CREATE TABLE IF NOT EXISTS "shippingOrderVehicle"();
ALTER TABLE "shippingOrderVehicle" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "shippingOrderVehicle" ADD COLUMN IF NOT EXISTS "shippingOrderId" UUID;
ALTER TABLE "shippingOrderVehicle" ADD COLUMN IF NOT EXISTS "vehicleId" UUID;

--receivieForm
CREATE TABLE IF NOT EXISTS "receivieForm"();
ALTER TABLE "receivieForm" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "receivieForm" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "receivieForm" ADD COLUMN IF NOT EXISTS "type" VARCHAR(20);

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

--mesoRegion
CREATE TABLE IF NOT EXISTS "mesoRegion"();
ALTER TABLE "mesoRegion" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "mesoRegion" ADD COLUMN IF NOT EXISTS "stateId" UUID;
ALTER TABLE "mesoRegion" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

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
ALTER TABLE "freightCalculationRecipient" ADD COLUMN IF NOT EXISTS "recipientMesoRegionId" UUID;

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
ALTER TABLE "freightCalculationToll" ADD COLUMN IF NOT EXISTS "senderMesoRegionId" UUID;
ALTER TABLE "freightCalculationToll" ADD COLUMN IF NOT EXISTS "recipientMesoRegionId" UUID;
ALTER TABLE "freightCalculationToll" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);

--freightQuote
CREATE TABLE IF NOT EXISTS "freightQuote"();
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "typeId" UUID;
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "weight" DECIMAL(18, 2);
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "senderId" UUID;
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "senderMesoRegionId" UUID;
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "recipientId" UUID;
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "recipientMesoRegionId" UUID;
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "aliquotICMS" DECIMAL(18, 2);
ALTER TABLE "freightQuote" ADD COLUMN IF NOT EXISTS "valueICMS" DECIMAL(18, 2);