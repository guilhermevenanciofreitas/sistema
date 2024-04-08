import React, { ReactNode } from "react";

export abstract class CardStatusBase extends React.Component<Readonly<{checked: boolean, status: string, value: number, bagde: number, color: string, OnClick?: Function}>> {

    protected abstract Card_Click(): void;

}