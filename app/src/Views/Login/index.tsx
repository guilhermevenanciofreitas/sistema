import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Form, TextBox, PasswordBox, Button, DropDownList, DropDownListItem, MessageBox } from "../../Utils/Controls";
import { EventArgs } from "../../Utils/EventArgs";
import { Service } from "../../Service";
import { Layout } from "./layout";
import { Box, Checkbox, FormControl, Link, Stack } from "@mui/joy";

//const navigate = useNavigate();
//const location = useLocation();
//const from = (location.state?.from?.pathname || "/") + (location.state?.from?.search || "");

export class ViewLogin extends React.Component<Readonly<{from: string}>> {

  state = {

    step: "login",

    email: "guilherme9180@gmail.com",
    password: "@Rped94ft",
    accountId: "",
    companyId: "",

    accounts: [],
    empresas: []
  }

  protected DplAccount_Change = async (accountId: string) => {
    this.setState({accountId, empresas: []});
    await this.Signin(this.state.email, this.state.password, accountId, this.state.companyId)
  }

  protected DplEmpresa_Change = async (companyId: string) => {
    this.setState({companyId, empresas: []});
    await this.Signin(this.state.email, this.state.password, this.state.accountId, companyId);
  }

  protected Signin = async (email: string, password: string, accountId: string, companyId: string) => {
    try {
      
      const signin = await Service.Post("login/signin", {email: email, password: password, accountId: accountId, companyId: companyId});

      if (signin?.status == 203) {
        await MessageBox.Show({title: "Info", width: 400, type: "Warning", content: signin.data.message, buttons: [{ Text: "OK" }]});
      }

      if (signin?.status == 200) {
        localStorage.setItem("Session", JSON.stringify(signin?.data));
        window.location.href = `${this.props.from}`;
      }

      if (signin?.status == 201) {
        this.setState({step: 'account', accounts: signin?.data});
      }

      if (signin?.status == 202) {
        this.setState({step: 'empresa', empresas: signin?.data});
      }
      
    } catch (err: any) {
      alert(err);
    }
  }

  render(): React.ReactNode {
    
    return (
      <Layout>

        <Form OnSubmit={() => this.Signin(this.state.email, this.state.password, this.state.accountId, this.state.companyId)}>

          {this.state.step == "login" &&
          <>
            <FormControl>
              <TextBox Label='E-mail' TextTransform='Normal' Text={this.state.email} OnChange={(args: EventArgs) => this.setState({email: args.Value})} />
            </FormControl>
            
            <FormControl>
              <PasswordBox Label='Senha' Text={this.state.password} OnChange={(args: EventArgs) => this.setState({password: args.Value})} />
            </FormControl>
          </>
          }

          {(this.state.accounts?.length || 0) >= 1 &&
            <DropDownList Label='Conta' SelectedValue={this.state.accountId} OnChange={(args: any) => this.DplAccount_Change(args.Value)}>
              <DropDownListItem Label="[Selecione]" Value="" />
              {this.state.accounts.map((Item: any, Key) => {
                return <DropDownListItem Label={Item.name} Value={Item.id} key={Key} />
              })}
            </DropDownList>
          }
          {(this.state.empresas?.length || 0) >= 1 &&
            <DropDownList Label='Empresa' SelectedValue={this.state.companyId} OnChange={(args: any) => this.DplEmpresa_Change(args.Value)}>
              <DropDownListItem Label="[Selecione]" Value="" />
              {this.state.empresas.map((Item: any, Key) => {
                return <DropDownListItem Label={Item.nomeFantasia} Value={Item.id} key={Key} />
              })}
            </DropDownList>
          }

          {this.state.step == "login" && (
            <Stack gap={4} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Checkbox size="sm" label="Lembrar" name="persistent" />
                <Link level="title-sm" href="#replace-with-a-link">
                  Esqueceu sua senha?
                </Link>
              </Box>
              <Button Type="Submit" Text="Entrar" />
            </Stack>
          )}
          
        </Form>

      </Layout>
    );

  }

}

export function Login() {

  const location = useLocation();
  const from = (location.state?.from?.pathname || "/") + (location.state?.from?.search || "");

  if (localStorage.getItem("Session")) {
    return <Navigate to="/" replace />
  }

  return (
    <ViewLogin from={from}></ViewLogin>
  );

}

