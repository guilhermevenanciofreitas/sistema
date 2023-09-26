import { Application } from "express";

import loginRoutes from "./login/login.routes";
import usuarioRoutes from "./cadastros/usuario.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/login", loginRoutes);
    app.use("/api/usuario", usuarioRoutes);
  }
}
