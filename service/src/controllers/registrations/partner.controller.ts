import { Request, Response } from "express";
import Auth from "../../auth";
import { Partner, PartnerContact, PartnerAddress, ProductPrice, EconomicActivity, LegalNature, City } from "../../database";
import { PartnerService } from "../../services/registrations/partner.service";
import {Op} from "sequelize";
import axios from "axios";
import { EconomicActivityService } from "../../services/registrations/economicActivity.service";
import _, { includes } from "lodash";
import { CepService } from "../../services/cep/index.service";
import { Error } from "../../errors";

export default class PartnerController {

    async findAll(req: Request, res: Response, column: string) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try
            {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];

                where = {[column]: true};
        
                /*
                if (filter?.cpfCnpj) {
                    where = {"cpfCnpj": {[Op.iLike]: `%${filter?.cpfCnpj.replace(' ', "%")}%`}};
                }

                if (filter?.name) {
                    where = {"name": {[Op.iLike]: `%${filter?.name.replace(' ', "%")}%`}};
                }
        
                if (filter?.surname) {
                    where = {"surname": {[Op.iLike]: `%${filter?.surname}%`}};
                }
                */
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const partners = await Partner.findAndCountAll({
                    attributes: ['id', 'cpfCnpj', 'name', 'surname'],
                    where,
                    order,
                    limit: pagination.limit,
                    offset: pagination.offset1,
                    transaction
                });
                
                sequelize.close();

                res.status(200).json({
                    request: {
                        ...pagination
                    },
                    response: {
                        rows: partners.rows, count: partners.count
                    }
                });

            }
            catch (error: any)
            {
                Error.Response(res, error);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async findOne(req: Request, res: Response, column: string) {

        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                const where = {id: req.body.id, [column]: true};

                const partner = await Partner.findOne({
                    attributes: [
                        'id',
                        'cpfCnpj',
                        'name',
                        'surname',
                        'isCustomer',
                        'isSupplier',
                        'isShippingCompany',
                        'isEmployee',
                        'birth',
                        'sex',
                        'maritalStatus',
                        'rg',
                        'ie',
                        'im',
                        'scholarity',
                        'profession',
                        'naturalness',
                        'nationality',
                        'address',
                        'isActive',
                        'isBlockSale',
                        'isBlockBuy',
                    ],
                    include: [
                        {model: PartnerContact, as: 'contacts', attributes: ['id', 'name', 'phone', 'email']},
                        //{model: City, identifier: '', as: 'city', attributes: ['id', 'name']},
                        //{model: PartnerAddress, as: 'address', attributes: ["id", "cep", "logradouro", "numero", "complemento", "bairro"]}
                    ],
                    where,
                    transaction
                });
    
                res.status(200).json(partner);

                sequelize.close();

            }
            catch (error: any)
            {
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

                const Parceiro = req.body as Partner;

                Parceiro.cpfCnpj = req.body.cpfCnpj?.replace(/[^0-9]/g,'');
               
                const valid = PartnerService.IsValid(Parceiro);
    
                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }
    
                if (!Parceiro.id) {
                    await PartnerService.Create(Parceiro, transaction);
                } else {
                    await PartnerService.Update(Parceiro, transaction);
                }
    
                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Parceiro);

            }
            catch (error: any)
            {
                Error.Response(res, error);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

    /*
    {
        "abertura": "15/07/1968",
        "situacao": "ATIVA",
        "tipo": "MATRIZ",
        "nome": "UNILEVER BRASIL LTDA.",
        "porte": "DEMAIS",
        "natureza_juridica": "206-2 - Sociedade Empresária Limitada",
        "atividade_principal": [
            {
                "code": "46.46-0-02",
                "text": "Comércio atacadista de produtos de higiene pessoal"
            }
        ],
        "atividades_secundarias": [
            {
                "code": "46.37-1-06",
                "text": "Comércio atacadista de sorvetes"
            },
            {
                "code": "46.37-1-99",
                "text": "Comércio atacadista especializado em outros produtos alimentícios não especificados anteriormente"
            },
            {
                "code": "46.39-7-01",
                "text": "Comércio atacadista de produtos alimentícios em geral"
            },
            {
                "code": "46.49-4-08",
                "text": "Comércio atacadista de produtos de higiene, limpeza e conservação domiciliar"
            },
            {
                "code": "46.49-4-99",
                "text": "Comércio atacadista de outros equipamentos e artigos de uso pessoal e doméstico não especificados anteriormente"
            },
            {
                "code": "59.11-1-02",
                "text": "Produção de filmes para publicidade"
            },
            {
                "code": "62.02-3-00",
                "text": "Desenvolvimento e licenciamento de programas de computador customizáveis"
            },
            {
                "code": "62.09-1-00",
                "text": "Suporte técnico, manutenção e outros serviços em tecnologia da informação"
            },
            {
                "code": "70.20-4-00",
                "text": "Atividades de consultoria em gestão empresarial, exceto consultoria técnica específica"
            },
            {
                "code": "73.12-2-00",
                "text": "Agenciamento de espaços para publicidade, exceto em veículos de comunicação"
            },
            {
                "code": "73.19-0-04",
                "text": "Consultoria em publicidade"
            },
            {
                "code": "74.90-1-04",
                "text": "Atividades de intermediação e agenciamento de serviços e negócios em geral, exceto imobiliários"
            },
            {
                "code": "74.90-1-99",
                "text": "Outras atividades profissionais, científicas e técnicas não especificadas anteriormente"
            },
            {
                "code": "77.40-3-00",
                "text": "Gestão de ativos intangíveis não-financeiros"
            },
            {
                "code": "78.10-8-00",
                "text": "Seleção e agenciamento de mão-de-obra"
            },
            {
                "code": "82.11-3-00",
                "text": "Serviços combinados de escritório e apoio administrativo"
            },
            {
                "code": "85.99-6-04",
                "text": "Treinamento em desenvolvimento profissional e gerencial"
            }
        ],
        "qsa": [
            {
                "nome": "RICARDO ZUCCOLLO",
                "qual": "05-Administrador"
            },
            {
                "nome": "RICARDO FONSECA MARQUES",
                "qual": "05-Administrador"
            },
            {
                "nome": "LUCIANA PAGANATO RODRIGUES",
                "qual": "05-Administrador"
            },
            {
                "nome": "GERARDO HUGO ROZANSKI",
                "qual": "05-Administrador"
            },
            {
                "nome": "RODRIGO RUSSO SPENA VISENTINI",
                "qual": "05-Administrador"
            },
            {
                "nome": "RODRIGO LOPEZ SANROMAN",
                "qual": "05-Administrador"
            },
            {
                "nome": "MARCELO TOLEDO PORANGABA COSTA",
                "qual": "05-Administrador"
            },
            {
                "nome": "LUIS HENRIQUE GONCALVES DENTE",
                "qual": "05-Administrador"
            },
            {
                "nome": "THAIS AGNELLO HAGGE DE ANDRADE",
                "qual": "05-Administrador"
            },
            {
                "nome": "BRAZINVEST B.V.",
                "qual": "37-Sócio Pessoa Jurídica Domiciliado no Exterior",
                "pais_origem": "PAÍSES BAIXOS (HOLANDA)",
                "nome_rep_legal": "LUCIANO MARTIN WISZNIEWSKI",
                "qual_rep_legal": "17-Procurador"
            },
            {
                "nome": "NURIA HERNANDEZ CRESPO",
                "qual": "05-Administrador"
            },
            {
                "nome": "JOAO FRANCISCO RIBEIRO",
                "qual": "05-Administrador"
            }
        ],
        "logradouro": "AV DAS NACOES UNIDAS",
        "numero": "14261",
        "complemento": "ANDAR 3 AO 6 BLOCO ALA B",
        "municipio": "SAO PAULO",
        "bairro": "VILA GERTRUDES",
        "uf": "SP",
        "cep": "04.794-000",
        "email": "fiscal.jk1@unilever.com",
        "telefone": "(11) 3703-7675",
        "data_situacao": "03/11/2005",
        "cnpj": "61.068.276/0001-04",
        "ultima_atualizacao": "2024-05-10T16:59:56.059Z",
        "status": "OK",
        "fantasia": "",
        "efr": "",
        "motivo_situacao": "",
        "situacao_especial": "",
        "data_situacao_especial": "",
        "capital_social": "728064585.00",
        "extra": {},
        "billing": {
            "free": true,
            "database": true
        }
    }
    */
    async consult(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {

            const cnpj = req.body.cnpj.replace(/[^0-9]/g, '');

            const response = await axios.get(`https://receitaws.com.br/v1/cnpj/${cnpj}`);

            const transaction = await sequelize.transaction();


            const code = response.data.natureza_juridica.substring(0, 5);

            let legalNature = await LegalNature.findOne({
                attributes: ['id', 'code', 'name'],
                where: {
                    code: code,
                },
                transaction
            });


            const cnae = response.data.atividade_principal[0]?.code.replace(/[^0-9]/g, '');

            let economicActivity = await EconomicActivity.findOne({
                attributes: ['id', 'cnae', 'name'],
                where: {
                    cnae: cnae,
                },
                transaction
            });

            if (economicActivity == null) {
                economicActivity = new EconomicActivity({cnae: cnae, name: _.toUpper(response.data.atividade_principal[0]?.text)});
                await EconomicActivityService.Create(economicActivity.dataValues, transaction);
            }

            const cep = await CepService.Consult(response.data.cep.replace(/[^0-9]/g, ''), transaction);

            await transaction?.commit();

            sequelize.close();

            res.status(200).json({
                name: response.data.nome,
                surname: response.data.fantasia || response.data.nome,
                abertura: response.data.abertura,
                legalNature: legalNature?.dataValues,
                economicActivity: economicActivity?.dataValues,
                address: {
                    cep: response.data.cep.replace(/[^0-9]/g, ''),
                    logradouro: _.toUpper(response.data.logradouro),
                    number: _.toUpper(response.data.numero),
                    complement: _.toUpper(response.data.complemento),
                    neighborhood: _.toUpper(response.data.bairro),
                    city: cep?.city,
                    state: cep?.state
                }
            });

        }).catch((err) => {
            res.status(500).json(err);
        });
       
    }

    /*
    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({transaction}) => {

            await UsuarioService.Delete(req.body.id, transaction);

            transaction?.commit();

            res.status(200).json({success: true});

        }).catch((err) => {
            res.status(401).json(err);
        });

    }
    */

}