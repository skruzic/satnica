import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  computeWorkHours,
  computeTotalWorkHours,
  nonRepetitive,
  rnri,
} from '../utils/calculations';

const Summary = ({ data, target, mentor, onDeleteItem }) => {
  return (
    <Card>
      <TableContainer component={CardContent}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Predmet</TableCell>
              <TableCell>Vrsta nastave</TableCell>
              <TableCell>Broj sati</TableCell>
              <TableCell>Broj mojih grupa</TableCell>
              <TableCell>Broj studenata u grupi</TableCell>
              <TableCell>Postotak nastave</TableCell>
              <TableCell>Ukupno radnih sati</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.hours}</TableCell>
                <TableCell>{row.groups}</TableCell>
                <TableCell>{row.students}</TableCell>
                <TableCell>{(row.scale * 100).toFixed(2)}%</TableCell>
                <TableCell>
                  {computeWorkHours(
                    row.type,
                    row.hours,
                    row.groups,
                    row.students,
                    row.scale
                  ).toFixed(2)}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onDeleteItem(idx)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} align="right">
                Ukupno sati
              </TableCell>
              <TableCell align="right">
                {computeTotalWorkHours(data).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} align="right">
                Udio nerepetitivne nastave
              </TableCell>
              <TableCell align="right">
                {nonRepetitive(data).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} align="right">
                Udio repetitivne nastave
              </TableCell>
              <TableCell align="right">
                {(1 - nonRepetitive(data)).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} align="right">
                RNRI
              </TableCell>
              <TableCell align="right">{rnri(data).toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6} align="right">
                Prekovremeni rad
              </TableCell>
              <TableCell align="right">
                {(
                  computeTotalWorkHours(data) +
                  mentor -
                  rnri(data, target)
                ).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Summary;
