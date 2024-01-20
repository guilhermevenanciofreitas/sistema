import React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';

import Typography from '@mui/joy/Typography';

import Sidebar from './SideBar';
import AppBar, { Header } from './AppBar';

export class JoyLayout extends React.Component<Readonly<{children: any}>> {

    render(): React.ReactNode {
        return (
            <CssVarsProvider disableTransitionOnChange>
                <CssBaseline />
                <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        
                    <AppBar />
            
                    <Sidebar />
        
                    <Box component="main" className="MainContent"
                        sx={{
                        px: 4,
                        pt: `calc(12px + ${Header.Height})`,
                        pb: 2,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: 0,
                        height: '100dvh',
                        gap: 1,
                        }}
                        >
            
                        
                        
                        {this.props.children}
                        
                    </Box>
                    
                </Box>
            </CssVarsProvider>
        );
    }

}