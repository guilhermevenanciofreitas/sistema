import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/joy';

export const Header = {
  Height: '52px' 
}

export default function AppBar() {
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
      
      
      <IconButton variant="outlined" color="neutral" size="sm"
        sx={{
          color: '#ffffff',
          marginLeft: {
            xs: '0px',
            md: 'var(--Sidebar-width)',
          }
        }}
      >
        <MenuIcon sx={{color: '#ffffff'}} />
      </IconButton>

      <Typography sx={{ marginLeft: '12px', flexGrow: 1, color: '#ffffff' }}>GK Sistemas<span style={{fontSize: 10}}> v1.2.102</span></Typography>
      <Typography sx={{color: '#ffffff'}}>{JSON.parse(localStorage.getItem("Session") || "null")?.usuario?.nome} | {JSON.parse(localStorage.getItem("Session") || "null")?.empresa?.nomeFantasia}</Typography>
      
    </Sheet>
  );
}
