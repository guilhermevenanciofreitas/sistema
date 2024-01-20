import { Transaction } from "sequelize";
import { Usuario } from "../database";
import crypto from "crypto";

export class UsuarioService {

    public static IsValid = (usuario: Usuario) => {

        if (usuario.email == '') {
            return { success: false, message: 'Informe o e-mail!' };
        }

        return { success: true };

    }

    public static Create = async (usuario: Usuario, transaction: Transaction | undefined) => {

        usuario.id = crypto.randomUUID();
        
        await Usuario.create({...usuario}, {transaction});

    }

    public static Update = async (usuario: Usuario, transaction: Transaction | undefined) => {

        const id = usuario.id ? await Usuario.findOne({where: {id: usuario.id}, transaction}) : undefined;

        await Usuario.update(usuario, {where: {id: usuario.id}, transaction});

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Usuario.update({ativo: false}, {where: {id: id}, transaction});
    }

}