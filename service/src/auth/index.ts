import { Request, Response } from "express";
import Accounts from "./accounts";
import { Session } from "./models/session.model";
import { Account } from "./models/account.model";
import { Database } from "./models/database.model";

export { Accounts } from "./accounts";
export { Session } from "./models/session.model";
export { Account } from './models/account.model';
export { AccountUser } from './models/accountUser.model';
export { User } from "./models/user.model";
export { Database } from './models/database.model';

import Sequelize from "../database";

export const minutes = 60;

export default async function Auth(req: Request, res: Response): Promise<any> {

    if (req.headers.authorization == undefined) {
        throw new Error("E necessário fazer o login!");
    }

    const sequelize = await new Accounts().sequelize;

    const transaction = await sequelize?.transaction();

    const session = await Session.findOne({attributes: ["id", "companyId", "lastAcess"], include: [{attributes: ["id"], model: Account, include: [{attributes: ["host", "username", "password", "database"], model: Database}]}], where: {id: req.headers.authorization}, transaction});

    //Verificar se token ainda e válido
    if (!session?.lastAcess || new Date(session?.lastAcess?.getTime() + minutes * 60000) <= new Date()) {
        throw new Error("Sua sessão expirou!");
    };

    const lastAcess = new Date();

    await session?.update({lastAcess: lastAcess, transaction});

    res.setHeader("Last-Acess", lastAcess.toLocaleString('en-US'));
    res.setHeader("Expires-In", minutes);

    const config = session?.Account?.Database;
    
    transaction?.commit();

    await sequelize?.close();

    const limit = req.body.limit || undefined;
    const offset = ((req.body.offset - 1) * limit) || undefined;
    const filter = req.body.filter || undefined;
    const sort = req.body.sort || undefined;

    const pagination = {limit, offset1: offset, offset: req.body.offset, filter, sort}

    return { 
        sequelize: await new Sequelize({host: config?.host, username: config?.username, password: config?.password, database: config?.database}).sequelize,
        userId: session?.userId,
        companyId: session?.companyId,
        pagination: pagination
    };

}