import { Request, Response } from "express";
import Auth from "../../auth";
import _ from "lodash";
import { CepService } from "../../services/cep/index.service";

export default class CepController {

    async consult(req: Request, res: Response) {

        Auth(req, res).then(async ({sequelize}) => {

            const transaction = await sequelize.transaction();
        
            const response = await CepService.Consult(req.body.cep.replace(/[^0-9]/g,''), transaction);

            res.status(200).json(response);

        }).catch((err: any) => {
            res.status(401).json({message: err.message})
        });
      
    }

}