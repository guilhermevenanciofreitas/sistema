import { Transaction } from "sequelize";
import { Usuario } from "../database";
import crypto from "crypto";

export class UsuarioService {

    public static Add = async (usuario: Usuario, transaction: Transaction | undefined) => {

        const id = usuario.id ? await Usuario.findOne({where: {id: usuario.id}, transaction}) : undefined;

        if (!id) {
            usuario.id = crypto.randomUUID();
            await Usuario.create({...usuario}, {transaction});
        } else {
            await Usuario.update(usuario, {where: {id: usuario.id}, transaction});
        }

    }

    public static Delete = async (id: string, transaction: Transaction | undefined) => {
        await Usuario.update({ativo: false}, {where: {id: id}, transaction});
    }

}