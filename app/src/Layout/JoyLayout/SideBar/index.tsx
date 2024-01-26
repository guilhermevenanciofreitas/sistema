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

const MenuItems = [
  {title: "Cadastros", items: [{title: "Empresas", link: "empresas"}, {title: "Usuários", link: "usuarios"}, {title: "Clientes", link: "clientes"}]},
]

export const SidebarWidth = {
  Opened: '220px',
  Closed: '70px'
};

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
                          <ListItemButton><GroupRoundedIcon sx={{color: '#ffffff'}}/></ListItemButton>
                          {status == 'Opened' &&
                            <>
                              <ListItemContent >
                                <Typography level="title-sm" sx={{color: '#ffffff'}}>{Item.title}</Typography>
                              </ListItemContent>
                              <KeyboardArrowDownIcon sx={{color: '#ffffff', transform: open == Item.title ? 'rotate(180deg)' : 'none' }} />
                            </>
                          }
                      </ListItemButton>
                      
                      {open == Item.title && status != "Closed" &&
                        <List sx={{ gap: 0.5 }} style={{paddingLeft: '30px'}}>
                          {Item.items.map((SubItem, Key2) => {
                            return (
                              <a href={SubItem.link}>
                                <ListItem key={Key2}>
                                  <ListItemButton sx={{color: '#ffffff'}}>{SubItem.title}</ListItemButton>
                                </ListItem>
                              </a>
                              
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
            <ListItemButton sx={{color: '#ffffff'}}>
              <SupportRoundedIcon sx={{color: '#ffffff'}}/>
              {status == 'Opened' && "Suporte"}
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{color: '#ffffff'}}>
              <SettingsRoundedIcon sx={{color: '#ffffff'}}/>
              {status == 'Opened' && "Configuração"}
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

    </Sheet>
  );
}
