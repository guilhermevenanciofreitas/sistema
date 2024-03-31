import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Accounts, Database } from "../../auth";
import Sequelize, { Empresa, Produto, ProdutoCategoria } from "../../database";

async function Auth(id: string): Promise<any> {

    const sequelize = new Accounts().sequelize;

    const transaction = await sequelize?.transaction();

    const config = await Database.findOne({attributes: ["id", "host", "username", "password", "database"], where: {id}, transaction});

    sequelize?.close();

    return { 
        sequelize: new Sequelize({host: config?.host, username: config?.username, password: config?.password, database: config?.database}).sequelize
    };
    
}

export default class IndexController {

    async load(req: Request, res: Response) {

        const decoded: any = jwt.decode(req.headers.authorization || "")

        Auth(decoded.id).then(async ({sequelize}) => {

            const transaction = await sequelize.transaction();
        
            const empresa = await Empresa.findOne({attributes: ["id", "pedidoDigital"], transaction});

            const categorias = await ProdutoCategoria.findAll({attributes: ["id", "descricao", "imagem"], include: [{model: Produto, attributes: ["id", "nome", "descricao"]}], transaction});

            sequelize.close();

            res.status(200).json({empresa, categorias});

        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
      
    }

}