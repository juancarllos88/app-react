import React from "react";
import { Pagination, PaginationItem, PaginationLink, Table } from "reactstrap";

export default function DataTable({
  header,
  rows,
  page,
  pagination,
  lastPage,
  loadData,
  totalElements,
}) {
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

  console.log('valor',page)
  const thead = header.map(renderHeader);
  const tbody = rows.map(renderRow);

  return (
    <>
      <div style={{ marginTop: "50px" }} />
      <Table hover bordered striped responsive size="sm">
        <thead>
          <tr>{thead}</tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
      <strong>
        <div style={{ float: "right" }}>Total de Registros: {totalElements}</div>
      </strong>
      <Pagination>
        <PaginationItem>
          <PaginationLink
            tag="button"
            onClick={loadData}
            value={parseInt(page) - 1}
          >
            Prev
          </PaginationLink>
        </PaginationItem>

        {pagination.map((page) => (
          <PaginationItem key={page.valor} active={page.status}>
            <PaginationLink tag="button" onClick={loadData} value={page.valor}>
              {page.valor + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {lastPage ? (
          ""
        ) : (
          <PaginationItem>
            <PaginationLink
              tag="button"
              onClick={loadData}
              value={parseInt(page) + 1}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        )}
      </Pagination>
    </>
  );
}
