import { Request, Response } from "express";
import Auth from "../../auth";
import { BankAccount, Company, PaymentForm, City, Partner, SaleOrderShippingType, Product, ProductCategory, ProductCombination, ProductCombinationGroup, ProductCombinationItem, CalledOccurrence, FreightCalculationType, MesoRegion, State, ReceivieForm, Vehicle, ProductPrice, StockLocation, Nfe } from "../../database";
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

    async productPrice(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                if (req.body?.Search) {
                    where = {'description': {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const productPrice = await ProductPrice.findAll({attributes: ['id', 'description'], where, order: [['description', "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(productPrice);

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
        
                const costumers = await Partner.findAll({attributes: ["id", "cpfCnpj", "surname", "isBlockSale"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(costumers);

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
        
                const employees = await Partner.findAll({attributes: ["id", "cpfCnpj", "surname"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(employees);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async supplier(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                where = {"isSupplier": true};

                if (req.body?.Search) {
                    where = {"surname": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const suppliers = await Partner.findAll({attributes: ["id", "cpfCnpj", "surname"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(suppliers);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async shippingCompany(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                where = {"isShippingCompany": true};

                if (req.body?.Search) {
                    where = {"surname": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const shippingCompanies = await Partner.findAll({attributes: ["id", "cpfCnpj", "surname"], where, order: [["surname", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(shippingCompanies);

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
                    where = {'name': {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const products = await Product.findAll({attributes: ['id', 'name', 'value'],
                    include: [{model: ProductCombination, attributes: ['id', 'isObrigatorio', 'minimo', 'maximo', 'ordem'],
                        include: [{model: ProductCombinationGroup, attributes: ['id', 'description'],
                            include: [{model: ProductCombinationItem, attributes: ['id', 'name']}]    
                        }]
                    }],
                    where,
                    order: [['name', 'asc']],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(products);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async city(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                if (req.body?.stateId) {
                    where = {"stateId": {[Op.eq]: req.body?.stateId}};
                }
        
                const cities = await City.findAll({attributes: ['id', 'name'], where, order: [['name', 'asc']], transaction});
        
                sequelize.close();

                res.status(200).json(cities);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async state(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const states = await State.findAll({attributes: ['id', 'description'], where, order: [['description', 'asc']], transaction});
        
                sequelize.close();

                res.status(200).json(states);

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

    async receivieForm(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const receivieForm = await ReceivieForm.findAll({attributes: ["id", "description", "type"], where, order: [["description", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(receivieForm);

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
                    where = {"description": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const productCategory = await ProductCategory.findAll({attributes: ["id", "description"], where, order: [["description", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(productCategory);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async productCombinationGroup(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {'description': {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const productCombinationGroup = await ProductCombinationGroup.findAll({attributes: ['id', 'description'], where, order: [['description', 'asc']], transaction});
        
                sequelize.close();

                res.status(200).json(productCombinationGroup);

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

    async vehicle(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const vehicles = await Vehicle.findAll({
                    attributes: ['id', 'name', 'plate'], 
                    include: [],
                    where,
                    order: [["plate", "asc"]],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(vehicles);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async stockLocation(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const stockLocations = await StockLocation.findAll({
                    attributes: ['id', 'name', 'description'], 
                    include: [],
                    where,
                    order: [["name", "asc"]],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(stockLocations);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async nfe(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const nfes = await Nfe.findAll({
                    attributes: [
                        'id',
                        'NFe',
                        'protNFe'
                    ], 
                    include: [],
                    where,
                    //order: [["name", "asc"]],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(nfes);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

}