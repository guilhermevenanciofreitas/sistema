import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Accounts, Database } from "../../auth";
import Sequelize, { Company, Product, ProductCategory, ProductCombination, Combination, ProductCombinationItem } from "../../database";

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
        
            const company = await Company.findOne({attributes: ["id", "pedidoDigital"], transaction});

            const productCategory = await ProductCategory.findAll({attributes: ["id", "description", "image"], 
                include: [{model: Product, attributes: ["id", "name", "description", "value"],
                    include: [
                        {model: ProductCombination, attributes: ["id", "isObrigatorio", "minimo", "maximo", "ordem"],
                        //include: [{model: ProductCombinationGroup, attributes: ["id", "description"],
                        //    include: [{model: ProductCombinationItem, attributes: ["id", "name", "description"]}]
                        //}]    
                        }
                    ]
                }],
                order: [['ordem', 'ASC']],
                transaction
            });

            sequelize.close();

            res.status(200).json({company, productCategory});

        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
      
    }

}