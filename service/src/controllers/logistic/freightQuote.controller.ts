import { Request, Response } from "express";
import Auth from "../../auth";
import { FreightCalculation, FreightCalculationType, FreightCalculationWeight, FreightQuote, Nfe, MesoRegion, ShippingOrder, FreightCalculationRecipient, State } from "../../database";
import { Op } from "sequelize";
import { FreightCalculationService } from "../../services/logistic/freightCalculation.service";

export default class FreightQuoteController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }
        
                const freightQuotes = await FreightQuote.findAndCountAll({
                    attributes: ['id'],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction
                });

                sequelize.close();

                res.status(200).json({
                    request: {
                        ...pagination
                    },
                    response: {
                        rows: freightQuotes.rows, count: freightQuotes.count
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

                const freightCalculation = await FreightCalculation.findOne({
                    attributes: ['id', 'description', 'aliquotICMS'],
                    include: [
                        {model: FreightCalculationType, attributes: ['id', 'description']},
                        {model: MesoRegion, as: 'senderMesoRegion', attributes: ['id', 'description'], include: [{model: State, attributes: ['id', 'acronym']}]},
                        {model: FreightCalculationRecipient, attributes: ['id'], include: [{model: MesoRegion, attributes: ['id', 'description'], include: [{model: State, attributes: ['id', 'acronym']}]}]},
                        {model: FreightCalculationWeight, attributes: ['id', 'freightCalculationId', 'startWeight', 'endWeight', 'calculationType', 'value']},
                    ],
                    where: {id: req.body.id}, transaction
                });

                sequelize.close();
    
                res.status(200).json(freightCalculation);
    
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

                const freightCalculation = req.body as FreightCalculation;

                const valid = FreightCalculationService.IsValid(freightCalculation);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!freightCalculation.id) {
                    await FreightCalculationService.Create(freightCalculation, transaction);
                } else {
                    await FreightCalculationService.Update(freightCalculation, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(freightCalculation);

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

                await FreightCalculationService.Delete(req.body.id, transaction);

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