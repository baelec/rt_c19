import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';
import {
  Column,
  useGlobalFilter,
  useSortBy,
  useTable,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersState,
  TableInstance,
} from 'react-table'
import { TableToolbar } from './TableToolbar'

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

export const EnhancedTable = ({
  columns,
  data,
}: Props) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    state: {globalFilter},
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
  ) as UseGlobalFiltersInstanceProps<any> & TableInstance<any> & { state: UseGlobalFiltersState<any> };

  return (
    <TableContainer>
      <TableToolbar
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <Table {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps({...column.getSortByToggleProps(), title: undefined}))}
                >
                  <div style={{display: 'inline-flex'}}>
                    {column.render('Header')}
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </div>
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
      </Table>
    </TableContainer>
  );
};