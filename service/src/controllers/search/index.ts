import { Request, Response } from "express";
import Auth from "../../auth";
import { TabelaPreco } from "../../database";
import { Op } from "sequelize";

export default class SearchController {

    async tabelasPreco(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {
            try {

                const transaction = await sequelize.transaction();

                let where: any = {};
   
                if (req.body?.Search) {
                    where = {"descricao": {[Op.iLike]: `%${req.body?.Search.replace(' ', "%")}%`}};
                }
        
                const tabelasPreco = await TabelaPreco.findAll({attributes: ["id", "descricao"], where, order: [["descricao", "asc"]], transaction});
        
                sequelize.close();

                res.status(200).json(tabelasPreco);

            }
            catch (err) {
                res.status(500).json(err);
            }
        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
    }

}