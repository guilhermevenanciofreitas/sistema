import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import Sidebar from './SideBar';
import AppBar, { Header } from './AppBar';

export class JoyLayout extends React.Component<Readonly<{children: any}>> {

    render(): React.ReactNode {
        return (
            <CssVarsProvider>
                <CssBaseline />
                <div style={{display: 'flex'}}>

                    <AppBar />
            
                    <Sidebar />

                    <div style={{display: 'flex', flexDirection: 'column', height: '100dvh', width: '100%', gap: '10px', padding: `calc(12px + ${Header.Height}) 20px 10px 20px`}}>
                        {this.props.children}
                    </div>

                </div>
            </CssVarsProvider>
        );
    }

}