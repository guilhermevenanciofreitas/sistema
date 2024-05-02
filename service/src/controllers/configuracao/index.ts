import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import Auth, { Accounts, Database } from "../../auth";
import Sequelize, { Company } from "../../database";
import { EmpresaService } from "../../services/configuracao/index.service";

import formidable from "formidable";
import fs from "fs";
import { Blob } from "buffer";

import pem from "pem";
import axios from "axios";
import _ from "lodash";

export default class ConfiguracaoController {

    
    async findOne(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try
            {

                const transaction = await sequelize.transaction();

                let company = await Company.findOne(
                {
                    attributes: ['id', 'cpfCnpj', 'name', 'surname', 'address', 'certificate'],
                    where: {id: req.body.id},
                    transaction
                });

                const response = await axios.post('http://localhost:5277/certificate/info', {file: company?.certificate.file, password: company?.certificate.password});
    
                res.status(200).json({...company?.dataValues, certificate: {info: response?.data}});

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

                const Empresa = req.body as Company;

                Empresa.cpfCnpj = req.body.cpfCnpj?.replace(/[^0-9]/g,'');
                
                const valid = EmpresaService.IsValid(Empresa);
    
                if (!valid.success) {
                    res.status(201).json(valid);
                    return;
                }
    
                if (!Empresa.id) {
                    await EmpresaService.Create(Empresa, transaction);
                } else {
                    await EmpresaService.Update(Empresa, transaction);
                }
    
                await transaction?.commit();
                
                sequelize.close();

                res.status(200).json(Empresa);

            }
            catch (err)
            {
                res.status(500).json(err);
            }
        }).catch((err) => {
            res.status(401).json(err);
        });
    }

    async certificate(req: Request, res: Response) {
    
        const form = formidable();

        form.parse(req, async (err, fields: any, files: any) => {

            const file = fs.readFileSync(files.file[0].filepath, {encoding: 'base64'});
            const password = fields.password[0];

            const response = await axios.post('http://localhost:5277/certificate/info', {file, password});

            res.status(200).json({info: response.data});

        });

    }

}