import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable, {Point} from './components/EnhancedTable'
import {Column} from "react-table";
import data from './results.json';

const Header = ({children}: { children: string }) => (
    <span style={{
        display: 'flex',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    }}>
        {children}
    </span>
);

const columns: Column<Point>[] = [
    {
        Header: <Header>Rank</Header>,
        accessor: 'rank',
    },
    {
        Header: <Header>Region</Header>,
        accessor: 'country',
    },
    {
        Header: <Header>Confirmed Cases (Normalized per 100,000)</Header>,
        accessor: 'normalizedValue',
    }
]

const App = () => {
    return (
        <div style={{maxWidth: 1024, margin: 'auto'}}>
            <CssBaseline/>
            <EnhancedTable
                columns={columns}
                data={data}
            />
        </div>
    )
}

export default App
