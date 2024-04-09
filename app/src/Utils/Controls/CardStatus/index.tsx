import { AttachMoney } from "@mui/icons-material";
import { Badge, Card, CardContent, Typography } from "@mui/joy";
import React from "react";
import { CardStatusBase } from "./index.base";

export class CardStatus extends CardStatusBase {

    protected Card_Click = async (): Promise<void> =>
    {
        if (this.props.OnClick != undefined)
        {
            await this.props.OnClick();
        }
    }
    
    render(): React.ReactNode {
        
        return (
            <Card color="neutral" invertedColors style={{backgroundColor: this.props.checked ? "aliceblue" : "white", border: this.props.checked ? "1px solid #007bff" : "", padding: '5px', cursor: 'pointer'}} onClick={this.Card_Click}>
                <CardContent orientation="horizontal">
                    <div style={{paddingLeft: '20px', alignContent: 'center', alignItems: 'center'}}>
                        <div style={{backgroundColor: this.props.color, width: '12px', height: '12px'}}></div>
                    </div>
                    <CardContent>
                    <Typography level="body-md">{this.props.status}</Typography>
                    <Typography level="h4"><AttachMoney style={{fontSize: 14}} /> {this.props.value?.toLocaleString("pt-BR", {minimumFractionDigits: 2})}</Typography>
                    <Badge color={this.props.checked ? "primary" : "neutral"} badgeContent={this.props.bagde?.toString()} style={{marginRight: '20px'}}></Badge>
                    </CardContent>
                </CardContent>
            </Card>
        );

    }

}