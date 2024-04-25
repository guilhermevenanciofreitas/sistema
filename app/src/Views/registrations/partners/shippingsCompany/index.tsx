import React from 'react';
import Partners from '..';
import { ViewPartner } from '../View';

export default class Transportadoras extends React.Component {

    render(): React.ReactNode {
        return (
            <Partners Title='Transportadoras' Type='shipping-company' ViewPartner={<ViewPartner Title='Transportadora' Type='shipping-company' />} />
        );
    }

}