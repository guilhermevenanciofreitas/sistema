import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MainLayoutBase } from "./base";
import AccountMenu from "./AccountMenu";
import { NavBar } from "./NavBar";

export class MainLayout extends MainLayoutBase {

    protected Menu_Click = (): void =>
    {
        switch(this.state.Menu.Status) {
            case "Closed":
                this.setState({Menu: { Status: 'Fixed' }});
                break;
            case "Fixed":
                this.setState({Menu: { Status: 'Closed' }});
                break;
        }
    }

    protected NavBar_Mouse = (Status: string): void =>
    {
        if (this.state.Menu.Status != 'Fixed') {
            this.setState({Menu: { Status: Status }});
        }
    }

    render(): React.ReactNode {
        return (
            <Box sx={{ display: 'flex', minHeight: '100dvh' }}>

            </Box>
        )
    }

    render1(): React.ReactNode {
        return (
            <Box sx={{ display: 'flex' }}>
                <AppBar position="fixed" sx={{ zIndex: 1, width: { sm: `calc(100% - ${this.state.Menu.Status == 'Fixed' ? this.props.Menu?.Width?.Open : this.props.Menu?.Width?.Closed}px)` } }}>
                    <Toolbar>
                        <IconButton color="inherit" edge="start" onClick={this.Menu_Click}>{this.state.Menu.Status == 'Fixed' ? <ChevronLeftIcon /> : <MenuIcon />}</IconButton>
                        <Typography variant="h6" sx={{ marginLeft: '12px', flexGrow: 1 }}>{this.props.Title}</Typography>
                        <Typography>{JSON.parse(localStorage.getItem("Session") || "null")?.usuario.nome} | {JSON.parse(localStorage.getItem("Session") || "null")?.empresa.nomeFantasia}</Typography>
                        {/*<Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" sx={{ marginLeft: '12px', width: 40, height: 40 }} />*/}
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
                <Box sx={{ zIndex: 1, width: { sm: this.state.Menu.Status == 'Fixed' ? this.props.Menu?.Width?.Open : this.props.Menu?.Width?.Closed }}}>
                    
                    
                    <Drawer variant="temporary" open={this.state.Menu.Status == 'Fixed'} onClose={() => this.Menu_Click()} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: this.props.Menu?.Width?.Open }}}>
                        <div style={{backgroundColor: '#222834', height: '100%'}}>
                            <NavBar Status={this.state.Menu.Status} />
                        </div>
                    </Drawer>

                    <Drawer variant="permanent" open={true} sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: this.state.Menu.Status == 'Opened' || this.state.Menu.Status == 'Fixed' ? this.props.Menu?.Width?.Open : this.props.Menu?.Width?.Closed } }} onMouseOver={() => this.NavBar_Mouse("Opened")} onMouseOut={() => this.NavBar_Mouse("Closed")}>
                        <div style={{backgroundColor: '#222834', height: '100%', overflow: 'hidden'}}>
                            <NavBar Status={this.state.Menu.Status} />
                        </div>
                    </Drawer>
                   
                </Box>
                <Box sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${this.props.Menu?.Width?.Open}px)` } }}>
                    {this.props.children}
                </Box>
            </Box>
        );
    }
}