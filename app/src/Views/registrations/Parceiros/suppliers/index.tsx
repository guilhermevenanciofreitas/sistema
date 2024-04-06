import React from 'react';
import Parceiros from '..';
import { ViewParceiro } from '../View';

export default class Fornecedores extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Fornecedores' Tipo='supplier' ViewParceiro={<ViewParceiro Title='Fornecedor' Tipo='supplier' />} />
        );
    }

}