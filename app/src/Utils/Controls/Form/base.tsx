import React, { ReactNode } from "react";

class Parameters {
    OnSubmit?: Function;
    OnReset?: Function;
    children?: ReactNode;
}

export abstract class FormBase extends React.Component<Parameters> {

}