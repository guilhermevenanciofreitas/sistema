import React from 'react';
import Parceiros from '..';
import { ViewParceiro } from '../View';

export default class Transportadoras extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Transportadoras' Tipo='shipping-company' ViewParceiro={<ViewParceiro Title='Transportadora' Tipo='shipping-company' />} />
        );
    }

}