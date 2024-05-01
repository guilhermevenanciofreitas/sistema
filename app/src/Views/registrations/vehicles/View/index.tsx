
import { ViewProductBase } from './index.base';
import { AutoComplete, Button, CheckBox, Form, Modal, Tab, TabItem, TextBox, NumericBox } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Grid } from '@mui/joy';
import { ProductCategoryTemplate } from '../../../../Search/Templates/ProductCategory';
import { Search } from '../../../../Search';

export class ViewVehicle extends ViewProductBase {

    public Close = () => this.setState({open: false});
    
    public render(): ReactNode {

        return (
            <Modal Open={this.state.open} Title={this.props.Title} Width={1000} Close={() => this.Close()}>
                <Form OnSubmit={this.BtnSalvar_Click} OnReset={this.BtnLimpar_Click}>

                    <Button Text='Salvar' Type='Submit' Color='white' BackgroundColor='green' />
                    <Button Text='Limpar' Type='Reset' Color='white' BackgroundColor='gray' />

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={8}>
                            <TextBox Label='Nome' TextTransform='UpperCase' Text={this.state.name} OnChange={(args: EventArgs) => this.setState({name: args.Value})} />
                        </Grid>
                        <Grid md={4}>
                            <TextBox Label='Placa' TextTransform='UpperCase' Text={this.state.plate} OnChange={(args: EventArgs) => this.setState({plate: args.Value})} />
                        </Grid>

                        <Grid md={12}>
                            
                            <Tab>
                                <TabItem Title='Principal' Visible={true}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Combinação' Visible={true}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Composição' Visible={true}>
                                    <></>
                                </TabItem>
                                <TabItem Title='Fornecedores' Visible={true}>
                                    <></>
                                </TabItem>
                            </Tab>
                           
                        </Grid>
                        
                    </Grid>

                </Form>
            </Modal>
        );

    }

}
