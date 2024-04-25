import { Request, Response } from "express";
import Auth from "../../auth";
import { BankAccount, Company, PaymentForm, Municipio, Partner, SaleOrderShippingType, Product, ProductCategory, ProductCombination, ProdutoCombinacaoGrupo, ProdutoCombinacaoItem, TabelaPreco, CalledOccurrence, FreightCalculationType, MesoRegion, State } from "../../database";
import { Op } from "sequelize";
import { Bank } from "../../database/models/bank.model";

export default class SearchController {

    async company(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                if (req.body?.Search) {
                    where = {"surname": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const companies = await Company.findAll({attributes: ["id", "cpfCnpj", "surname"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(companies);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async tabelasPreco(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const tabelasPreco = await TabelaPreco.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(tabelasPreco);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async partner(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                if (req.body?.Search) {
                    where = {"surname": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const clientes = await Partner.findAll({attributes: ["id", "cpfCnpj", "surname"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(clientes);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async costumer(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                where = {"isCostumer": true};

                if (req.body?.Search) {
                    where = {"surname": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const clientes = await Partner.findAll({attributes: ["id", "cpfCnpj", "surname", "isBlockSale"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(clientes);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async employee(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                where = {"isEmployee": true};

                if (req.body?.Search) {
                    where = {"surname": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const clientes = await Partner.findAll({attributes: ["id", "cpfCnpj", "surname"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(clientes);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async product(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                if (req.body?.Search) {
                    where = {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const produtos = await Product.findAll({attributes: ["id", "name"],
                    include: [{model: ProductCombination, attributes: ["id", "isObrigatorio", "minimo", "maximo", "ordem"],
                        include: [{model: ProdutoCombinacaoGrupo, attributes: ["id", "descricao"],
                            include: [{model: ProdutoCombinacaoItem, attributes: ["id", "nome"]}]    
                        }]
                    }],
                    where,
                    order: [["name", "asc"]], transaction
                });
        
                sequelize.close();

                res.status(200).json(produtos);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async municipio(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"nome": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                if (req.body?.estadoId) {
                    where = {"estadoId": {[Op.eq]: req.body?.estadoId}};
                }
        
                const municipios = await Municipio.findAll({attributes: ["id", "nome"], where, order: [["nome", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(municipios);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async bank(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const formaPagamentos = await Bank.findAll({attributes: ["id", "description"], 
                where,
                order: [["description", "asc"]],
                transaction});
        
                sequelize.close();

                res.status(200).json(formaPagamentos);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async bankAccount(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                //    where = {"bank.description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const formaPagamentos = await BankAccount.findAll({attributes: ["id", "agency", "agencyDigit", "account", "accountDigit"], 
                include: [{model: Bank, attributes: ["id", "description"]}],
                where,
                //order: [["bank.description", "asc"]],
                transaction});
        
                sequelize.close();

                res.status(200).json(formaPagamentos);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async paymentForm(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const paymentForm = await PaymentForm.findAll({attributes: ["id", "description", "type"], where, order: [["description", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(paymentForm);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async saleOrderShippingType(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const tipoEntregas = await SaleOrderShippingType.findAll({attributes: ["id", "description"], where, order: [["description", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(tipoEntregas);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async productCategory(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const produtoCategoria = await ProductCategory.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(produtoCategoria);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async produtoCombinacaoGrupo(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const produtoCombinacaoGrupo = await ProdutoCombinacaoGrupo.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(produtoCombinacaoGrupo);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async calledOccurrence(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const calledOccurrences = await CalledOccurrence.findAll({attributes: ['id', 'description', 'day', 'hour', 'minute'], 
                where,
                order: [["description", "asc"]],
                transaction});
        
                sequelize.close();

                res.status(200).json(calledOccurrences);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async freightCalculationType(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const freightCalculationTypes = await FreightCalculationType.findAll({
                    attributes: ['id', 'description'], 
                    where,
                    order: [["description", "asc"]],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(freightCalculationTypes);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async mesoRegion(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const regions = await MesoRegion.findAll({
                    attributes: ['id', 'description'], 
                    include: [{model: State, attributes: ['id', 'acronym']}],
                    where,
                    order: [["description", "asc"]],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(regions);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }
}