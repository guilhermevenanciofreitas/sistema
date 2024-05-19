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

--calledOccurrence
CREATE TABLE IF NOT EXISTS "calledOccurrence"();
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "description" VARCHAR(80);
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "day" INTEGER;
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "hour" INTEGER;
ALTER TABLE "calledOccurrence" ADD COLUMN IF NOT EXISTS "minute" INTEGER;

--calledTask
CREATE TABLE IF NOT EXISTS "calledTask"();
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "taskId" UUID;
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "responsibleId" UUID;
ALTER TABLE "calledTask" ADD COLUMN IF NOT EXISTS "checked" BOOLEAN;

--calledResolution
CREATE TABLE IF NOT EXISTS "calledResolution"();
ALTER TABLE "calledResolution" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "calledResolution" ADD COLUMN IF NOT EXISTS "description" VARCHAR(80);
ALTER TABLE "calledResolution" ADD COLUMN IF NOT EXISTS "finished" BOOLEAN;

--city
CREATE TABLE IF NOT EXISTS "city"();
ALTER TABLE "city" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "city" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "city" ADD COLUMN IF NOT EXISTS "ibge" VARCHAR(7);
ALTER TABLE "city" ADD COLUMN IF NOT EXISTS "stateId" UUID;

--company
CREATE TABLE IF NOT EXISTS "company"();
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "surname" VARCHAR(100);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "address" JSONB;
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "certificate" JSONB;
ALTER TABLE "company" ADD COLUMN IF NOT EXISTS "digitalOrder" JSONB;

--contract
CREATE TABLE IF NOT EXISTS "contract"();
ALTER TABLE "contract" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "contract" ADD COLUMN IF NOT EXISTS "clienteId" UUID;
ALTER TABLE "contract" ADD COLUMN IF NOT EXISTS "inicio" DATE;
ALTER TABLE "contract" ADD COLUMN IF NOT EXISTS "termino" DATE;
ALTER TABLE "contract" ADD COLUMN IF NOT EXISTS "rescisaoId" UUID;

--cte
CREATE TABLE IF NOT EXISTS "cte"();
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "CTe" JSON;
ALTER TABLE "cte" ADD COLUMN IF NOT EXISTS "protCTe" JSON;

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

--dfe
CREATE TABLE IF NOT EXISTS "dfe"();
ALTER TABLE "dfe" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "dfe" ADD COLUMN IF NOT EXISTS "dhResp" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "dfe" ADD COLUMN IF NOT EXISTS "maxNSU" INTEGER;
ALTER TABLE "dfe" ADD COLUMN IF NOT EXISTS "ultNSU" INTEGER;

--dfeProcNfe
CREATE TABLE IF NOT EXISTS "dfeProcNfe"();
ALTER TABLE "dfeProcNfe" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "dfeProcNfe" ADD COLUMN IF NOT EXISTS "dfeId" UUID;
ALTER TABLE "dfeProcNfe" ADD COLUMN IF NOT EXISTS "xml" BYTEA;

--dfeResNfe
CREATE TABLE IF NOT EXISTS "dfeResNfe"();
ALTER TABLE "dfeResNfe" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "dfeResNfe" ADD COLUMN IF NOT EXISTS "dfeId" UUID;
ALTER TABLE "dfeResNfe" ADD COLUMN IF NOT EXISTS "xml" BYTEA;

--economicActivity
CREATE TABLE IF NOT EXISTS "economicActivity"();
ALTER TABLE "economicActivity" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "economicActivity" ADD COLUMN IF NOT EXISTS "cnae" VARCHAR(10);
ALTER TABLE "economicActivity" ADD COLUMN IF NOT EXISTS "name" VARCHAR(150);

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

--freightCalculationType
CREATE TABLE IF NOT EXISTS "freightCalculationType"();
ALTER TABLE "freightCalculationType" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "freightCalculationType" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

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

--legalNature
CREATE TABLE IF NOT EXISTS "legalNature"();
ALTER TABLE "legalNature" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "legalNature" ADD COLUMN IF NOT EXISTS "code" VARCHAR(10);
ALTER TABLE "legalNature" ADD COLUMN IF NOT EXISTS "name" VARCHAR(150);

--measurementUnit
CREATE TABLE IF NOT EXISTS "measurementUnit"();
ALTER TABLE "measurementUnit" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "measurementUnit" ADD COLUMN IF NOT EXISTS "name" VARCHAR(50);
ALTER TABLE "measurementUnit" ADD COLUMN IF NOT EXISTS "surname" VARCHAR(50);



--user
CREATE TABLE IF NOT EXISTS "user"();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "email" VARCHAR(100);
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "name" VARCHAR(80);

--partner
CREATE TABLE IF NOT EXISTS "partner"();
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isCustomer" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isSupplier" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isShippingCompany" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isEmployee" BOOLEAN;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "cpfCnpj" VARCHAR(14);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "surname" VARCHAR(100);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "birth" DATE;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "sex" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "maritalStatus" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "rg" VARCHAR(20);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "ie" VARCHAR(30);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "im" VARCHAR(30);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "scholarity" SMALLINT;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "profession" VARCHAR(80);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "naturalness" VARCHAR(80);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "nationality" VARCHAR(80);
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "address" JSONB;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isBlockSale" BOOLEAN DEFAULT false;
ALTER TABLE "partner" ADD COLUMN IF NOT EXISTS "isBlockBuy" BOOLEAN DEFAULT false;

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

--stock
CREATE TABLE IF NOT EXISTS "stock"();
ALTER TABLE "stock" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "stock" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "stock" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--stockIn
CREATE TABLE IF NOT EXISTS "stockIn"();
ALTER TABLE "stockIn" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "stockIn" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP WITHOUT TIME ZONE;
ALTER TABLE "stockIn" ADD COLUMN IF NOT EXISTS "nfeId" UUID;
ALTER TABLE "stockIn" ADD COLUMN IF NOT EXISTS "supplierId" UUID;
ALTER TABLE "stockIn" ADD COLUMN IF NOT EXISTS "status" VARCHAR(20);

--stockInProduct
CREATE TABLE IF NOT EXISTS "stockInProduct"();
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "stockInId" UUID;
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "stockLocationId" UUID;
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "productId" UUID;
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "quantity" DECIMAL(18, 3);
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "measurementUnitId" UUID;
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "contain" DECIMAL(18, 3);
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "balance" DECIMAL(18, 3);
ALTER TABLE "stockInProduct" ADD COLUMN IF NOT EXISTS "prod" JSONB;


--state
CREATE TABLE IF NOT EXISTS "state"();
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "stateId" UUID;
ALTER TABLE "state" ADD COLUMN IF NOT EXISTS "name" VARCHAR(60);

--product
CREATE TABLE IF NOT EXISTS "product"();
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "categoryId" UUID;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "subCategoryId" UUID;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "isCombination" BOOLEAN;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "cost" DECIMAL(18, 2);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "markup" DECIMAL(18, 2);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "stockBalance" DECIMAL(18, 2);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "stockType" VARCHAR(20);
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "stockMin" INTEGER;
ALTER TABLE "product" ADD COLUMN IF NOT EXISTS "stockMax" INTEGER;

--productCategory
CREATE TABLE IF NOT EXISTS "productCategory"();
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "image" BYTEA;
ALTER TABLE "productCategory" ADD COLUMN IF NOT EXISTS "ordem" INTEGER;

--productSubCategory
CREATE TABLE IF NOT EXISTS "productSubCategory"();
ALTER TABLE "productSubCategory" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productSubCategory" ADD COLUMN IF NOT EXISTS "categoryId" UUID;
ALTER TABLE "productSubCategory" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);

--combination
CREATE TABLE IF NOT EXISTS "combination"();
ALTER TABLE "combination" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "combination" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);

--productCombination
CREATE TABLE IF NOT EXISTS "productCombination"();
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "productId" UUID;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "combinationId" UUID;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "isRequired" BOOLEAN;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "min" INTEGER;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "max" INTEGER;
ALTER TABLE "productCombination" ADD COLUMN IF NOT EXISTS "order" INTEGER;

--productCombinationItem
CREATE TABLE IF NOT EXISTS "productCombinationItem"();
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "productCombinationId" UUID;
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "name" VARCHAR(100);
ALTER TABLE "productCombinationItem" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--productSupplier
CREATE TABLE IF NOT EXISTS "productSupplier"();
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "code" VARCHAR(20);
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "productId" UUID;
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "measurementUnitId" UUID;
ALTER TABLE "productSupplier" ADD COLUMN IF NOT EXISTS "contain" DECIMAL(18, 3);

--service
CREATE TABLE IF NOT EXISTS "service"();
ALTER TABLE "service" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "service" ADD COLUMN IF NOT EXISTS "descricao" VARCHAR(100);


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
ALTER TABLE "saleOrder" ADD COLUMN IF NOT EXISTS "customerId" UUID;
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

--productPrice
CREATE TABLE IF NOT EXISTS "productPrice"();
ALTER TABLE "productPrice" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "productPrice" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

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
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "paymentFormId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "dueDate" DATE;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "scheduleDate" DATE;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "ourNumber" VARCHAR(20);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "receiverId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "bankAccountId" UUID;
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "documentNumber" VARCHAR(100);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "payment" ADD COLUMN IF NOT EXISTS "beneficiaryNotice" VARCHAR(100);

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
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "NFe" JSON;
ALTER TABLE "nfe" ADD COLUMN IF NOT EXISTS "protNFe" JSON;

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
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "number" VARCHAR(30);
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "value" DECIMAL(18, 2);
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "senderId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "recipientId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "statusId" UUID;
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "predominantProduct" VARCHAR(50);
ALTER TABLE "shippingOrder" ADD COLUMN IF NOT EXISTS "weight" DECIMAL(18, 3);

--shippingOrderNfe
CREATE TABLE IF NOT EXISTS "shippingOrderNfe"();
ALTER TABLE "shippingOrderNfe" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "shippingOrderNfe" ADD COLUMN IF NOT EXISTS "shippingOrderId" UUID;
ALTER TABLE "shippingOrderNfe" ADD COLUMN IF NOT EXISTS "nfeId" UUID;

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

--task
CREATE TABLE IF NOT EXISTS "task"();
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "type" VARCHAR(10);
ALTER TABLE "task" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);

--trip
CREATE TABLE IF NOT EXISTS "trip"();
ALTER TABLE "trip" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "trip" ADD COLUMN IF NOT EXISTS "companyId" UUID;
ALTER TABLE "trip" ADD COLUMN IF NOT EXISTS "type" VARCHAR(15);
ALTER TABLE "trip" ADD COLUMN IF NOT EXISTS "number" VARCHAR(30);
ALTER TABLE "trip" ADD COLUMN IF NOT EXISTS "driverId" UUID;
ALTER TABLE "trip" ADD COLUMN IF NOT EXISTS "vehicleId" UUID;

--tripCte
CREATE TABLE IF NOT EXISTS "tripCte"();
ALTER TABLE "tripCte" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "tripCte" ADD COLUMN IF NOT EXISTS "tripId" UUID;
ALTER TABLE "tripCte" ADD COLUMN IF NOT EXISTS "cteId" UUID;

--tripShippingOrder
CREATE TABLE IF NOT EXISTS "tripShippingOrder"();
ALTER TABLE "tripShippingOrder" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "tripShippingOrder" ADD COLUMN IF NOT EXISTS "tripId" UUID;
ALTER TABLE "tripShippingOrder" ADD COLUMN IF NOT EXISTS "shippingOrderId" UUID;

--tripVehicle
CREATE TABLE IF NOT EXISTS "tripVehicle"();
ALTER TABLE "tripVehicle" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "tripVehicle" ADD COLUMN IF NOT EXISTS "tripId" UUID;
ALTER TABLE "tripVehicle" ADD COLUMN IF NOT EXISTS "vehicleId" UUID;

--mesoRegion
CREATE TABLE IF NOT EXISTS "mesoRegion"();
ALTER TABLE "mesoRegion" ADD COLUMN IF NOT EXISTS "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY;
ALTER TABLE "mesoRegion" ADD COLUMN IF NOT EXISTS "stateId" UUID;
ALTER TABLE "mesoRegion" ADD COLUMN IF NOT EXISTS "description" VARCHAR(100);
