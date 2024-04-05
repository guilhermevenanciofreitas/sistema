import { Application } from "express";

import loginRoutes from "./login/login.routes";

import configuracaoRoutes from "./configuracao/index.routes"

import usuarioRoutes from "./registrations/usuario.routes";
import clienteRoutes from "./registrations/cliente.routes";
import fornecedorRoutes from "./registrations/fornecedor.routes";
import produtoRoutes from "./registrations/product.routes";
import servicoRoutes from "./registrations/servico.routes";

import searchRoutes from "./search/index.routes";
import contratoRoutes from "./comercial/contrato.routes";
import contaPagarRoutes from "./financeiro/contaPagar.routes";

import pedidoVendaRoutes from "./comercial/pedidoVenda.routes";
import funcionarioRoutes from "./registrations/funcionario.routes";
import transportadoraRoutes from "./registrations/transportadora.routes";

import pedidoEletronicoRoutes from "./pedido-eletronico/index.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/login", loginRoutes);

    app.use("/api/configuracao", configuracaoRoutes);

    app.use("/api/usuario", usuarioRoutes);

    app.use("/api/cliente", clienteRoutes);
    app.use("/api/fornecedor", fornecedorRoutes);
    app.use("/api/transportadora", transportadoraRoutes);
    app.use("/api/funcionario", funcionarioRoutes);

    app.use("/api/produto", produtoRoutes);
    app.use("/api/servico", servicoRoutes);


    app.use("/api/contrato", contratoRoutes);
    
    app.use("/api/pedidovenda", pedidoVendaRoutes);

    app.use("/api/contaPagar", contaPagarRoutes);

    app.use("/api/search", searchRoutes);
    
    app.use("/api/search", searchRoutes);


    app.use("/api/pedido-eletronico", pedidoEletronicoRoutes)

  }
}
