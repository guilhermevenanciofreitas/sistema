import React from 'react';
import Parceiros from '../Parceiros';

export default class Clientes extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Clientes' Tipo='Cliente' ViewParceiro={{Title: "Cliente"}} />
        );
    }

}