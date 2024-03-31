import React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Navigate, useNavigate } from 'react-router-dom';
import { CssVarsProvider, extendTheme } from '@mui/joy';
import { Link } from "react-router-dom";
import { ViewConfiguracao } from '../../../Views/Configuracao';
import { render } from 'react-dom';

const MenuItems = [
  {title: "Cadastros", items: [{title: "Usuários", link: "/cadastros/usuarios"}, {title: "Produtos", link: "/cadastros/produtos"}, {title: "Serviços", link: "/cadastros/servicos"}, {title: "Clientes", link: "/cadastros/clientes"}, {title: "Fornecedores", link: "/cadastros/fornecedores"}, {title: "Funcionários", link: "/cadastros/funcionarios"}, {title: "Transportadoras", link: "/cadastros/transportadoras"}]},
  {title: "Atendimento", items: [{title: "Agenda", link: "/atendimento/agenda"}, {title: "Chamados", link: "/atendimento/chamados"}]},
  {title: "Estoque", items: [{title: "Entrada", link: "/estoque/entrada"}]},
  {title: "Compras", items: [{title: "Cotação", link: "/compras/cotação"}, {title: "Pedidos", link: "/compras/pedidos"}]},
  {title: "Vendas", items: [{title: "Pedidos", link: "/vendas/pedidos"}, {title: "Andamento", link: "/vendas/andamento"}, {title: "Faturamento", link: "/vendas/faturamento"}, {title: "Produção", link: "/vendas/producao"}, {title: "Separação", link: "/vendas/separacao"}, {title: "Conferência", link: "/vendas/conferencia"}, {title: "Delivery", link: "/vendas/delivery"}]},
  {title: "Logistica", items: [{title: "Ordem de carga", link: "/logistica/ordem-carga"}, {title: "Viagens", link: "/logistica/viagens"}]},
  {title: "Financeiro", items: [{title: "Contas a pagar", link: "/financeiro/contas-pagar"}, {title: "Contas a receber", link: "/financeiro/contas-receber"}, {title: "Contas bancárias", link: "/financeiro/contas-bancarias"}, {title: "Remessas", link: "/financeiro/remessas"}, {title: "Retornos", link: "/financeiro/retornos"}, {title: "Fluxo de caixa", link: "/financeiro/fluxo-caixa"}]},
  {title: "Fiscal", items: [{title: "Nota fiscais", link: "/fiscal/nota-fiscais"}, {title: "Conhecimentos", link: "/fiscal/conhecimentos"}, {title: "Manifestos", link: "/fiscal/manifestos"}]},
]

export const SidebarWidth = {
  Opened: '220px',
  Closed: '70px'
};

const baseTheme = extendTheme();

const darkOnlyTheme = extendTheme({
  cssVarPrefix: "sidebar_",
  colorSchemes: {
      light: baseTheme.colorSchemes.dark,
      dark: baseTheme.colorSchemes.dark,
  },
});
  
export default class Sidebar extends React.Component {

  state = {
    Open: "",
    Status: "Closed"
  }

  protected ViewConfiguracao = React.createRef<ViewConfiguracao>();

  protected Navigation = (link: string) => {
    const navigate = useNavigate();
    navigate(`/${link}`);
  }

  protected Open = (Item: string) => {
    this.setState({Open: this.state.Open == Item ? '' : Item});
  }

  protected BtnConfiguracao_Click = async () => {

    await this.ViewConfiguracao.current?.Show(JSON.parse(localStorage.getItem("Session") || "null")?.empresa?.id);

  }

  render(): React.ReactNode {
    return (
      <>
        <ViewConfiguracao ref={this.ViewConfiguracao} Title="Configuração" />

        <CssVarsProvider theme={darkOnlyTheme}>

          <Sheet

            onMouseOver={() => this.setState({Status: "Opened"}) /*setStatus("Opened")*/}
            onMouseOut={() => this.setState({Status: "Closed"}) /*setStatus("Closed")*/}

            //className="Sidebar"
            sx={{
              backgroundColor: '#343a40',
              display: {
                xs: 'none', //status == 'Opened' ? 'fixed' : 'none',
                md: 'flex'
              },
              position: {
                xs: 'fixed',
                md: 'sticky' //status == 'Opened' ? 'fixed' : 'sticky',
              },
              //transform: {
              //  xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
              //  md: 'none',
              //},
              //transition: 'transform 0.1s, width 0.1s',
              zIndex: 10000,
              height: '100dvh',
              width: 'var(--Sidebar-width)',
              top: 0, p: 2, flexShrink: 0, flexDirection: 'column', gap: 2, borderRight: '1px solid', borderColor: 'divider',
            }}
          >
            <GlobalStyles styles={(theme) => ({':root': {'--Sidebar-width': this.state.Status == 'Opened' ? '220px' : '70px'}})} />


            <Box 
            //className="Sidebar-overlay"
              sx={{position: 'fixed', zIndex: 9998, top: 0, left: 0, width: '100vw', height: '100vh', opacity: 'var(--SideNavigation-slideIn)',
              backgroundColor: 'var(--joy-palette-background-backdrop)', transition: 'opacity 0.4s',
                transform: {
                  xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                  lg: 'translateX(-100%)',
                },
              }}
            />
          
            <Box
              sx={{
                //minHeight: 0,
                //overflow: 'hidden auto',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                //[`& .${listItemButtonClasses.root}`]: {
                //  gap: 1.5,
                //},
              }}
            >

              <List size="sm" sx={{gap: 1}}>
                <ListItem nested>
                    {MenuItems.map((Item, Key) => {
                        return (
                        <div key={Key}>

                            <ListItemButton onClick={() => this.Open(Item.title)}>
                                <ListItemButton><GroupRoundedIcon/></ListItemButton>
                                {this.state.Status == 'Opened' &&
                                  <>
                                    <ListItemContent >
                                      <Typography level="title-sm">{Item.title}</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon sx={{transform: this.state.Open == Item.title ? 'rotate(180deg)' : 'none' }} />
                                  </>
                                }
                            </ListItemButton>
                            
                            {this.state.Open == Item.title && this.state.Status != "Closed" &&
                              <List sx={{ gap: 0.5 }} style={{paddingLeft: '30px'}}>
                                {Item.items.map((SubItem, Key2) => {
                                  return (
                                    <Link to={SubItem.link} style={{ textDecoration: 'none' }}>
                                      <ListItem key={Key2}>
                                        <ListItemButton>{SubItem.title}</ListItemButton>
                                      </ListItem>
                                    </Link>
                                  );
                                })}
                              </List>
                            }

                        </div>
                        )
                    })}
                </ListItem>
                
              </List>

              <List size="sm" sx={{flexGrow: 0}}>
                <ListItem>
                  <ListItemButton>
                    <SupportRoundedIcon/>
                    {this.state.Status == 'Opened' && "Suporte"}
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton onClick={this.BtnConfiguracao_Click}>
                    <SettingsRoundedIcon/>
                    {this.state.Status == 'Opened' && "Configuração"}
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Sheet>
        </CssVarsProvider>
      </>
    );
  }

}