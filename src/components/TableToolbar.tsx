import React from 'react'

import clsx from 'clsx'
import GlobalFilter from './GlobalFilter'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

type Props = {
  preGlobalFilteredRows: any[];
  setGlobalFilter: (filter: string | undefined) => void;
  globalFilter: string;
};

const TableToolbar = (props: Props) => {
  const classes = useToolbarStyles()
  const {
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
  } = props
  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  )
}

export default TableToolbar;
