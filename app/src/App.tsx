import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

//Registrations
import Products from "./views/registrations/products";
import Services from "./views/registrations/services";
import Customers from "./views/registrations/partners/customers";
import Suppliers from "./views/registrations/partners/suppliers";
import Employees from "./views/registrations/partners/employees";
import ShippingsCompany from "./views/registrations/partners/shippingsCompany";

import Usuarios from "./views/registrations/users/index";





import Contracts from "./views/sales/contracts";
import Orders from "./views/sales/orders";

import { Login } from "./views/Login";


import NotasFiscais from "./views/fiscal/nfes";



//import Receipts from "./views/financial/receipts";
import Andamento from "./views/sales/progress";
import Entrega from "./views/sales/delivery";
import ShippingsOrders from "./views/logistics/shippingsOrders";
import Payments from "./views/financial/payments";
import BankAccounts from "./views/financial/bankAccounts";
import Shippings from "./views/financial/shippings";
import Calleds from "./views/relationship/calleds";
import FreightCalculations from "./views/logistics/freightCalculations";
import FreightQuotes from "./views/logistics/freightQuotes";
import Invoicing from "./views/sales/invoicing";

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
                <Route path="/registrations/shippings-company" element={<RequireLogin><ShippingsCompany /></RequireLogin>} />

                {/* Relationship */}
                <Route path="/relationships/calleds" element={<RequireLogin><Calleds /></RequireLogin>} />


                {/* Sales */}
                <Route path="/sales/orders" element={<RequireLogin><Orders /></RequireLogin>} />
                <Route path="/sales/progress" element={<RequireLogin><Andamento /></RequireLogin>} />
                <Route path="/sales/invoicing" element={<RequireLogin><Invoicing /></RequireLogin>} />

                {/* Logistics */}
                <Route path="/logistic/freight-calculations" element={<RequireLogin><FreightCalculations /></RequireLogin>} />
                <Route path="/logistic/freight-quotes" element={<RequireLogin><FreightQuotes /></RequireLogin>} />
                <Route path="/logistic/shippings-orders" element={<RequireLogin><ShippingsOrders /></RequireLogin>} />

                {/* Financial */}
                <Route path="/financial/payments" element={<RequireLogin><Payments /></RequireLogin>} />
                {/*<Route path="/financial/receipts" element={<RequireLogin><Receipts /></RequireLogin>} />*/}
                <Route path="/financial/bank-accounts" element={<RequireLogin><BankAccounts /></RequireLogin>} />
                <Route path="/financial/shippings" element={<RequireLogin><Shippings /></RequireLogin>} />

                {/* Fiscal */}
                <Route path="/fiscal/nfes" element={<RequireLogin><NotasFiscais /></RequireLogin>} />



                <Route path="/contratos" element={<RequireLogin><Contracts /></RequireLogin>} />
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