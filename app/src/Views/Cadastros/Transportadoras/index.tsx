import React from 'react';
import Parceiros from '../Parceiros';
import { ViewParceiro } from '../Parceiros/View';

export default class Transportadoras extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Transportadoras' Tipo='Transportadora' ViewParceiro={<ViewParceiro Title='Transportadora' Tipo='Transportadora' />} />
        );
    }

}