import { Request, Response } from "express";
import Auth from "../../auth";
import { FreightCalculation, FreightCalculationRecipient, FreightCalculationType, FreightCalculationWeight, Nfe, MesoRegion, ShippingOrder, State } from "../../database";
import { Op } from "sequelize";
import { FreightCalculationService } from "../../services/logistic/freightCalculation.service";

import sql from 'mssql';

export default class FreightCalculationController {

    async findAll(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize, pagination}) => {
            try {

                const typeId = req.body.typeId;

                const transaction = await sequelize.transaction();

                let where: any = {};
                let order: any = [];
        
                if (typeId) {
                    where = [{typeId}];
                }

                if (pagination.sort) {
                    order = [[pagination.sort.column, pagination.sort.direction]]
                }

                order = [['description', 'asc']];
        
                const freightCalculations = await FreightCalculation.findAndCountAll({
                    attributes: ['id', 'description', 'aliquotICMS'],
                    include: [
                        {model: FreightCalculationType, attributes: ['id', 'description']},
                        {model: MesoRegion, attributes: ['id', 'description']},
                        {model: FreightCalculationRecipient, attributes: ['id']},
                    ],
                    where, order, limit: pagination.limit, offset: pagination.offset1, transaction
                });

                const freightCalculationTypes = await FreightCalculationType.findAll({
                    attributes: ['id', 'description'],
                    order: [['description', 'asc']],
                    transaction
                });
        
                sequelize.close();

                res.status(200).json({
                    request: {
                        typeId, ...pagination
                    },
                    response: {
                        freightCalculationTypes, rows: freightCalculations.rows, count: freightCalculations.count
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
                        {model: FreightCalculationRecipient, attributes: ['id', 'freightCalculationId'],
                            include: [{model: MesoRegion, attributes: ['id', 'description'], include: [{model: State, attributes: ['id', 'acronym']}]}]
                        },
                        {model: FreightCalculationWeight, attributes: ['id', 'freightCalculationId', 'startWeight', 'endWeight', 'calculationType', 'value']},
                    ],
                    //order: [['freightCalculationWeight', 'startWeight', 'ASC']],
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

                /*
                const transaction = await sequelize.transaction();

                const freightCalculations = await FreightCalculation.findAll({
                    attributes: ['id', 'description', 'aliquotICMS'],
                    include: [
                        {model: MesoRegion, attributes: ['id', 'description']},
                        {model: FreightCalculationRecipient, attributes: ['id'],
                            include: [{model: MesoRegion, attributes: ['id', 'description']},]
                        },
                        {model: FreightCalculationWeight, attributes: ['id', 'startWeight', 'endWeight', 'calculationType', 'value']},
                    ],
                    order: [['description', 'asc']], transaction
                });

                await sql.connect('Server=170.254.135.108,1433;Database=GlobalTCL;User Id=sa;Password=Tcldatabase@01;Encrypt=false')

                for (const r of freightCalculations) {

                    var query = `INSERT INTO FreteCalculo (IDRemetenteMesoRegiao, Descricao, AliquotaICMS) VALUES ((SELECT TOP 1 ID FROM MesoRegiao WHERE Descricao = '${r.senderMesoRegion?.description}'), '${r.description}', ${r.aliquotICMS}); `;

                    for (const recipient of r.recipients || []) {
                        query += `INSERT INTO FreteCalculoDestinatario (IDFreteCalculo, IDDestinatarioMesoRegiao) VALUES (IDENT_CURRENT('FreteCalculo'), (SELECT TOP 1 ID FROM MesoRegiao WHERE Descricao = '${recipient.recipientMesoRegion?.description}')); `;
                    }

                    for (const weight of r.weights || []) {
                        query += `INSERT INTO FreteCalculoPeso (IDFreteCalculo, PesoInicial, PesoFinal, CalculoTipo, Valor) VALUES (IDENT_CURRENT('FreteCalculo'), ${weight.startWeight}, ${weight.endWeight}, '${weight.calculationType == 'fix' ? 'fixo' : 'multiplicado'}', ${weight.value}); `;
                    }

                    console.log(query);

                    await sql.query(query);
                }

                res.status(200).json({message: 'success'});

                */

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