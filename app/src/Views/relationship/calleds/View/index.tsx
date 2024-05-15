
import { ViewCalledBase } from './index.base';
import { AutoComplete, Button, DatePicker, DropDownList, DropDownListItem, Form, ViewModal, TextBox, Actions, Content } from '../../../../Utils/Controls';
import { EventArgs } from '../../../../Utils/EventArgs';
import { ReactNode } from 'react';
import { Alert, FormLabel, Grid } from '@mui/joy';
import { Search } from '../../../../Search';
import { BankTemplate } from '../../../../Search/Templates/Bank';
import { CompanyTemplate } from '../../../../Search/Templates/Company';
import { CustomerTemplate } from '../../../../Search/Templates/Customer';
import { EmployeeTemplate } from '../../../../Search/Templates/Employee';
import { PartnerTemplate } from '../../../../Search/Templates/Partner';
import { CalledOccurrenceTemplate } from '../../../../Search/Templates/CalledOccurrence';
import { colors } from '..';
import dayjs from 'dayjs';
import _ from 'lodash';
import { TaskAltOutlined } from '@mui/icons-material';
import { color } from '../../../../Utils/color';

export class ViewCalled extends ViewCalledBase {

    public render(): ReactNode {

        return (
            <ViewModal ref={this.ViewModal} Title={this.props.Title} Width={1000}>
                <Content>

                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>

                        <Grid md={2}>
                            <TextBox Label='Número' TextTransform='Normal' Text={this.state.number} OnChange={(args: EventArgs) => this.setState({number: args.Value})} />
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Empresa' Pesquisa={async(Text: string) => await Search.Company(Text)} Text={(Item: any) => `${Item.nomeFantasia}` } Value={this.state.company} OnChange={(company: any) => this.setState({company})}>
                                <CompanyTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Solicitante' Pesquisa={async(Text: string) => await Search.Partner(Text)} Text={(Item: any) => `${Item.nome}` } Value={this.state.partner} OnChange={(partner: any) => this.setState({partner})}>
                                <PartnerTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={2}>
                            <FormLabel sx={{fontWeight: 400}}>Status</FormLabel>
                            <Alert variant="soft" style={{height: '32px'}}>
                                <div style={{display: 'flex', height: 'auto'}}>
                                    <div style={{marginTop: '3px', width: '15px', height: '15px', backgroundColor: this.state.status == null ? colors.open : colors[(this.state.status) as keyof typeof colors], borderRadius: '25px'}}></div>
                                    <div style={{paddingLeft: '8px'}}>
                                        {this.state.status == 'open' ? 'Aberto' : this.state.status == 'closed' ? 'Fechado' : 'Atrasado'}
                                    </div>
                                </div>
                            </Alert>
                        </Grid>

                        <Grid md={4}>
                            <AutoComplete Label='Responsável' Action={{Type: 'Employee', New: {Values: {}}, Edit: {Id: _.get(this.state.responsible, 'id')}}} Pesquisa={async(Text: string) => await Search.Employee(Text)} Text={(Item: any) => `${Item.surname}` } Value={this.state.responsible} OnChange={(responsible: any) => this.setState({responsible})}>
                                <EmployeeTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={4}>
                            <AutoComplete Label='Ocorrência' Pesquisa={async(Text: string) => await Search.CalledOccurrence(Text)} Text={(Item: any) => `${Item.description}` } Value={this.state.occurrence} OnChange={(occurrence: any) =>
                                this.setState({occurrence, createdAt: new Date(), forecast: dayjs().add(occurrence?.day, 'day').add(occurrence?.hour, 'hour').add(occurrence?.minute, 'minute').format()})
                            }>
                                <CalledOccurrenceTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Abertura' TextTransform='Normal' Text={this.state.createdAt} ReadOnly={true} />
                        </Grid>
                        <Grid md={2}>
                            <TextBox Label='Previsão de fechar' TextTransform='Normal' Text={this.state.forecast || ''} ReadOnly={true} />
                        </Grid>

                        <div style={{width: '100%'}}>
                            <Grid md={2}>
                                <DropDownList Label='Prioridade' SelectedValue={this.state.priority} OnChange={(args: EventArgs) => this.setState({priority: args.Value})}>
                                    <DropDownListItem Label='[Selecione]' Value={null} />
                                    <DropDownListItem Label='Baixa' Value={1} />
                                    <DropDownListItem Label='Média' Value={2} />
                                    <DropDownListItem Label='Alta' Value={3} />
                                </DropDownList>
                            </Grid>
                        </div>
                        
                        <Grid md={12}>
                            <TextBox Label='Assunto' TextTransform='Normal' Text={this.state.subject} OnChange={(args: EventArgs) => this.setState({subject: args.Value})} />
                        </Grid>
                        
                    </Grid>

                </Content>
                <Actions>
                    <Button Text='Salvar' StartIcon={<TaskAltOutlined />} Color='white' BackgroundColor={color.success} OnClick={this.BtnSalvar_Click} />
                </Actions>
            </ViewModal>
        );

    }

}