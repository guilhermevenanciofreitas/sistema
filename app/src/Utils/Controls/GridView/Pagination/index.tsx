import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { DropDownList, DropDownListItem } from "../..";

type Parameter = {
    pageChangeHandler: Function;

    totalRows: any;
    defaultRowsPerPage: number;
    //currentPage: any;
    records: Array<number>;

    style: 'Dropdown' | 'Buttons'
}

export const ControlPagination = ({pageChangeHandler, totalRows, defaultRowsPerPage, records, style}: Parameter) => {

  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage || 100);

  // Calculating max number of pages
  const noOfPages = Math.ceil((totalRows || 0) / rowsPerPage);

  // Creating an array with length equal to no.of pages
  const pagesArr = [...new Array(noOfPages)];

  // State variable to hold the current page. This value is
  // passed to the callback provided by the parent
  // const [currentPage, setCurrentPage] = useState(1);

  // Navigation arrows enable/disable state
  const [currentPage, setCurrentPage] = useState(1);
  


  // These variables give the first and last record/row number
  // with respect to the current page
  const [pageFirstRecord, setPageFirstRecord] = useState(1);
  const [pageLastRecord, setPageLastRecord] = useState(rowsPerPage);

  // Onclick handlers for the butons
  const onNextPage = () => onPageSelect(rowsPerPage, currentPage + 1);
  const onPrevPage = () => onPageSelect(rowsPerPage, currentPage - 1);

  const onPageSelect = (rowsPerPage: any, currentPage: any) => {
    setCurrentPage(currentPage);
    pageChangeHandler(rowsPerPage, currentPage);
  };

  // To set the starting index of the page
  useEffect(() => {

    const skipFactor = (currentPage - 1) * rowsPerPage;

    // Some APIs require skip for paginaiton. If needed use that instead
    // pageChangeHandler(skipFactor);
    // pageChangeHandler(currentPage)
    setPageFirstRecord(skipFactor + 1);
    
  }, [currentPage]);

  // To set the last index of the page
  useEffect(() => {
    const count = pageFirstRecord + rowsPerPage;
    setPageLastRecord(count > totalRows ? totalRows : count - 1);
  }, [pageFirstRecord, rowsPerPage, totalRows]);

  return (
    <div className={styles.pagination}>

      <div className={styles.pageInfo}>
        Registros&nbsp;
      </div>

      <DropDownList SelectedValue={rowsPerPage} OnChange={(args: any) => {setRowsPerPage(args.Value);pageChangeHandler(args.Value, 1)}}>
          {records.map((num, index) => {
            return <DropDownListItem Label={num.toString()} Value={num} key={index}></DropDownListItem>
          })}
      </DropDownList>
      
      <div className={styles.pageInfo}>
        &nbsp;Mostrando {pageFirstRecord}-{pageLastRecord} de {totalRows}
      </div>

      <button className={styles.pageBtn} onClick={onPrevPage} disabled={currentPage == 1}>
        &#8249;
      </button>

      {style == 'Buttons' &&
        <>
          {pagesArr.map((num, index) => (
            <button onClick={() => onPageSelect(rowsPerPage, index + 1)} className={`${styles.pageBtn} ${index + 1 === currentPage ? styles.activeBtn : ""}`} key={index}>
              {index + 1}
            </button>
          ))}
        </>
      }
      
      {style == 'Dropdown' &&
        <DropDownList SelectedValue={currentPage} OnChange={(args: any) => {if(args.Value == null) return;setCurrentPage(args.Value);pageChangeHandler(rowsPerPage, args.Value)}}>
          {pagesArr.map((num, index) => (
            <DropDownListItem Label={(index + 1).toString()} Value={index + 1}></DropDownListItem>
          ))}
        </DropDownList>
      }

      <button className={styles.pageBtn} onClick={onNextPage} disabled={noOfPages == currentPage}>
        &#8250;
      </button>
    
    </div>
  );
};