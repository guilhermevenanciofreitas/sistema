import React from 'react';
import Parceiros from '..';
import { ViewParceiro } from '../View';

export default class Clientes extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Clientes' Tipo='customer' ViewParceiro={<ViewParceiro Title='Cliente' Tipo='customer' />} />
        );
    }

}