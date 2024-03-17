import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

//Cadastros
import Clientes from "./Views/Cadastros/Parceiros/Clientes";
import Fornecedores from "./Views/Cadastros/Parceiros/Fornecedores";
import Funcionarios from "./Views/Cadastros/Parceiros/Funcionarios";
import Transporadoras from "./Views/Cadastros/Parceiros/Transportadoras";

import Usuarios from "./Views/Cadastros/Usuarios/index";
import Produtos from "./Views/Cadastros/Produtos";
import Servicos from "./Views/Cadastros/Servicos";

import Contratos from "./Views/Comercial/Contratos";
import PedidoVenda from "./Views/Comercial/Vendas";

import { Login } from "./Views/Login";
import NotasFiscais from "./Views/Fiscal/NotaFiscal";
import ContasPagar from "./Views/Financeiro/ContasPagar";
import Andamento from "./Views/Comercial/Andamento";
import Entrega from "./Views/Comercial/Entrega";

export default class App extends React.Component {
    render(): React.ReactNode {
      return (
        <Routes>
            <Route>
                <Route path="/" element={<RequireLogin><Usuarios /></RequireLogin>} />
                <Route path="/login" element={<Login />} />

                <Route path="/clientes" element={<RequireLogin><Clientes /></RequireLogin>} />
                <Route path="/fornecedores" element={<RequireLogin><Fornecedores /></RequireLogin>} />
                <Route path="/funcionarios" element={<RequireLogin><Funcionarios /></RequireLogin>} />
                <Route path="/transporadoras" element={<RequireLogin><Transporadoras /></RequireLogin>} />

                <Route path="/usuarios" element={<Usuarios />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/servicos" element={<Servicos />} />

                <Route path="/contratos" element={<RequireLogin><Contratos /></RequireLogin>} />

                <Route path="/notasfiscais" element={<RequireLogin><NotasFiscais /></RequireLogin>} />

                <Route path="/contaspagar" element={<RequireLogin><ContasPagar /></RequireLogin>} />
                <Route path="/contasreceber" element={<RequireLogin><ContasPagar /></RequireLogin>} />

                
                <Route path="/pedidos" element={<RequireLogin><PedidoVenda /></RequireLogin>} />
                <Route path="/andamento" element={<RequireLogin><Andamento /></RequireLogin>} />
                <Route path="/entrega" element={<RequireLogin><Entrega /></RequireLogin>} />

                <Route path="*" element={<div>Página não encontrada!</div>} />
                
            </Route>
        </Routes>
      );
    }
}

function RequireLogin({ children }: any) {
    
    let navigate = useNavigate();
    let location = useLocation();

    if (!localStorage.getItem("Session")) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    useEffect(() => {
        setInterval(() => {
            if (localStorage.getItem("Session")) {
                const minutes = JSON.parse(localStorage.getItem("Session") || "")?.expiresIn;
                const lastAcess = JSON.parse(localStorage.getItem("Session") || "")?.lastAcess;
                const endAt = new Date(new Date(lastAcess).getTime() + minutes * 60000);
                if (endAt <= new Date()) //Verificar se token ainda e válido
                {
                    localStorage.removeItem("Session");
                    navigate("/login", { replace: true, state: {from: location} });
                }
            } else {
                navigate("/login", { replace: true, state: {from: location} });
            }
        }, 1000);
    })
    
    return children;

}