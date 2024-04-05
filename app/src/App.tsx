import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

//Registrations
import Products from "./views/registrations/products";
import Services from "./views/registrations/services";
import Customers from "./views/registrations/Parceiros/customers";
import Suppliers from "./views/registrations/Parceiros/suppliers";
import Employees from "./views/registrations/Parceiros/employees";
import Transporadoras from "./views/registrations/Parceiros/Transportadoras";

import Usuarios from "./views/registrations/Usuarios/index";





import Contratos from "./views/sales/Contratos";
import PedidoVenda from "./views/sales/Vendas";

import { Login } from "./views/Login";


import NotasFiscais from "./views/fiscal/nfes";



import Receipts from "./views/financial/receipts";
import Andamento from "./views/sales/Andamento";
import Entrega from "./views/sales/Entrega";
import ShippingsOrders from "./views/logistics/shippingsOrders";
import Payments from "./views/financial/payments";

export default class App extends React.Component {
    render(): React.ReactNode {
      return (
        <Routes>
            <Route>
                <Route path="/" element={<RequireLogin><Usuarios /></RequireLogin>} />
                <Route path="/login" element={<Login />} />

                {/* Registrations */}
                <Route path="/registrations/users" element={<Usuarios />} />
                <Route path="/registrations/products" element={<RequireLogin><Products /></RequireLogin>} />
                <Route path="/registrations/services" element={<RequireLogin><Services /></RequireLogin>} />
                <Route path="/registrations/vehicles" element={<RequireLogin><Services /></RequireLogin>} />
                <Route path="/registrations/customers" element={<RequireLogin><Customers /></RequireLogin>} />
                <Route path="/registrations/suppliers" element={<RequireLogin><Suppliers /></RequireLogin>} />
                <Route path="/registrations/employees" element={<RequireLogin><Employees /></RequireLogin>} />
                <Route path="/registrations/shippings-company" element={<RequireLogin><Transporadoras /></RequireLogin>} />

                {/* Sales */}
                <Route path="/sales/orders" element={<RequireLogin><PedidoVenda /></RequireLogin>} />
                <Route path="/sales/progress" element={<RequireLogin><Andamento /></RequireLogin>} />

                {/* Logistics */}
                <Route path="/logistic/shippings-orders" element={<RequireLogin><ShippingsOrders /></RequireLogin>} />

                {/* Financial */}
                <Route path="/financial/receipts" element={<RequireLogin><Receipts /></RequireLogin>} />
                <Route path="/financial/payments" element={<RequireLogin><Payments /></RequireLogin>} />

                {/* Fiscal */}
                <Route path="/fiscal/nfes" element={<RequireLogin><NotasFiscais /></RequireLogin>} />



                <Route path="/contratos" element={<RequireLogin><Contratos /></RequireLogin>} />
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