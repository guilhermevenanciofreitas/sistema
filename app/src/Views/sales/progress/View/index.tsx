
import { ViewSaleOrderStatusBase } from './index.base';
import { AutoComplete, Button, DatePicker, Form, ViewModal, TextBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { BankTemplate } from '../../../../Search/Templates/Bank';

export class ViewSaleOrderStatus extends ViewSaleOrderStatusBase {
 
    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={500}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
          
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={10}>
                            <TextBox Label='Descrição' TextTransform='Normal' Text={this.state.descricao} OnChange={(args: EventArgs) => this.setState({descricao: args.Value})} />
                        </Grid>
                        <Grid md={2}>
                            <label>Cor</label>
                            <input type='color' value={this.state.color} onChange={(args: any) => this.setState({color: args.target.value})} />
                        </Grid>
                    </Grid>

                </Form>
            </ViewModal>
        );

    }

}