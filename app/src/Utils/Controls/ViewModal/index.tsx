import React from 'react';

export class ControlViewModal extends React.Component<Readonly<{Title: string}>> {

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