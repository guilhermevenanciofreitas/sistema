import React from 'react';

export class ControlViewFilter extends React.Component {

  protected Initialize = (Close: any) => {

      return new Promise<any>(resolve => {

          this.Close = (value: any) => {
              Close();
              return resolve(value);
          };

      });

  }

  public Show = async (filter: any): Promise<any> =>
    {
 
        this.setState({open: true, filter: {...filter}});

        return this.Initialize(this.Close);
 
    }

    

    public Confirm = () =>
    {
        return this.state;
    }

    public Clear = () =>
    {
        return undefined;
    }

  protected Close: Function = () => undefined;

}