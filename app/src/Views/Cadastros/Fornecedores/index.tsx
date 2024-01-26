import React from 'react';
import Parceiros from '../Parceiros';
import { ViewParceiro } from '../Parceiros/View';

export default class Fornecedores extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Fornecedores' Tipo='Fornecedor' ViewParceiro={<ViewParceiro Title='Fornecedor' Tipo='Fornecedor' />} />
        );
    }

}