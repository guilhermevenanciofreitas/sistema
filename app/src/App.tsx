import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

//Registrations
import Clientes from "./views/registrations/Parceiros/Clientes";
import Fornecedores from "./views/registrations/Parceiros/Fornecedores";
import Funcionarios from "./views/registrations/Parceiros/Funcionarios";
import Transporadoras from "./views/registrations/Parceiros/Transportadoras";

import Usuarios from "./views/registrations/Usuarios/index";
import Produtos from "./views/registrations/Produtos";
import Servicos from "./views/registrations/Servicos";

import Contratos from "./views/Comercial/Contratos";
import PedidoVenda from "./views/Comercial/Vendas";

import { Login } from "./views/Login";
import NotasFiscais from "./views/Fiscal/NotaFiscal";
import ContasPagar from "./views/Financeiro/ContasPagar";
import Andamento from "./views/Comercial/Andamento";
import Entrega from "./views/Comercial/Entrega";

export default class App extends React.Component {
    render(): React.ReactNode {
      return (
        <Routes>
            <Route>
                <Route path="/" element={<RequireLogin><Usuarios /></RequireLogin>} />
                <Route path="/login" element={<Login />} />

                {/* Registrations */}
                <Route path="/registrations/users" element={<Usuarios />} />
                <Route path="/registrations/products" element={<RequireLogin><Produtos /></RequireLogin>} />
                <Route path="/registrations/services" element={<Servicos />} />
                <Route path="/registrations/vehicles" element={<Servicos />} />
                <Route path="/registrations/customers" element={<RequireLogin><Clientes /></RequireLogin>} />
                <Route path="/registrations/suppliers" element={<RequireLogin><Fornecedores /></RequireLogin>} />
                <Route path="/registrations/employees" element={<RequireLogin><Funcionarios /></RequireLogin>} />
                <Route path="/registrations/shippings-company" element={<RequireLogin><Transporadoras /></RequireLogin>} />


                <Route path="/contratos" element={<RequireLogin><Contratos /></RequireLogin>} />

                <Route path="/notasfiscais" element={<RequireLogin><NotasFiscais /></RequireLogin>} />

                <Route path="/contaspagar" element={<RequireLogin><ContasPagar /></RequireLogin>} />
                <Route path="/contasreceber" element={<RequireLogin><ContasPagar /></RequireLogin>} />

                
                <Route path="/vendas/pedidos" element={<RequireLogin><PedidoVenda /></RequireLogin>} />
                <Route path="/vendas/andamento" element={<RequireLogin><Andamento /></RequireLogin>} />

                <Route path="/vendas/delivery" element={<RequireLogin><Entrega /></RequireLogin>} />

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