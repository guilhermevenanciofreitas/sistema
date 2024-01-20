import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MailIcon from '@mui/icons-material/Mail';

let MenuItems = [
    {title: "Cadastros", items: [{title: "Empresas", link: "empresas"}, {title: "Usuários", link: "usuarios"}, {title: "Clientes", link: "clientes"}]},
]

interface NavBarType {
    Status: string
}

export class NavBar extends React.Component<NavBarType> {

    state = {
        open: null,
    }

    protected Open = (Item: string): void =>
    {
        this.setState({open: this.state.open == Item ? null : Item});
    }

    render(): React.ReactNode {
        return (
            <>
                <Toolbar style={{padding: '8px'}}>
                    <img src="https://prium.github.io/phoenix/v1.4.0/assets/img/icons/logo.png" alt="phoenix" width="40" />
                    <span style={{color: 'white', paddingLeft: '18px'}}>Empresa</span>
                </Toolbar>
                <Divider />
                <List sx={{ width: '100%', maxWidth: 260 }} component="nav" aria-labelledby="nested-list-subheader">
                    {MenuItems.map((Item, Key) => {
                        return (
                        <div key={Key}>
                            <ListItemButton onClick={() => this.Open(Item.title)}>
                                <ListItemIcon><MailIcon style={{color: 'white'}} /></ListItemIcon>
                                <ListItemText primary={Item.title} style={{color: 'white'}} /> {this.state.open == Item.title ? <ExpandLess  style={{color: 'white'}} /> : <ExpandMore style={{color: 'white'}} />}
                            </ListItemButton>
                            {this.state.open == Item.title && this.props.Status != "Closed" &&
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                {Item.items.map((SubItem, Key2) => {
                                    return (
                                        <div key={Key2}>
                                            <Link to={SubItem.link} style={{textDecoration: "none"}}>
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon style={{color: 'white'}}><StarBorder /></ListItemIcon>
                                                    <ListItemText primary={SubItem.title} style={{color: 'white'}} />
                                                </ListItemButton>
                                            </Link>
                                        </div>
                                    );
                                })}
                                </List>
                            </Collapse>}
                        </div>
                        )
                    })}
                </List>
            </>
        );
    }
}