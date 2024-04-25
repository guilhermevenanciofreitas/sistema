import Sheet from '@mui/joy/Sheet';
import { Typography } from '@mui/joy';
import { Component, ReactNode } from 'react';

export const Header = {
  Height: '52px' 
}

export default class AppBar extends Component {

  render(): ReactNode {
    return (
      <Sheet sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'fixed', top: 0, width: '100vw', height: Header.Height,
          zIndex: 9995,
          p: 2,
          gap: 1,
          borderBottom: '1px solid',
          borderColor: 'background.level1',
          boxShadow: 'sm',
          backgroundColor: '#007bff'
        }}
      >

        <Typography sx={{flexGrow: 1, color: '#ffffff', marginLeft: { xs: '0px', md: 'var(--Sidebar-width)'}}}>GK Sistemas<span style={{fontSize: 10}}> v1.2.102</span></Typography>
        <Typography sx={{color: '#ffffff'}}>{JSON.parse(localStorage.getItem("Session") || "null")?.user?.name} | {JSON.parse(localStorage.getItem("Session") || "null")?.company?.surname}</Typography>
        
      </Sheet>
    );
  }

}