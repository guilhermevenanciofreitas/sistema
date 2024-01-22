import React from "react";

export class BaseIndex<T = {}> extends React.Component<T> {

  protected Finish: boolean = false;

  componentDidMountFinish = (): void => {
    this.Finish = true;
  };
  
}