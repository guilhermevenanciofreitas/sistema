import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class StockLocationTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.name}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}