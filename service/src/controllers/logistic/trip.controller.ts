import { Request, Response } from "express";
import Auth from "../../auth";
import { Company, Cte, Nfe, Partner, ShippingOrder, ShippingOrderNfe, Trip, TripCte, TripShippingOrder, TripVehicle, Vehicle } from "../../database";
import { ShippingOrderService } from "../../services/logistic/shippingOrder.service";
import { Op } from "sequelize";
import { TripService } from "../../services/logistic/trip.service";
import { CteService } from "../../services/fiscal/cte.service";
import axios from "axios";

export default class TripController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const trips = await Trip.findAndCountAll({
                    attributes: ['id'],
                    include: [
                        {model: Company, as: 'company', attributes: ['id', 'surname']},
                        {model: Partner, as: 'driver', attributes: ['id', 'surname']},
                        {model: Vehicle, as: 'vehicle', attributes: ['name', 'plate']},
                    ],
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
                        rows: trips.rows, count: trips.count
                    }
                });

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message});
        });
    }

    async findOne(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const trip = await Trip.findOne({
                    attributes: ['id', 'type'],
                    include: [
                        {model: Company, as: 'company', attributes: ['id', 'surname']},
                        {model: Partner, as: 'driver', attributes: ['id', 'surname']},
                        {model: Vehicle, as: 'vehicle', attributes: ['id', 'name', 'plate']},
                        {model: TripVehicle, as: 'vehicles', attributes: ['id'],
                            include: [{model: Vehicle, as: 'vehicle', attributes: ['id', 'name', 'plate']}]
                        },
                        {model: TripShippingOrder, as: 'shippingOrders', attributes: ['id'],
                            include: [{model: ShippingOrder, as: 'shippingOrder', attributes: ['id', 'weight'],
                                include: [
                                    {model: Partner, as: 'sender', attributes: ['id', 'surname']},
                                    {model: Partner, as: 'recipient', attributes: ['id', 'surname']}
                                ]
                            }]
                        },
                        {model: TripCte, as: 'ctes', attributes: ['id'],
                            include: [{model: Cte, as: 'cte', attributes: ['id', 'CTe', 'protCTe']}]
                        },
                    ],
                    where: {id: req.body.id},
                    transaction
                });

                sequelize.close();
    
                res.status(200).json(trip);
    
            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

    async save(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const trip = req.body as Trip;

                const valid = TripService.IsValid(trip);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!trip.id) {
                    await TripService.Create(trip, transaction);
                } else {
                    await TripService.Update(trip, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(trip);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });

    }

    async emission(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize, companyId}) => {
            try
            {

                const ids = req.body.ids;

                const transaction = await sequelize.transaction();

                const ctes = await Cte.findAll({
                    attributes: ['id', 'CTe'],
                    where: {id: {[Op.in]: ids}},
                    transaction
                });

                const company = await Company.findOne(
                {
                    attributes: ['id', 'cpfCnpj', 'address', 'certificate'],
                    where: {id: companyId},
                    transaction
                });

                for (const cte of ctes) {

                    const request = {certificate: {file: company?.certificate.file, password: company?.certificate.password}, cte: await CteService.JsonToXml({CTe: cte.CTe})};

                    const response = await axios.post('http://localhost:5277/cte/emission', request);
                    
                }

                sequelize.close();
                
                res.status(200).json({success: true});

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

    async delete(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                await TripService.Delete(req.body.id, transaction);

                await transaction?.commit();

                sequelize.close();

                res.status(200).json({success: true});

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json({message: err.message});
        });
    }

}