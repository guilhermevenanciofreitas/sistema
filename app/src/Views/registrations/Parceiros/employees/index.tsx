import React from 'react';
import Parceiros from '..';
import { ViewParceiro } from '../View';

export default class Funcionarios extends React.Component {

    render(): React.ReactNode {
        return (
            <Parceiros Title='Funcionários' Tipo='employee' ViewParceiro={<ViewParceiro Title='Funcionário' Tipo='employee' />} />
        );
    }

}