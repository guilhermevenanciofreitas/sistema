import { Application } from "express";

import loginRoutes from "./login/login.routes";

import configuracaoRoutes from "./configuracao/index.routes"

//registrations
import userRoutes from "./registrations/user.routes";
import productRoutes from "./registrations/product.routes";
import serviceRoutes from "./registrations/service.routes";
import customerRoutes from "./registrations/consumer.routes";
import suppliersRoutes from "./registrations/supplier.routes";
import funcionarioRoutes from "./registrations/funcionario.routes";
import transportadoraRoutes from "./registrations/transportadora.routes";

import searchRoutes from "./search/index.routes";
import contratoRoutes from "./sales/contrato.routes";

import paymentRoutes from "./financial/payment.routes";

import pedidoVendaRoutes from "./sales/pedidoVenda.routes";


import pedidoEletronicoRoutes from "./pedido-eletronico/index.routes";
import nfeRoutes from "./fiscal/nfe.routes";
import shippingOrderRoutes from "./logistic/shippingOrder.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/login", loginRoutes);

    app.use("/api/configuracao", configuracaoRoutes);

    //Registrations
    app.use("/api/registrations/user", userRoutes);
    app.use("/api/registrations/product", productRoutes);
    app.use("/api/registrations/service", serviceRoutes);
    app.use("/api/registrations/customer", customerRoutes);
    app.use("/api/registrations/supplier", suppliersRoutes);
    app.use("/api/registrations/transportadora", transportadoraRoutes);
    app.use("/api/registrations/funcionario", funcionarioRoutes);


    app.use("/api/contrato", contratoRoutes);
    
    app.use("/api/pedidovenda", pedidoVendaRoutes);

    
    app.use("/api/nfe", nfeRoutes);

    
    //Logistic
    app.use("/api/logistic/shipping-order", shippingOrderRoutes);
    app.use("/api/logistic/trip", shippingOrderRoutes);

    //Financial
    app.use("/api/financial/payment", paymentRoutes);

    app.use("/api/search", searchRoutes);
    
    app.use("/api/search", searchRoutes);


    app.use("/api/pedido-eletronico", pedidoEletronicoRoutes)

  }
}
