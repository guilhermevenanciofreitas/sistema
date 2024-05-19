import { Transaction } from "sequelize";
import { Cte } from "../../database";
import crypto from "crypto";
import { Op } from "sequelize";
import { Builder, parseStringPromise } from "xml2js";

export class CteService {

    public static IsValid = (cte: Cte) => {

        ///if (nfe.descricao == '') {
        //    return { success: false, message: 'Informe a descrição!' };
        //}

        return { success: true };

    }

    public static Create = async (cte: Cte, transaction: Transaction | undefined) => {

        cte.id = crypto.randomUUID();

        await Cte.create({...cte}, {transaction});

    }

    public static Update = async (cte: Cte, transaction?: Transaction) => {

        await Cte.update(cte, {where: {id: cte.id}, transaction});

    }

    public static XmlToJson = async (xml: any) => {

        return await parseStringPromise(xml, {explicitArray: false});

    }

    public static JsonToXml = async (json: any) => {

        const builder = new Builder( { headless: false, renderOpts: { pretty: true } });

        return builder.buildObject(json);

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await Cte.update({active: false}, {where: {id: id}, transaction});
    }

}