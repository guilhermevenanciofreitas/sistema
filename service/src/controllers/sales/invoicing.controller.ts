import { Request, Response } from "express";
import Auth from "../../auth";
import { PaymentForm, Partner, SaleOrder, Product, SaleOrderRecieve, SaleOrderStatus, SaleOrderShippingType, Company, ProductCombination, ProdutoCombinacaoGrupo, ProdutoCombinacaoItem, SaleOrderItemCombination, PedidoVendaItemCombinacaoItem, Nfe } from "../../database";
import { SaleOrderService } from "../../services/sales/saleOrder.service";
import { SaleOrderItem } from "../../database/models/saleOrderItem.model";
import { Error } from "../../errors";
import _ from "lodash";
import { SaleOrderNfe } from "../../database/models/saleOrderNfe.model";

export default class InvoicingController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [['createdAt', 'desc']];

                const statusId = req.body.statusId;
        
                if (statusId != null) {
                    where = [{"statusId": statusId == '' ? null : statusId}];
                }

                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const saleOrders = await SaleOrder.findAndCountAll({
                    attributes: ['id', 'number', 'statusId', 'createdAt', 'valor'],
                    include: [
                        {model: Partner, as: "costumer", attributes: ["id", "nome"]},
                        {model: Company, as: "company", attributes: ["id", "nomeFantasia"]},
                        {model: Partner, as: "seller", attributes: ["id", "nome"]},
                        {model: SaleOrderStatus, attributes: ['id', 'descricao', 'color']}
                    ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction});


                var saleOrderStatus = await SaleOrderStatus.findAll({
                    attributes: ['id', 'descricao', 'color'],
                    include: [{model: SaleOrder, attributes: ['statusId', 'valor']}],
                    order: [['ordem', 'asc']],
                    transaction
                });

                let status = [];

                for (const item of saleOrderStatus) {
                    const sales = _.filter(item.saleOrders, (sale: SaleOrder) => sale.statusId == item.dataValues.id);
                    status.push({
                        ...item.dataValues,
                        quantity: _.size(sales),
                        ammount: _.sum(_.map(sales, (c: SaleOrder) => parseFloat(c?.value?.toString() || "0")))
                    });
                }

                sequelize.close();

                res.status(200).json({
                    request: {
                        statusId, ...pagination
                    },
                    response: {
                        saleOrderStatus: status, rows: saleOrders.rows, count: saleOrders.count
                    }
                });
                
            }
            catch (error: any) {
                Error.Response(res, error);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                let saleOrders = await SaleOrder.findAll({
                    attributes: ['id', 'number', 'value'], 
                    include: [
                        {model: Partner, as: 'costumer', attributes: ['id', 'nome']}
                    ],
                    where: {id: req.body.id}, transaction}
                );

                let orders: any = [];

                for (let item of saleOrders) {

                    var saleOrder: any = {
                        saleOrderId: item.id,
                        number: item.number,
                        costumer: item.costumer?.name,
                        saleOrderNfe: [],
                    };

                    var saleOrderNfe: any = {
                        nfe: {
                            ide: {
                                cUF: "11",
                                cNF: "55354156",
                                natOp: "VENDA PROD.DO ESTABELECIMENTO",
                                mod: "55",
                                serie: "1",
                                nNF: "23734",
                                dhEmi: "2024-02-16T13:14:41-04:00",
                                dhSaiEnt: "2024-02-16T13:14:41-04:00",
                                tpNF: "1",
                                idDest: "3",
                                cMunFG: "1100049",
                                tpImp: "1",
                                tpEmis: "1",
                                cDV: "7",
                                tpAmb: "1",
                                finNFe: "1",
                                indFinal: "1",
                                indPres: "3",
                                indIntermed: "0",
                                procEmi: "0",
                                verProc: "4.00 N:23.4.1"
                            },
                            emit: {
                                CNPJ: "02916265008063",
                                xNome: "JBS S/A",
                                xFant: "JBS S/A",
                                enderEmit: {
                                    xLgr: "Rod  BR 364",
                                    nro: "0",
                                    xCpl: "KM 245",
                                    xBairro: "ZONA RURAL",
                                    cMun: "1100049",
                                    xMun: "CACOAL",
                                    UF: "RO",
                                    CEP: "78976970",
                                    cPais: "1058",
                                    xPais: "BRASIL",
                                    fone: "6933112200"
                                },
                                IE: "00000003048578",
                                CRT: "3"
                            },
                            dest: {
                                xNome: "JBS LEATHER ASIA LIMITED",
                                enderDest: {
                                  xLgr: "FLAT/RM 40&42 10/F, KITEC 1",
                                  nro: "0",
                                  xCpl: "TRADEMART DRIVE",
                                  xBairro: "EXTERIOR",
                                  cMun: "9999999",
                                  xMun: "EXTERIOR",
                                  UF: "EX",
                                  CEP: "00000000",
                                  cPais: "3514",
                                  xPais: "HONG KONG",
                                  fone: "5237103100"
                                },
                                indIEDest: "9"
                            },
                            total: {
                                ICMSTot: {
                                    vBC: "0",
                                    vICMS: "0.00",
                                    vICMSDeson: "0",
                                    vFCPUFDest: "0.00",
                                    vICMSUFDest: "0.00",
                                    vICMSUFRemet: "0.00",
                                    vFCP: "0",
                                    vBCST: "0",
                                    vST: "0.00",
                                    vFCPST: "0",
                                    vFCPSTRet: "0",
                                    qBCMono: "0",
                                    vICMSMono: "0",
                                    qBCMonoReten: "0",
                                    vICMSMonoReten: "0",
                                    qBCMonoRet: "0",
                                    vICMSMonoRet: "0",
                                    vProd: "52466.78",
                                    vFrete: "8370.49",
                                    vSeg: "0",
                                    vDesc: "0",
                                    vII: "0",
                                    vIPI: "0",
                                    vIPIDevol: "0",
                                    vPIS: "0",
                                    vCOFINS: "0",
                                    vOutro: "0",
                                    vNF: "60837.27",
                                    vTotTrib: "16238.47"
                                }
                            },
                            transp: {
                                modFrete: "0",
                                transporta: {
                                    CNPJ: "04058687000681",
                                    xNome: "TCL TRANSPORTE RODOVIARIO COSTA LEMES LTDA",
                                    IE: "00000003645801",
                                    xEnder: "AV NOSSA SENHORA DE FATIMA 2184",
                                    xMun: "GUAJARA MIRIM",
                                    UF: "RO"
                                },
                                vol: {
                                    qVol: "8",
                                    esp: "Pallet",
                                    pesoL: "12761.000",
                                    pesoB: "13361.000",
                                    lacres: {
                                        "nLacre": "LAB191629"
                                    }
                                }
                            },
                            cobr: {
                                fat: {
                                  nFat: "23734",
                                  vOrig: "60837.27",
                                  vDesc: "0.00",
                                  vLiq: "60837.27"
                                },
                                dup: {
                                  nDup: "001",
                                  dVenc: "2024-02-16",
                                  vDup: "60837.27"
                                }
                            },
                            pag: {
                                detPag: {
                                  tPag: "18",
                                  vPag: "60837.27"
                                }
                            }
                        }
                    }

                    saleOrder.saleOrderNfe?.push(saleOrderNfe);

                    orders.push(saleOrder);

                }
    
                sequelize.close();
    
                res.status(200).json(orders);
    
            }
            catch (error: any) {
                Error.Response(res, error);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

    async save(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const SaleOrder = req.body as SaleOrder;

                SaleOrder.value = _.sum(SaleOrder.items?.map(c => parseFloat(c.value?.toString() || '0')));

                const valid = SaleOrderService.IsValid(SaleOrder);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!SaleOrder.id) {
                    await SaleOrderService.Create(SaleOrder, transaction);
                } else {
                    await SaleOrderService.Update(SaleOrder, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(SaleOrder);

            }
            catch (error: any) {
                Error.Response(res, error);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });

    }

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await SaleOrderService.Delete(req.body.id, transaction);

                await transaction?.commit();

                sequelize.close();

                res.status(200).json({success: true});

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

}