import React from 'react';
import Parceiros from '../Parceiros';

export default class Fornecedores extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Fornecedores' Tipo='Fornecedor' ViewParceiro={{Title: "Fornecedor"}} />
        );
    }

}