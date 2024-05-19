import { Transaction } from "sequelize";
import { Nfe } from "../../database";
import crypto from "crypto";
import { parseStringPromise, Builder } from "xml2js";
import { DisplayError } from "../../errors/DisplayError";

export class NfeService {

    public static IsValid = (nfe: Nfe) => {

        return { success: true };

    }

    public static Create = async (nfe: Nfe, transaction?: Transaction) => {

        const exist = await Nfe.findOne({attributes: ['id'], where: {'protNFe.infProt.chNFe': nfe.protNFe.infProt.chNFe}});

        if (exist) {
            throw new DisplayError('Nota fiscal já está cadastrada!', 201);
        }

        nfe.id = crypto.randomUUID();

        await Nfe.create({...nfe}, {transaction});

    }

    public static Update = async (nfe: Nfe, transaction?: Transaction) => {

        await Nfe.update(nfe, {where: {id: nfe.id}, transaction});

    }

    public static XmlToJson = async (xml: any) => {

        return await parseStringPromise(xml, {explicitArray: false});

    }

    public static JsonToXml = async (json: any) => {

        const builder = new Builder( { headless: false, renderOpts: { pretty: true } });

        return builder.buildObject(json);

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await Nfe.update({ativo: false}, {where: {id: id}, transaction});
    }

}