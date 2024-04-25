import { Request, Response } from "express";
import Auth from "../../auth";
import { Partner, PartnerContact, PartnerAddress, TabelaPreco } from "../../database";
import { PartnerService } from "../../services/registrations/partner.service";
import {Op} from "sequelize";

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
            catch (err)
            {
                res.status(500).json(err);
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
                        'estadoCivil',
                        'rg',
                        'ie',
                        'im',
                        'escolaridade',
                        'profissao',
                        'isAtivo',
                        'isBloquearVenda',
                        'isBloquearCompra'
                    ],
                    include: [
                        {model: PartnerContact, as: 'contacts', attributes: ["id", "name", "phone", "email"]},
                        {model: PartnerAddress, as: 'address', attributes: ["id", "cep", "logradouro", "numero", "complemento", "bairro"]}
                    ],
                    where,
                    transaction
                });
    
                res.status(200).json(partner);

                sequelize.close();

            }
            catch (err)
            {
                res.status(500).json(err);
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
                Parceiro.tabelaPrecoId = req.body.tabelaPreco?.id || null;

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
            catch (err)
            {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

    /*
    async update(req: Request, res: Response) {
        
        Auth(req, res).then(async ({transaction}) => {

            const Usuario = req.body as Usuario;

            const valid = UsuarioService.IsValid(Usuario);

            if (!valid.success) {
                res.status(201).json(valid);
                return;
            }

            await UsuarioService.Update(Usuario, transaction);

            await transaction?.commit();
            
            res.status(200).json(Usuario);
            
        }).catch((err) => {
            res.status(500).json(err);
        });
       
    }

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