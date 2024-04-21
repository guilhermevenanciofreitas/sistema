import { Request, Response } from "express";
import Auth from "../../auth";
import { FreightCalculation, FreightCalculationType, FreightCalculationWeight, FreightQuote, Nfe, MesoRegion, ShippingOrder, FreightCalculationRecipient, State, Company, Partner } from "../../database";
import { Op } from "sequelize";
import { FreightCalculationService } from "../../services/logistic/freightCalculation.service";
import { FreightQuoteService } from "../../services/logistic/freightQuote.service";
import _ from "lodash";

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
                    attributes: ['id', 'weight', 'value', 'aliquotICMS', 'valueICMS'],
                    include: [
                        {model: FreightCalculationType, attributes: ['id', 'description']},
                        {model: Partner, as: 'sender', attributes: ['id', 'nome']},
                        {model: MesoRegion, as: 'senderMesoRegion', attributes: ['id', 'description']},
                        {model: Partner, as: 'recipient', attributes: ['id', 'nome']},
                        {model: MesoRegion, as: 'recipientMesoRegion', attributes: ['id', 'description']},
                    ],
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

                const freightCalculation = await FreightQuote.findOne({
                    attributes: ['id', 'weight', 'value', 'aliquotICMS', 'valueICMS'],
                    include: [
                        {model: Company, attributes: ['id', 'nomeFantasia']},
                        {model: FreightCalculationType, attributes: ['id', 'description']},
                        {model: Partner, as: 'sender', attributes: ['id', 'nome']},
                        {model: MesoRegion, as: 'senderMesoRegion', attributes: ['id', 'description']},
                        {model: Partner, as: 'recipient', attributes: ['id', 'nome']},
                        {model: MesoRegion, as: 'recipientMesoRegion', attributes: ['id', 'description']},
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

    async calculation(req: Request, res: Response) {
        
        Auth(req, res).then(async ({sequelize}) => {
            try
            {
                const transaction = await sequelize.transaction();

                const freightCalculation = await FreightCalculation.findOne({
                    attributes: ['id', 'aliquotICMS'],
                    include: [
                        {model: FreightCalculationWeight, attributes: ['id', 'startWeight', 'endWeight', 'calculationType', 'value']},
                        {model: FreightCalculationRecipient, attributes: ['id', 'recipientMesoRegionId'], 
                            where: {'recipientMesoRegionId': req.body.recipientMesoRegionId}, required: true
                        },
                    ],
                    where: {
                        'typeId': req.body.typeId,
                        'senderMesoRegionId': req.body.senderMesoRegionId
                    },
                    transaction
                });

                if (freightCalculation == null) {
                    res.status(201).json({message: 'error, not exist calculation'});
                    return;
                }

                const freightCalculationWeight = _.filter(freightCalculation.weights, (weight: FreightCalculationWeight) => parseFloat(weight.startWeight || '0') <= parseFloat(req.body.weight) && parseFloat(weight.endWeight || '0') > parseFloat(req.body.weight));

                if (_.size(freightCalculationWeight) == 0) {
                    res.status(201).json({message: 'error, not exist weight'});
                    return;
                }
                
                let value = 0;
                const aliquotICMS = parseFloat(freightCalculation.aliquotICMS || '0');

                if (freightCalculationWeight[0].calculationType == 'fix') {
                    value = parseFloat(freightCalculationWeight[0].value || '0');
                }

                if (freightCalculationWeight[0].calculationType == 'multiplied') {
                    value = parseFloat(req.body.weight) * parseFloat(freightCalculationWeight[0].value || '0');
                }

                sequelize.close();
    
                res.status(200).json({value, valueICMS: (value / 100) * aliquotICMS, aliquotICMS: aliquotICMS});
    
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

                const freightQuote = req.body as FreightQuote;

                const valid = FreightQuoteService.IsValid(freightQuote);

                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }

                if (!freightQuote.id) {
                    await FreightQuoteService.Create(freightQuote, transaction);
                } else {
                    await FreightQuoteService.Update(freightQuote, transaction);
                }

                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(freightQuote);

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