import _ from "lodash";
import React from "react";
import { Service } from "../../service";

export default class HomeBase extends React.Component {

    state = {
        data: {
            empresa: {
                pedidoDigital: {
                    frase: '',
                    funcionamento: {}
                }
            },
            categorias: [],
            filter: {
                categoriaId: null
            }
        },
        
        searchText: '',
        categoriaId: undefined,

    }

    async componentDidMount() {

        const response =  await Service.Post("pedido-eletronico/load", null);

        this.setState({data: response?.data, displayCategorias: response?.data.categorias});

    }
    
}