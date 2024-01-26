import React from 'react';
import Parceiros from '../Parceiros';
import { ViewParceiro } from '../Parceiros/View';

export default class Funcionarios extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Funcionários' Tipo='Funcionario' ViewParceiro={<ViewParceiro Title='Funcionário' Tipo='Funcionario' />} />
        );
    }

}