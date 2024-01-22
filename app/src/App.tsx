import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

//Cadastros
import Clientes from "./Views/Cadastros/Clientes";
import Fornecedores from "./Views/Cadastros/Fornecedores";
import Usuarios from "./Views/Cadastros/Usuarios/index";

import { Login } from "./Views/Login";


export default class App extends React.Component {
    render(): React.ReactNode {
      return (
        <Routes>
            <Route>
                <Route path="/" element={<RequireLogin><Usuarios /></RequireLogin>} />
                <Route path="/login" element={<Login />} />

                <Route path="/clientes" element={<RequireLogin><Clientes /></RequireLogin>} />
                <Route path="/fornecedores" element={<RequireLogin><Fornecedores /></RequireLogin>} />

                <Route path="/usuarios" element={<Usuarios />} />

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