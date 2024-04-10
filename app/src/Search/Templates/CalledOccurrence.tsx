import React from 'react';
import { ResultContext } from '../../Utils/Controls/Form/AutoComplete/base';

export class CalledOccurrenceTemplate extends React.Component {

    render() {
        return <>
            <ResultContext.Consumer>
                {({ args }: any) => (
                    <span>{args.description}</span>
                )}
            </ResultContext.Consumer>
        </>
    }

}