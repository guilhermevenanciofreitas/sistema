import { Request, Response } from "express";
import Auth from "../../auth";
import { BankAccount, Company, PaymentForm, City, Partner, SaleOrderShippingType, Product, ProductCategory, ProductCombination, ProductCombinationItem, CalledOccurrence, FreightCalculationType, MesoRegion, State, ReceivieForm, Vehicle, ProductPrice, StockLocation, Nfe, ProductSupplier, MeasurementUnit, EconomicActivity, LegalNature, Combination, StockIn, ProductSubCategory, ShippingOrder, ShippingOrderNfe } from "../../database";
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

    async customer(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                where = {"isCustomer": true};

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
                    include: [{model: ProductCombination, attributes: ['id', 'isRequired', 'min', 'max', 'order'],
                        //include: [{model: ProductCombinationGroup, attributes: ['id', 'description'],
                        //    include: [{model: ProductCombinationItem, attributes: ['id', 'name']}]    
                        //}]
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
        
                const cities = await City.findAll({
                    attributes: ['id', 'name'],
                    where, order: [['name', 'asc']],
                    transaction
                });
        
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

    async productSubCategory(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {'name': {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                if (req.body?.categoryId) {
                    where = {"categoryId": {[Op.eq]: req.body?.categoryId}};
                }

                const productSubCategory = await ProductSubCategory.findAll({
                    attributes: ['id', 'name'],
                    where,
                    order: [['name', 'asc']],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(productSubCategory);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async combination(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {'name': {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const combinations = await Combination.findAll({attributes: ['id', 'name'], where, order: [['name', 'asc']], transaction});
        
                sequelize.close();

                res.status(200).json(combinations);

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
                    include: [
                        {model: StockIn, as: 'stockIns', attributes: ['id']}
                    ],
                    where,
                    //order: [["name", "asc"]],
                    transaction
                });

                var response: any[] = [];

                for (const nfe of nfes) {

                    let emit = null;

                    if (nfe?.NFe?.infNFe?.emit?.CNPJ) {
                        emit = await Partner.findOne({
                            attributes: ['id', 'surname'],
                            where: {cpfCnpj: nfe?.NFe?.infNFe?.emit?.CNPJ}, 
                            include: [{model: ProductSupplier, as: 'products', attributes: ['id', 'code', 'contain'],
                                include: [
                                    {model: Product, as: 'product', attributes: ['id', 'name']},
                                    {model: MeasurementUnit, as: 'measurementUnit', attributes: ['id', 'name']}
                                ]
                            }],
                            transaction
                        });
                    }

                    let enderEmit = null;

                    if (nfe?.NFe?.infNFe?.emit?.enderEmit?.cMun) {
                        const city = await City.findOne({
                            attributes: ['id', 'name'],
                            where: {ibge: nfe?.NFe?.infNFe?.emit?.enderEmit?.cMun}, 
                            include: [
                                {model: State, as: 'state', attributes: ['id', 'description']}
                            ],
                            transaction
                        });

                        enderEmit = {
                            city: {
                                id: city?.id,
                                name: city?.name
                            },
                            state: {
                                id: city?.state?.id,
                                description: city?.state?.description,
                            }
                        }

                    }

                    response.push({...nfe.dataValues, emit, enderEmit});

                }
        
                sequelize.close();

                res.status(200).json(response);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async economicActivity(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {[Op.or]: [
                        {"cnae": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}},
                        {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}}
                    ]};
                }

                const economicActivitys = await EconomicActivity.findAll({attributes: ['id', 'cnae', 'name'], 
                where,
                order: [["name", "asc"]],
                transaction});
        
                sequelize.close();

                res.status(200).json(economicActivitys);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async legalNature(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {[Op.or]: [
                        {"code": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}},
                        {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}}
                    ]};
                }

                const legalNatures = await LegalNature.findAll({attributes: ['id', 'code', 'name'], 
                where,
                order: [["name", "asc"]],
                transaction});
        
                sequelize.close();

                res.status(200).json(legalNatures);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async measurementUnit(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                if (req.body?.Search) {
                    where = {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }

                const measurementUnits = await MeasurementUnit.findAll({attributes: ['id', 'name'], 
                where,
                order: [["name", "asc"]],
                transaction});
        
                sequelize.close();

                res.status(200).json(measurementUnits);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

    async shippingOrder(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};

                //if (req.body?.Search) {
                //    where = {"name": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                //}

                const shippingOrders = await ShippingOrder.findAll({
                    attributes: ['id', 'weight', 'predominantProduct'],
                    include: [
                        {model: Partner, as: 'sender', attributes: ['id', 'name', 'surname', 'cpfCnpj', 'address']},
                        {model: Partner, as: 'recipient', attributes: ['id', 'name', 'surname', 'cpfCnpj', 'address']},
                        {model: ShippingOrderNfe, as: 'nfes', attributes: ['id'],
                            include: [{model: Nfe, as: 'nfe', attributes: ['id', 'NFe', 'protNFe']}]
                        },
                    ],
                    where,
                    //order: [["name", "asc"]],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json(shippingOrders);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

}