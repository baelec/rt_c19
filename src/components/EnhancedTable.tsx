import React from 'react'

import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import {
  Column,
  useGlobalFilter,
  useSortBy,
  useTable,
  UseGlobalFiltersInstanceProps, UseGlobalFiltersState, TableInstance,
} from 'react-table'
import TableToolbar from './TableToolbar'

export type Point = {
  country: string;
  normalizedValue: number;
  rawValue: number;
  population: number;
  date: string;
  rank: number;
};

type Props = {
  columns: Column<Point>[],
  data: Point[],
};

const EnhancedTable = ({
  columns,
  data,
}: Props) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { globalFilter },
    rows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    hooks => {
      hooks.allColumns.push(columns => [
        ...columns,
      ])
    }
  ) as UseGlobalFiltersInstanceProps<any> & TableInstance<any> & { state: UseGlobalFiltersState<any>};

  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar
          preGlobalFilteredRows={preGlobalFilteredRows}
          setGlobalFilter={setGlobalFilter}
          globalFilter={globalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </MaUTable>
    </TableContainer>
  );
}

export default EnhancedTable
