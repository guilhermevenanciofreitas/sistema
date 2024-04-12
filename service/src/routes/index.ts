import { Application } from "express";

import loginRoutes from "./login/login.routes";

import configuracaoRoutes from "./configuracao/index.routes"

//registrations
import userRoutes from "./registrations/user.routes";
import productRoutes from "./registrations/product.routes";
import serviceRoutes from "./registrations/service.routes";
import customerRoutes from "./registrations/consumer.routes";
import supplierRoutes from "./registrations/supplier.routes";
import employeeRoutes from "./registrations/employee.routes";
import shippingCompanyRoutes from "./registrations/shippingsCompany.routes";

import searchRoutes from "./search/index.routes";
import contratoRoutes from "./sales/contrato.routes";

//Financial
import paymentRoutes from "./financial/payment.routes";

import saleOrderRoutes from "./sales/saleOrder.routes";


import pedidoEletronicoRoutes from "./pedido-eletronico/index.routes";
import nfeRoutes from "./fiscal/nfe.routes";
import shippingOrderRoutes from "./logistic/shippingOrder.routes";
import bankAccountRoutes from "./financial/bankAccount.routes";
import shippingRoutes from "./financial/shipping.routes";
import progressRoutes from "./sales/progress.routes";
import calledRoutes from "./relationships/called.routes";
import freightCalculationRoutes from "./logistic/freightCalculation.routes";
import freightQuotesRoutes from "./logistic/freightQuotes.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/login", loginRoutes);

    app.use("/api/configuracao", configuracaoRoutes);

    //Registrations
    app.use("/api/registrations/user", userRoutes);
    app.use("/api/registrations/product", productRoutes);
    app.use("/api/registrations/service", serviceRoutes);
    app.use("/api/registrations/customer", customerRoutes);
    app.use("/api/registrations/supplier", supplierRoutes);
    app.use("/api/registrations/shipping-company", shippingCompanyRoutes);
    app.use("/api/registrations/employee", employeeRoutes);

    //Relationships
    app.use("/api/relationships/called", calledRoutes);


    app.use("/api/contrato", contratoRoutes);
    
    //Sales
    app.use("/api/sales/order", saleOrderRoutes);
    app.use("/api/sales/progress", progressRoutes);

    //Fiscal
    app.use("/api/nfe", nfeRoutes);

    //Logistic
    app.use("/api/logistic/freight-calculation", freightCalculationRoutes);
    app.use("/api/logistic/freight-quote", freightQuotesRoutes);
    app.use("/api/logistic/shipping-order", shippingOrderRoutes);
    app.use("/api/logistic/trip", shippingOrderRoutes);

    //Financial
    app.use("/api/financial/payment", paymentRoutes);

    app.use("/api/financial/bank-account", bankAccountRoutes);
    app.use("/api/financial/shipping", shippingRoutes);



    app.use("/api/search", searchRoutes);

    app.use("/api/pedido-eletronico", pedidoEletronicoRoutes)

  }
}
