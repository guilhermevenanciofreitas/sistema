import { Application } from "express";

import loginRoutes from "./login/login.routes";

import usuarioRoutes from "./cadastros/usuario.routes";
import clienteRoutes from "./cadastros/cliente.routes";
import fornecedorRoutes from "./cadastros/fornecedor.routes";
import produtoRoutes from "./cadastros/produto.routes";
import servicoRoutes from "./cadastros/servico.routes";

import searchRoutes from "./search/index.routes";
import contratoRoutes from "./comercial/contrato.routes";
import contaPagarRoutes from "./financeiro/contaPagar.routes";

import pedidoVendaRoutes from "./comercial/pedidoVenda.routes";
import funcionarioRoutes from "./cadastros/funcionario.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/login", loginRoutes);
    app.use("/api/usuario", usuarioRoutes);

    app.use("/api/cliente", clienteRoutes);
    app.use("/api/fornecedor", fornecedorRoutes);
    app.use("/api/transportadora", clienteRoutes);
    app.use("/api/funcionario", funcionarioRoutes);

    app.use("/api/produto", produtoRoutes);
    app.use("/api/servico", servicoRoutes);


    app.use("/api/contrato", contratoRoutes);
    
    app.use("/api/pedidovenda", pedidoVendaRoutes);

    app.use("/api/contaPagar", contaPagarRoutes);

    app.use("/api/search", searchRoutes);

  }
}
