import { Transaction } from "sequelize";
import { User } from "../../database";
import crypto from "crypto";

export class UserService {

    public static IsValid = (user: User) => {

        if (user.email == '') {
            return { success: false, message: 'Informe o e-mail!' };
        }

        return { success: true };

    }

    public static Create = async (user: User, transaction?: Transaction) => {

        user.id = crypto.randomUUID();
        
        await User.create({...user}, {transaction});

    }

    public static Update = async (user: User, transaction?: Transaction) => {

        await User.update(user, {where: {id: user.id}, transaction});

    }

    public static Delete = async (id: string, transaction?: Transaction) => {
        await User.update({ativo: false}, {where: {id: id}, transaction});
    }

}