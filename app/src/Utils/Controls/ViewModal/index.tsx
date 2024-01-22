import React from 'react';

export class ControlViewModal<T = {}> extends React.Component<T> {

  protected Initialize = (Close: any) => {

      return new Promise<any>(resolve => {

          this.Close = (value: any) => {
              let result = null;
              if (value) {
              result = value;
              }
              Close();
              return resolve(result);
          };

      });

  }

  protected Close: Function = () => undefined;

}