import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class MesoRegionTemplate extends React.Component {

    render() {
        return (
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.description} - {args.state?.acronym}</span>
                )}
            </ResultContext.Consumer>
        );
    }

}