import React from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import {IconButton, InputAdornment, TextField} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: '0 !important',
    width: '100% !important',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
}))

type Props = {
  preGlobalFilteredRows: any[],
  globalFilter: string,
  setGlobalFilter: (filter: string | undefined) => void,
};

const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: Props) => {
  const classes = useStyles()
  const count = preGlobalFilteredRows.length

  // Global filter only works with pagination from the first page.
  // This may not be a problem for server side pagination when
  // only the current page is downloaded.

  return (
    <div className={classes.search}>
      <TextField
          fullWidth
          variant="outlined"
        value={globalFilter || ''}
        onChange={e => {
          setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} records...`}
        inputProps={{ 'aria-label': 'search'  }}
          InputProps={{endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            )}}
      />
    </div>
  )
}

export default GlobalFilter
