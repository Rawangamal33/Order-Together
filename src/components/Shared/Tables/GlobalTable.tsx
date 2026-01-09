import LinearProgress from '@mui/material/LinearProgress';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import type { ReactNode } from 'react';

export interface CellProps<T> {
  field: keyof T;
  label?: string;
  minWidth?: number;
  width?: number | string;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  ariaLabel: string;
  cells: CellProps<T>[];
  data: T[];
  disabledRow?: (row: T) => string | undefined;
  isLoading?: boolean;
  emptyDataState?: ReactNode;
}

const GlobalTable = <T,>({
  ariaLabel,
  cells,
  data,
  disabledRow,
  isLoading,
  emptyDataState,
}: TableProps<T>) => {
  const HeaderCellStyles = {
    color: '#6b7280',
    fontSize: '12px',
    padding: '12px 24px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    fontWeight: '600',
  };
  return (
    <TableContainer component={Paper}>
      <Table aria-label={ariaLabel}>
        <TableHead>
          <TableRow sx={{ background: '#f9fafb' }}>
            {cells?.map((cell) => {
              return (
                <TableCell key={String(cell.field)} sx={HeaderCellStyles}>
                  {cell.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading && data && data.length > 0
            ? data?.map((row, i) => {
                return (
                  <TableRow
                    key={i}
                    className={`${disabledRow?.(row)}
                    `}
                    sx={{
                      borderBottom: '1px solid #e5e7eb',
                      transition: 'background-color 0.2s',

                      '&:hover': {
                        backgroundColor: '#f9fafb',
                      },

                      '&.hidden-row': {
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    {cells.map((cell, c) => {
                      return (
                        <TableCell
                          key={c}
                          sx={{
                            minWidth: cell.minWidth,
                            width: cell.width,
                          }}
                        >
                          {renderCellData(cell, row)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : null}
          {!isLoading && (!data || data.length === 0) && (
            <TableRow>
              <TableCell
                colSpan={cells.length}
                className='text-center text-gray-500 space-y-2'
              >
                {emptyDataState || (
                  <div className='py-8'>
                    <p className='text-lg font-semibold text-gray-600 text-center'>
                      No data available.
                    </p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
          {isLoading && (
            <TableRow>
              <TableCell colSpan={cells.length}>
                <LinearProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const renderCellData = <T,>(cell: CellProps<T>, row: T): ReactNode => {
  return cell.render ? cell.render(row) : <>{row[cell.field]}</>;
};

export default GlobalTable;
