import { Request, Response } from "express";

import Accounts from "../../auth/accounts";
import crypto from "crypto";

import { AccountUser, Account, Session, User as User1, Database, minutes } from "../../auth/index";
import Sequelize, { Company, User as User2 } from "../../database";

export default class LoginController {

  //200 - autorizado
  //201 - requer informar account
  //202 - requer informar empresa
  async signin(req: Request, res: Response) {
    try {

      let accountId = req.body.accountId;
      let companyId = req.body.companyId;

      const sequelize = new Accounts().sequelize;

      const accountTransaction = await sequelize?.transaction();

      const userAuth: any = await User1.findOne({attributes: ['id', 'email', 'password'], where: {email: req.body.email, password: req.body.password}, transaction: accountTransaction});

      if (userAuth == null) {
        res.status(203).json({message: 'E-mail/senha incorreto!'});
        return;
      }

      if (accountId == "") {
  
        const accountsUsers = await AccountUser.findAll({attributes: ['accountId'], include: [{attributes: ['id', 'name'], model: Account}], where: {userId: userAuth?.id}, transaction: accountTransaction});
      
        if (accountsUsers.length > 1) {
          let accounts = [];
          for(let i = 0; i < accountsUsers.length; i++) {
            accounts.push(accountsUsers[i].Account);
          }
          res.status(201).json(accounts);
          return;
        }

        accountId = accountsUsers[0].accountId;
        
      }

      const account: any = await Account.findOne({include: [{attributes: ['host', 'username', 'password', 'database'], model: Database}], where: {id: accountId}, transaction: accountTransaction});

      const transaction = await new Sequelize({
        host: account?.Database?.host,
        username: account?.Database?.username,
        password: account?.Database?.password,
        database: account?.Database?.database
      }).sequelize?.transaction();

      if (companyId == "") {

        const empresas = await Company.findAll({attributes: ['id', 'name', 'surname'], transaction: transaction});

        if (empresas.length > 1) {
          res.status(202).json(empresas);
          return;
        }

        companyId = empresas[0].id;

      }

      const session = await Session.create({id: crypto.randomUUID(), userId: userAuth?.id, accountId: accountId, companyId: companyId, lastAcess: new Date()}, {transaction: accountTransaction});
      accountTransaction?.commit();
      
      const user = await User2.findOne({attributes: ['id', 'name'], where: {id: userAuth?.id}, transaction: transaction});
      const company = await Company.findOne({attributes: ['id', 'surname'], where: {id: companyId}, transaction: transaction});
      
      sequelize?.close();

      res.status(200).json({id: session?.id, user: user, company: company, lastAcess: session?.lastAcess?.toLocaleString('en-US'), expiresIn: minutes});
      

    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
  }

  async signout(req: Request, res: Response) {
    try {

      const id = req.body.id;

      const transaction = await new Accounts().sequelize?.transaction();

      await Session.destroy({where: {id: id}, transaction});

      transaction?.commit();

      res.status(200).json({message: 'signout success!'});

    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
  }

}