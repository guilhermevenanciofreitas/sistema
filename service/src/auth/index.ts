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

import Sequelize, { Usuario } from "../database";
import { Transaction } from "sequelize";

export const minutes = 60;

export default async function Auth(req: Request, res: Response): Promise<Transaction | undefined> {

    const transaction = await new Accounts().sequelize?.transaction();

    try {
            
        const session = await Session.findOne({include: [{model: Account, include: [Database]}], where: {id: req.headers.authorization}, transaction});

        if (!session) {
            res.status(401).json({message: "Session expired!"});
            return;
        }

        if (session?.lastAcess) {
            const endAt = new Date(session?.lastAcess?.getTime() + minutes * 60000);
            if (endAt <= new Date()) //Verificar se token ainda e válido
            {
                res.status(401).json({message: "Session expired!"});
                return;
            }
        }

        const lastAcess = new Date();

        await session.update({lastAcess: lastAcess, transaction});

        res.setHeader("Last-Acess", lastAcess.toLocaleString('en'));
        res.setHeader("Expires-In", minutes);

        const config = session?.Account?.Database;
        
        transaction?.commit();

        return await new Sequelize({
            host: config?.host,
            username: config?.username,
            password: config?.password,
            database: config?.database
        }).sequelize?.transaction();

    } catch (err) {
        transaction?.rollback();
        res.status(500).json({message: err});
        return;
    }

}