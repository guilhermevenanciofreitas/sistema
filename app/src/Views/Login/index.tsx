import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Form, TextBox, Button, DropDownList, DropDownListItem } from "../../Utils/Controls";
import { EventArgs } from "../../Utils/EventArgs";
import { Service } from "../../Service";

export function Login() {

  if (localStorage.getItem("Session")) {
    return <Navigate to="/" replace />
  }

  let [email, setEmail] = React.useState("guilherme9180@gmail.com");
  let [password, setPassword] = React.useState("@Rped94ft");
  let [accountId, setAccount] = React.useState("");
  let [empresaId, setEmpresa] = React.useState("");

  let [step, setStep] = React.useState('login');

  let [accounts, setAccounts] = React.useState([]);
  let [empresas, setEmpresas] = React.useState([]);
  

  let navigate = useNavigate();
  let location = useLocation();

  let from = (location.state?.from?.pathname || "/") + (location.state?.from?.search || "");

  async function DplAccount_Change(accountId: string) {
    setAccount(accountId);
    setEmpresas([]);
    await Signin(email, password, accountId, empresaId)
  }

  async function DplEmpresa_Change(empresaId: string) {
    setEmpresa(empresaId);
    await Signin(email, password, accountId, empresaId)
  }

  async function Signin(email: string, password: string, accountId: string, empresaId: string) {
    try {
      
      const signin = await Service.Post("login/signin", {email: email, password: password, accountId: accountId, empresaId: empresaId});

      if (signin?.status == 200) {
        localStorage.setItem("Session", JSON.stringify(signin?.data));
        navigate(from, { replace: true });
      }

      if (signin?.status == 201) {
        setStep('account');
        setAccounts(signin?.data);
      }

      if (signin?.status == 202) {
        setStep('empresa');
        setEmpresas(signin?.data);
      }
      
    } catch (err: any) {
      alert(err);
    }
  }

  return (
    <div>

      <p>Step: {step}</p>

      <p>You must log in to view the page at {from}</p>

        <Form OnSubmit={() => Signin(email, password, accountId, empresaId)}>

          {step == "login" &&
          <>
            <TextBox Label='E-mail' TextTransform='Normal' Text={email} OnChange={(args: EventArgs) => setEmail(args.Value)} />
            <TextBox Label='Senha' TextTransform='Normal' Text={password} OnChange={(args: EventArgs) => setPassword(args.Value)} />
          </>
          }

          {(accounts?.length || 0) >= 1 &&
            <DropDownList Label='Conta' SelectedValue={accountId} OnChange={(args: any) => DplAccount_Change(args.Value)}>
              <DropDownListItem Label="[Selecione]" Value="" />
              {accounts.map((Item: any, Key) => {
                return <DropDownListItem Label={Item.name} Value={Item.id} key={Key} />
              })}
            </DropDownList>
          }
          {(empresas?.length || 0) >= 1 &&
            <DropDownList Label='Empresa' SelectedValue={empresaId} OnChange={(args: any) => DplEmpresa_Change(args.Value)}>
              <DropDownListItem Label="[Selecione]" Value="" />
              {empresas.map((Item: any, Key) => {
                return <DropDownListItem Label={Item.nomeFantasia} Value={Item.id} key={Key} />
              })}
            </DropDownList>
          }

          {step == "login" && <Button Type="Submit" Text="Entrar" />}
          
        </Form>
      
    </div>
  );

}