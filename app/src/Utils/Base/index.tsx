import React from "react";

export class BaseIndex extends React.Component {

  protected Finish: boolean = false;

  componentDidMountFinish = (): void => {
    this.Finish = true;
  };
  
}