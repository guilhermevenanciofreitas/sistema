import React from 'react';
import Parceiros from '../Parceiros';
import { ViewParceiro } from '../Parceiros/View';

export default class Clientes extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Clientes' Tipo='Cliente' ViewParceiro={<ViewParceiro Title='Cliente' Tipo='Cliente' />} />
        );
    }

}