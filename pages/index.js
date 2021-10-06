import Head from "next/head";
import Container from "@mui/material/Container";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import SubjectForm from "../components/SubjectForm";
import { useState } from "react";

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState([]);

  const handleFormSubmit = (values) => {
    setData([...data, values]);
  }

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Predmet</TableCell>
                <TableCell>Vrsta nastave</TableCell>
                <TableCell>Broj sati</TableCell>
                <TableCell>Broj mojih grupa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, idx) => <TableRow key={idx}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.type}</TableCell>
                <TableCell>{row.hoursCount}</TableCell>
                <TableCell>{row.groupsCount}</TableCell>
              </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>

        <Button variant="contained" onClick={() => setFormOpen(true)}>Otvori</Button>
        <SubjectForm open={formOpen} onClose={() => setFormOpen(false)} onSubmit={handleFormSubmit} />
      </main>
    </Container>
  );
}
