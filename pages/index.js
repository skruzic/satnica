import { useState } from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SubjectForm from '../components/SubjectForm';
import Summary from '../components/Summary';
import Footer from '../components/Footer';
import Person from '../components/Person';
import AddIcon from '@mui/icons-material/Add';

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const [data, setData] = useState([]);
  const [target, setTarget] = useState('405');
  const [mentor, setMentor] = useState(false);

  const handleFormSubmit = (values) => {
    setData([...data, values]);
  };

  const handleDeleteItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleTargetChange = (e) => {
    setTarget(e.target.value);
  };

  const handleMentorChange = (e) => {
    setMentor(e.target.checked);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Head>
        <title>Izračun satnice prema GKO</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />

      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <Typography variant="h2" component="h1">
          Izračun satnice
        </Typography>

        <Typography>
          Aplikacija za izračun radnih sati prema odluci Fakultetskog vijeća
          FESB-a. <strong>Ovo nije službeni izračun.</strong> Koristite na
          vlastitu odgovornost.
        </Typography>

        <Person
          hours={target}
          onHoursChange={handleTargetChange}
          mentor={mentor}
          onMentorChange={handleMentorChange}
        />

        <Box sx={{ my: 2 }}>
          <Button
            variant="contained"
            onClick={() => setFormOpen(true)}
            startIcon={<AddIcon />}
          >
            Dodaj predmet
          </Button>
        </Box>

        {data.length > 0 && (
          <Summary
            data={data}
            target={parseFloat(target)}
            mentor={+mentor * 96}
            onDeleteItem={handleDeleteItem}
          />
        )}

        <SubjectForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      </Container>
      <Footer />
    </Box>
  );
}
