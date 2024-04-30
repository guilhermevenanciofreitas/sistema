import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class VehicleTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.name} - {args.plate}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}