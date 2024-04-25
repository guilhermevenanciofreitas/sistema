import React from 'react';
import Partners from '..';
import { ViewPartner } from '../View';

export default class Funcionarios extends React.Component {

    render(): React.ReactNode {
        return (
            <Partners Title='Funcionários' Type='employee' ViewPartner={<ViewPartner Title='Funcionário' Type='employee' />} />
        );
    }

}