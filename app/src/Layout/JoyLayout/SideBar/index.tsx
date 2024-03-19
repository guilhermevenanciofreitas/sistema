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

export default function Sidebar() {

  const [status, setStatus] = React.useState('Closed');
  const [open, setOpen] = React.useState('');

  function Navigation(link: string) {
    const navigate = useNavigate();
    navigate(`/${link}`);
  }

  function Open(Item: string) {
    setOpen(open == Item ? '' : Item);
  }

  return (
    <CssVarsProvider theme={darkOnlyTheme}>
      <Sheet

        onMouseOver={() => setStatus("Opened")}
        onMouseOut={() => setStatus("Closed")}

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
        <GlobalStyles styles={(theme) => ({':root': {'--Sidebar-width': status == 'Opened' ? '220px' : '70px'}})} />


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

                        <ListItemButton onClick={() => Open(Item.title)}>
                            <ListItemButton><GroupRoundedIcon/></ListItemButton>
                            {status == 'Opened' &&
                              <>
                                <ListItemContent >
                                  <Typography level="title-sm">{Item.title}</Typography>
                                </ListItemContent>
                                <KeyboardArrowDownIcon sx={{transform: open == Item.title ? 'rotate(180deg)' : 'none' }} />
                              </>
                            }
                        </ListItemButton>
                        
                        {open == Item.title && status != "Closed" &&
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
                {status == 'Opened' && "Suporte"}
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <SettingsRoundedIcon/>
                {status == 'Opened' && "Configuração"}
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Sheet>
    </CssVarsProvider>
  );
}

/*
import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import LinearProgress from '@mui/joy/LinearProgress';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import BrightnessAutoRoundedIcon from '@mui/icons-material/BrightnessAutoRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CssVarsProvider, extendTheme } from '@mui/joy';

//import ColorSchemeToggle from './ColorSchemeToggle';
//import { closeSidebar } from '../utils';

const baseTheme = extendTheme();

const darkOnlyTheme = extendTheme({
  cssVarPrefix: "sidebar_",
  colorSchemes: {
      light: baseTheme.colorSchemes.dark,
      dark: baseTheme.colorSchemes.dark,
  },
});

export const SidebarWidth = {
  Opened: '220px',
  Closed: '70px'
};

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {

  const [status, setStatus] = React.useState('Closed');
  const [open, setOpen] = React.useState('');

  return (
    <CssVarsProvider theme={darkOnlyTheme}>
      <Sheet

            onMouseOver={() => setStatus("Opened")}
            onMouseOut={() => setStatus("Closed")}

            

            className="Sidebar"
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

              transform: {
                xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                md: 'none',
              },
              transition: 'transform 0.4s, width 0.4s',
              zIndex: 10000,
              height: '100dvh',
              width: 'var(--Sidebar-width)',
              top: 0,
              p: 2,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              borderRight: '1px solid',
              borderColor: 'divider',
            }}
          >
            <GlobalStyles
              styles={(theme) => ({
                ':root': {
                  '--Sidebar-width': '220px',
                  [theme.breakpoints.up('lg')]: {
                    '--Sidebar-width': '240px',
                  },
                },
              })}
            />
            <Box
              className="Sidebar-overlay"
              sx={{
                position: 'fixed',
                zIndex: 9998,
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                opacity: 'var(--SideNavigation-slideIn)',
                backgroundColor: 'var(--joy-palette-background-backdrop)',
                transition: 'opacity 0.4s',
                transform: {
                  xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
                  lg: 'translateX(-100%)',
                },
              }}
              //onClick={() => closeSidebar()}
            />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BrightnessAutoRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Acme Co.</Typography>
            </Box>
            <Box
              sx={{
                minHeight: 0,
                overflow: 'hidden auto',
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                [`& .${listItemButtonClasses.root}`]: {
                  gap: 1.5,
                },
              }}
            >
              <List
                size="sm"
                sx={{
                  gap: 1,
                  '--List-nestedInsetStart': '30px',
                  '--ListItem-radius': (theme) => theme.vars.radius.sm,
                }}
              >
                <ListItem>
                  <ListItemButton>
                    <HomeRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Home</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton>
                    <DashboardRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Dashboard</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/order-dashboard/"
                  >
                    <ShoppingCartRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Orders</Typography>
                    </ListItemContent>
                  </ListItemButton>
                </ListItem>
                <ListItem nested>
                  <Toggler
                    renderToggle={({ open, setOpen }) => (
                      <ListItemButton onClick={() => setOpen(!open)}>
                        <AssignmentRoundedIcon />
                        <ListItemContent>
                          <Typography level="title-sm">Tasks</Typography>
                        </ListItemContent>
                        <KeyboardArrowDownIcon
                          sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{ gap: 0.5 }}>
                      <ListItem sx={{ mt: 0.5 }}>
                        <ListItemButton>All tasks</ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>Backlog</ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>In progress</ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>Done</ListItemButton>
                      </ListItem>
                    </List>
                  </Toggler>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    role="menuitem"
                    component="a"
                    href="/joy-ui/getting-started/templates/messages/"
                  >
                    <QuestionAnswerRoundedIcon />
                    <ListItemContent>
                      <Typography level="title-sm">Messages</Typography>
                    </ListItemContent>
                    <Chip size="sm" color="primary" variant="solid">
                      4
                    </Chip>
                  </ListItemButton>
                </ListItem>
                <ListItem nested>
                  <Toggler
                    defaultExpanded
                    renderToggle={({ open, setOpen }) => (
                      <ListItemButton onClick={() => setOpen(!open)}>
                        <GroupRoundedIcon />
                        <ListItemContent>
                          <Typography level="title-sm">Users</Typography>
                        </ListItemContent>
                        <KeyboardArrowDownIcon
                          sx={{ transform: open ? 'rotate(180deg)' : 'none' }}
                        />
                      </ListItemButton>
                    )}
                  >
                    <List sx={{ gap: 0.5 }}>
                      <ListItem sx={{ mt: 0.5 }}>
                        <ListItemButton selected>My profile</ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>Create a new user</ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>Roles & permission</ListItemButton>
                      </ListItem>
                    </List>
                  </Toggler>
                </ListItem>
              </List>
              <List
                size="sm"
                sx={{
                  mt: 'auto',
                  flexGrow: 0,
                  '--ListItem-radius': (theme) => theme.vars.radius.sm,
                  '--List-gap': '8px',
                  mb: 2,
                }}
              >
                <ListItem>
                  <ListItemButton>
                    <SupportRoundedIcon />
                    Support
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>
                    <SettingsRoundedIcon />
                    Settings
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
            <Divider />
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Avatar
                variant="outlined"
                size="sm"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
              />
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography level="title-sm">Siriwat K.</Typography>
                <Typography level="body-xs">siriwatk@test.com</Typography>
              </Box>
              <IconButton size="sm" variant="plain" color="neutral">
                <LogoutRoundedIcon />
              </IconButton>
            </Box>
          </Sheet>
    </CssVarsProvider>
  );
}
*/