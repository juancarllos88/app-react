import React  from "react";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";

function DataTable({ loadData, pagination }) {
  const {
    header,
    rows,
    totalElements,
    lastPage,
    page,
    totalPages,
  } = pagination;

  const renderHeader = (_cell, cellIndex) => {
    return <th key={`heading-${cellIndex}`}>{header[cellIndex]}</th>;
  };

  const renderRow = (_row, rowIndex) => {
    return (
      <tr key={`row-${rowIndex}`}>
        {rows[rowIndex].map((_cell, cellIndex) => {
          return (
            <td key={`${rowIndex}-${cellIndex}`}>
              {rows[rowIndex][cellIndex]}
            </td>
          );
        })}
      </tr>
    );
  };

  const renderPaginationItem = (item) => {
    return (
      <PaginationItem key={item.valor} active={item.status}>
        <PaginationLink tag="button" onClick={loadData} value={item.valor}>
          {item.valor + 1}
        </PaginationLink>
      </PaginationItem>
    );
  };
  

  let navBar = [];
  let control = [0, 1, 2];
  if (page > 0 && page % 3 === 0) {
    control = [];
    for (let i = page; i < page + 3; i++) {
      control.push(i);
    }
  } else if (page > control[control.length - 1]) {
    let inicio = control[control.length - 1] + 1;
    let fim = inicio + 3;
    control = [];
    for (let i = inicio; i < fim; i++) {
      control.push(i);
    }
  }
  for (let i = 0; i < control.length; i++) {
    const value = control[i];
    if (value < totalPages) {
      if (value === page) {
        navBar.push({ valor: value, status: true });
      } else {
        navBar.push({ valor: value, status: false });
      }
    }
  }


  // for (let i = 0; i < totalPages; i++) {
  //   if (i === page) {
  //     navBar.push({ valor: i, status: true });
  //   } else {
  //     navBar.push({ valor: i, status: false });
  //   }
  // }

  const head = header.map(renderHeader);
  const body = rows.map(renderRow);
  const paginationItem = navBar.map(renderPaginationItem);
  const next = parseInt(page + 1);
  const prev = parseInt(page - 1);

  return (
    <>
      <div style={{ marginTop: "50px" }} />
      <Table hover bordered striped responsive size="sm">
        <thead>
          <tr>{head}</tr>
        </thead>
        <tbody>{body}</tbody>
      </Table>
      <strong>
        <div style={{ float: "right" }}>
          Total de Registros: {totalElements}
        </div>
      </strong>
      <Pagination>
        <PaginationItem>
          <PaginationLink tag="button" onClick={loadData} value={prev}>
          Prev
          </PaginationLink>
        </PaginationItem>

        {paginationItem}

        {lastPage ? (
          ""
        ) : (
          <PaginationItem>
            <PaginationLink tag="button" onClick={loadData} value={next}>
              Prev
            </PaginationLink>
          </PaginationItem>
        )}
      </Pagination>
    </>
  );
}

export default DataTable;
