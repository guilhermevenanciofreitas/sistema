import React from 'react';
import Partners from '..';
import { ViewPartner } from '../View';

export default class Clientes extends React.Component {

    render(): React.ReactNode {
        return (
            <Partners Title='Clientes' Type='customer' ViewPartner={<ViewPartner Title='Cliente' Type='customer' />} />
        );
    }

}