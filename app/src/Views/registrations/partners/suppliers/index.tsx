import React from 'react';
import Partners from '..';
import { ViewPartner } from '../View';

export default class Fornecedores extends React.Component {

    render(): React.ReactNode {
        return (
            <Partners Title='Fornecedores' Type='supplier' ViewPartner={<ViewPartner Title='Fornecedor' Type='supplier' />} />
        );
    }

}