import React from "react";
import styles from "./styles.module.css";
import { DropDownList, DropDownListItem } from "../..";

type Parameter = {
    Type: 'Dropdown' | 'Buttons'
    Count: any;
    Limit: number;
    OffSet: number;
    Records: Array<number>;
    OnPageChange: Function;
}

export class ControlPagination extends React.Component<Parameter> {

  private noOfPages = () => Math.ceil((this.props.Count || 0) / this.props.Limit);
  private pagesArr =() => [...new Array(this.noOfPages())];

  private pageFirstRecord = () => ((this.props.OffSet - 1) * this.props.Limit) + 1;
  private pageLastRecord = () =>  this.pageFirstRecord() + this.props.Limit > this.props.Count ? this.props.Count : (this.pageFirstRecord() + this.props.Limit - 1);

  render(): React.ReactNode {
    return(
      <div className={styles.pagination}>

        <div className={styles.pageInfo}>
          Registros&nbsp;
        </div>

        <DropDownList SelectedValue={this.props.Limit} OnChange={(args: any) => this.props.OnPageChange(args.Value, 1)}>
            {this.props.Records.map((num, index) => {
              return <DropDownListItem Label={num.toString()} Value={num} key={index}></DropDownListItem>
            })}
        </DropDownList>

        <div className={styles.pageInfo}>
          &nbsp;Mostrando {this.pageFirstRecord()} - {this.pageLastRecord()} de {this.props.Count}
        </div>

        <button className={styles.pageBtn} onClick={() => this.props.OnPageChange(this.props.Limit, this.props.OffSet - 1)} disabled={this.props.OffSet == 1}>
          &#8249;
        </button>

        {this.props.Type == 'Buttons' &&
          <>
            {this.pagesArr().map((num, index) => (
              <button onClick={() => this.props.OnPageChange(this.props.Limit, index + 1)} className={`${styles.pageBtn} ${index + 1 === this.props.OffSet ? styles.activeBtn : ""}`} key={index}>
                {index + 1}
              </button>
            ))}
          </>
        }

        {this.props.Type == 'Dropdown' &&
          <DropDownList SelectedValue={this.props.OffSet || 1} OnChange={(args: any) => {if(args.Value == null) return;this.props.OnPageChange(this.props.Limit, args.Value)}}>
            {this.props.OffSet == 1 && <DropDownListItem Label={"1"} Value={1}></DropDownListItem>}
            {this.pagesArr().map((num, index) => (
              <DropDownListItem Label={(index + 1).toString()} Value={index + 1}></DropDownListItem>
            ))}
          </DropDownList>
        }

        <button className={styles.pageBtn} onClick={() => this.props.OnPageChange(this.props.Limit, this.props.OffSet + 1)} disabled={this.noOfPages() == this.props.OffSet}>
          &#8250;
        </button>

      </div>
    );
  }

}