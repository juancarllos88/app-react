import React from "react";
import { textFilter } from 'react-bootstrap-table2-filter';

export const headers = [
  {
    dataField: "id",
    text: "Id",
    hidden: true
  },
  {
    dataField: "nome",
    text: "Nome",
    sort: true,
    filter: textFilter({
      placeholder: 'Nome...',
    }),
   
   
  },
  {
    dataField: "email",
    text: "Email",
    filter: textFilter({
      placeholder: 'Email...',
    }),
   
    
  },
  {
    dataField: "login",
    text: "Login",
    filter: textFilter({
      placeholder: 'Login...',
    }),
   
    
  },
  {
    dataField: "status",
    text: "Status",
   
   
  },
  {
    dataField: "acao",
    text: "Ações"
  },
];

// const defaultSorted = [{
//   dataField: 'email',
//   order: 'desc'
// }];

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total" style={{ marginLeft: "10px" }}>
    <strong>{from} - {to} de {size} Resultados </strong>
  </span>
);


export const paginationData = {

  paginationSize: 10,
  pageStartIndex: 0,
  firstPageText: 'First',
  prePageText: 'Back',
  nextPageText: 'Next',
  lastPageText: 'Last',
  nextPageTitle: 'First page',
  prePageTitle: 'Pre page',
  firstPageTitle: 'Next page',
  lastPageTitle: 'Last page',
  showTotal: true,
  paginationTotalRenderer: customTotal,
  disablePageTitle: true,
  sizePerPageList: [{
    text: '5', value: 5
  }, {
    text: '10', value: 10
  }, {
    text: '25', value: 25
  }]
};




