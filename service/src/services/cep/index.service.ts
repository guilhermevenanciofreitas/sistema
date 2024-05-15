import { Transaction } from "sequelize";
import { City, State } from "../../database";
import axios from "axios";
import _ from "lodash";

export class CepService {

    public static Consult = async (cep: string, transaction?: Transaction) => {

        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        const city = await City.findOne({
            attributes: ['id', 'name'],
            include: [{model: State, as: 'state', attributes: ['id', 'description']}],
            where: {ibge: response.data.ibge},
            transaction
        });

        return {
            logradouro: _.toUpper(response.data.logradouro),
            neighborhood: _.toUpper(response.data.bairro),
            city: {id: city?.id, name: city?.name},
            state: city?.state
        };

    }

}