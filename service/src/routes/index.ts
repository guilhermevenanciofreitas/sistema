import { Application } from "express";

import loginRoutes from "./login/login.routes";

import usuarioRoutes from "./cadastros/usuario.routes";
import clienteRoutes from "./cadastros/cliente.routes";
import fornecedorRoutes from "./cadastros/fornecedor.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/login", loginRoutes);
    app.use("/api/usuario", usuarioRoutes);

    app.use("/api/cliente", clienteRoutes);
    app.use("/api/fornecedor", fornecedorRoutes);
    app.use("/api/transportadora", clienteRoutes);
    app.use("/api/funcionario", clienteRoutes);

  }
}
