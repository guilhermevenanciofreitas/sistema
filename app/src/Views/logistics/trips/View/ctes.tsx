import React, { ReactNode } from "react";
import { AutoComplete, Button, CheckBox, GridView, ViewModal, TextBox, Content, Actions, ButtonSplit } from "../../../../Utils/Controls";
import { BaseDetails } from "../../../../Utils/Base/details";
import { Search } from "../../../../Search";
import { Grid } from "@mui/joy";
import { NfeTemplate } from "../../../../Search/Templates/Nfe";
import _ from "lodash";
import { color } from "../../../../Utils/color";
import { AddCircleOutline, CheckCircleOutlined } from "@mui/icons-material";
import { ShippingOrderTemplate } from "../../../../Search/Templates/ShippingOrder";
import dayjs from "dayjs";
import { Service } from "../../../../Service";

const Columns = [
    { selector: (row: any) => row.cte?.CTe?.infCte?.rem?.xNome, name: 'Remetente' },
    { selector: (row: any) => row.cte?.CTe?.infCte?.dest?.xNome, name: 'Destinatário' },
    { selector: (row: any) => _.size(row.cte?.CTe?.infCte?.infCTeNorm?.infDoc?.infNFe), name: 'NFes', minWidth: '50px', maxWidth: '50px' },
];

class ViewShippingOrder extends React.Component {

    private Columns = [
        { selector: (row: any) => row.nfe?.NFe?.infNFe?.ide?.nNF, name: 'Numero', minWidth: '80px', maxWidth: '80px' },
        { selector: (row: any) => row.nfe?.NFe?.infNFe?.ide?.serie, name: 'Série', minWidth: '60px', maxWidth: '60px' },
        { selector: (row: any) => dayjs(row.nfe?.NFe?.infNFe?.ide?.dhEmi).format('DD/MM/YYYY HH:MM'), name: 'Emissão', minWidth: '135px', maxWidth: '135px' },
        { selector: (row: any) => row.nfe?.NFe?.infNFe?.emit?.xNome, name: 'Remetente' },
        { selector: (row: any) => row.nfe?.NFe?.infNFe?.dest?.xNome, name: 'Destinatário' },
    ];

    protected ViewModal = React.createRef<ViewModal>();

    state = {
        id: '',
        shippingOrder: null,
        nfes: []
    }

    public Show = async (item?: any): Promise<any> =>
    {

        this.setState({...item});

        return await this.ViewModal.current?.Show();

    }

    protected GenerateCTe = () => {

        let infQ = [];
        let infNFe = [];

        for (const nfe of this.state.nfes) {
            infQ.push({'cUnid': '01', 'tpMed': 'PESO BRUTO', 'qCarga': _.get(nfe, 'NFe.infNFe.transp.vol.pesoB')});
            infNFe.push({'chave': _.get(nfe, 'protNFe.infProt.chNFe')});
        }
        
        /*
        const cte = {
            'CTe': {
                'infCte': {
                    'rem': {
                        'CNPJ': _.get(this.state.shippingOrder, 'sender.cpfCnpj'),
                        'IE': _.get(this.state.shippingOrder, 'sender.ie'),
                        'xNome': _.get(this.state.shippingOrder, 'sender.name'),
                        'enderReme': {
                            'xLgr': _.get(this.state.shippingOrder, 'sender.address.logradouro'),
                            'nro': _.get(this.state.shippingOrder, 'sender.address.number'),
                            'xBairro': _.get(this.state.shippingOrder, 'sender.address.neighborhood'),
                            'cMun': "5208707",
                            'xMun': "GOIANIA",
                            'UF': "GO"
                        }
                    },
                    'dest': {
                        'CNPJ': _.get(this.state.shippingOrder, 'recipient.cpfCnpj'),
                        'IE': _.get(this.state.shippingOrder, 'recipient.ie'),
                        'xNome': _.get(this.state.shippingOrder, 'recipient.name'),
                        'enderDest': {
                            'xLgr': _.get(this.state.shippingOrder, 'recipient.address.logradouro'),
                            'nro': _.get(this.state.shippingOrder, 'recipient.address.number'),
                            'xBairro': _.get(this.state.shippingOrder, 'recipient.address.neighborhood'),
                            'cMun': "2611606",
                            'xMun': "RECIFE",
                            'UF': "PE"
                        }
                    },
                    'vPrest': {
                        'vTPrest': _.get(this.state.shippingOrder, 'value'),
                        'vRec': _.get(this.state.shippingOrder, 'value'),
                        'Comp': [
                            {
                                'xNome': 'FRETE VALOR',
                                'vComp': _.get(this.state.shippingOrder, 'value')
                            }
                        ]
                    },
                    'imp': {
                        'ICMS': {
                            'ICMS00': {
                                'CST': '00',
                                'vBC': _.get(this.state.shippingOrder, 'value'),
                                'pICMS': '12.00',
                                'vICMS': _.toString((parseFloat(_.toString(_.get(this.state.shippingOrder, 'value'))) / 100) * 12)
                            }
                        }
                    },
                    'infCTeNorm': {
                        'infCarga': {
                            'vCarga': _.toString(_.sum(infQ.map((c) => parseFloat(c.qCarga)))),
                            'proPred': _.get(this.state.shippingOrder, 'predominantProduct'),
                            'infQ': infQ
                        },
                        'infDoc': {
                            'infNFe': infNFe
                        },
                        "infModal": {
                            "$": {
                                "versaoModal": "4.00"
                            },
                            "rodo": {
                                "RNTRC": "01289328"
                            }
                        }
                    },
                    "autXML": {
                        "CNPJ": "04898488000177"
                    }
                }
            }
        }
        */

        const cte = {
            "CTe": {
                "$": {
                    "xmlns": "http://www.portalfiscal.inf.br/cte"
                },
                "infCte": {
                    "ide": {
                        "cUF": "52",
                        "cCT": "00100673",
                        "CFOP": "6353",
                        "natOp": "SERVICO DE TRANSPORTE",
                        "mod": "57",
                        "serie": "1",
                        "nCT": "100673",
                        "dhEmi": "2024-05-11T18:55:15-03:00",
                        "tpImp": "1",
                        "tpEmis": "1",
                        "cDV": "0",
                        "tpAmb": "1",
                        "tpCTe": "0",
                        "procEmi": "0",
                        "verProc": "1.0",
                        "cMunEnv": "5208707",
                        "xMunEnv": "GOIANIA",
                        "UFEnv": "GO",
                        "modal": "01",
                        "tpServ": "0",
                        "cMunIni": "5208707",
                        "xMunIni": "GOIANIA",
                        "UFIni": "GO",
                        "cMunFim": "2602902",
                        "xMunFim": "CABO DE SANTO AGOSTINHO",
                        "UFFim": "PE",
                        "retira": "1",
                        "indIEToma": "1",
                        "toma3": {
                            "toma": "0"
                        }
                    },
                    "emit": {
                        "CNPJ": "04058687000177",
                        "IE": "103317244",
                        "xNome": "TCL TRANSPORTE RODOVIARIO COSTA LEMES LTDA",
                        "xFant": "TCL TRANSPORTE RODOVIARIO COSTA LEMES LTDA",
                        "enderEmit": {
                            "xLgr": "RUA 02 QD A LT 09",
                            "nro": "541",
                            "xBairro": "CHACARA RETIRO",
                            "cMun": "5208707",
                            "xMun": "GOIANIA",
                            "CEP": "74665834",
                            "UF": "GO"
                        },
                        "CRT": "3"
                    },
                    "rem": {
                        "CNPJ": "22137853000102",
                        "IE": "106375571",
                        "xNome": "Coty Brasil Comercio S.A",
                        "enderReme": {
                            "xLgr": "RUA IZA COSTA MODULO I",
                            "nro": "1104",
                            "xBairro": "FAZENDA RETIRO",
                            "cMun": "5208707",
                            "xMun": "GOIANIA",
                            "UF": "GO"
                        }
                    },
                    "dest": {
                        "CNPJ": "01206820001179",
                        "IE": "024439703",
                        "xNome": "PANPHARMA DISTRIBUIDORA DE MEDICAMENTOS LTDA",
                        "enderDest": {
                            "xLgr": "ROD BR 101 SUL",
                            "nro": "3640",
                            "xBairro": "DO BARRO",
                            "cMun": "2611606",
                            "xMun": "RECIFE",
                            "UF": "PE"
                        }
                    },
                    "vPrest": {
                        "vTPrest": "15263.85",
                        "vRec": "15263.85",
                        "Comp": [
                            {
                                "xNome": "FRETE VALOR",
                                "vComp": "14650.24"
                            },
                            {
                                "xNome": "PEDAGIO",
                                "vComp": "90.04"
                            },
                            {
                                "xNome": "gRIS",
                                "vComp": "523.57"
                            }
                        ]
                    },
                    "imp": {
                        "ICMS": {
                            "ICMS00": {
                                "CST": "00",
                                "vBC": "15263.85",
                                "pICMS": "12.00",
                                "vICMS": "1831.66"
                            }
                        }
                    },
                    "infCTeNorm": {
                        "infCarga": {
                            "vCarga": "460743.54",
                            "proPred": "COSMETICOS",
                            "infQ": [
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "3.8880"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "5.9280"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "12.3840"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "8.5900"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "559.9800"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "117.4080"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "16.9520"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "1010.1720"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "94.6900"
                                },
                                {
                                    "cUnid": "01",
                                    "tpMed": "PESO BRUTO",
                                    "qCarga": "9513.7170"
                                }
                            ]
                        },
                        "infDoc": {
                            "infNFe": [
                                {
                                    "chave": "52240522137853000102550020009400611249874440"
                                },
                                {
                                    "chave": "52240522137853000102550020009400621799405858"
                                },
                                {
                                    "chave": "52240522137853000102550020009400821504765435"
                                },
                                {
                                    "chave": "52240522137853000102550020009401311515309017"
                                },
                                {
                                    "chave": "52240522137853000102550020009401761364120540"
                                },
                                {
                                    "chave": "52240522137853000102550020009401771676241570"
                                },
                                {
                                    "chave": "52240522137853000102550020009401781733756135"
                                },
                                {
                                    "chave": "52240522137853000102550020009401791521013845"
                                },
                                {
                                    "chave": "52240522137853000102550020009401801752264658"
                                },
                                {
                                    "chave": "52240522137853000102550020009401941473168569"
                                }
                            ]
                        },
                        "infModal": {
                            "$": {
                                "versaoModal": "4.00"
                            },
                            "rodo": {
                                "RNTRC": "01289328"
                            }
                        }
                    },
                    "autXML": {
                        "CNPJ": "04898488000177"
                    }
                }
            }
        }

        return {cte};

    }

    protected BtnConfirmar_Click = async () => this.ViewModal.current?.Close(this.GenerateCTe());

    render(): React.ReactNode {
        return (
            <ViewModal ref={this.ViewModal} Title='CTe' Width={800}>
                <Content>
                    <Grid container spacing={1} sx={{ flexGrow: 1 }}>
                        <Grid md={12}>
                            <AutoComplete Label='Ordem de carga' Pesquisa={async(Text: string) => await Search.ShippingOrder(Text)} Text={(Item: any) => `${Item.sender?.surname} / ${Item.sender?.cpfCnpj}`} Value={this.state.shippingOrder} OnChange={(shippingOrder: any) => this.setState({shippingOrder})}>
                                <ShippingOrderTemplate />
                            </AutoComplete>
                        </Grid>
                        <Grid md={12}>
                            <GridView Columns={this.Columns} Rows={_.get(this.state.shippingOrder, 'nfes')} OnSelected={(args: any) => this.setState({nfes: _.map(args.selectedRows, (c) => c.nfe)})} />
                        </Grid>
                    </Grid>
                </Content>
                <Actions>
                    <Button Text='Confirmar' StartIcon={<CheckCircleOutlined />} Color={'white'} BackgroundColor={color.success} OnClick={this.BtnConfirmar_Click} />
                </Actions>
            </ViewModal>
        );
    }

}

export class Ctes extends BaseDetails<Readonly<{ctes: any[], OnChange?: Function | any}>> {

    protected ViewShippingOrder = React.createRef<ViewShippingOrder>();

    protected BtnAdicionar_Click = async () => {

        const item = await this.ViewShippingOrder.current?.Show({
            id: '',
            shippingOrder: null,
            nfes: [],
        });

        if (item == null) return;

        this.props.ctes.push({...item});
        this.props.OnChange(this.props.ctes);

    }

    protected GridView_OnItem = async (args: any) =>
    {

        //const item = await this.ViewCte.current?.Show({...args});
        //if (item == null) return;
        //args.supplier = item.supplier;
        //this.props.OnChange(this.props.ctes);
       
    }

    protected BtnEnviar_Click = async () => {

        const request = {
            ids: _.map(this.state.Selecteds, (c: any) => c.cte.id)
        }

        let response = await Service.Post("logistic/trip/emission", request);

        console.log(response);

    };

    protected BtnRemover_Click = () => this.props.OnChange(this.Remover(this.props.ctes));
    
    protected GridView_Selected = (args: any) => this.props.OnChange(this.Selected(args.selectedRows, this.props.ctes));

    render(): ReactNode {
        return (
            <>
                <ViewShippingOrder ref={this.ViewShippingOrder} />
                {_.size(this.state.Selecteds) == 0 && <Button Text='Adicionar' Color='white' BackgroundColor={color.success} StartIcon={<AddCircleOutline />} OnClick={this.BtnAdicionar_Click} />}
                {_.size(this.state.Selecteds) >= 1 && <Button Text='Remover' Color='white' BackgroundColor={color.danger} StartIcon={<AddCircleOutline />} OnClick={this.BtnRemover_Click} />}
                {_.size(this.state.Selecteds) >= 1 && <Button Text='Enviar' Color='white' BackgroundColor={color.primary} StartIcon={<AddCircleOutline />} OnClick={this.BtnEnviar_Click} />}
                <GridView Columns={Columns} Rows={this.props.ctes} OnItem={this.GridView_OnItem} OnSelected={this.GridView_Selected} />
            </>
        )
    }

}