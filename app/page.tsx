'use client';

import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SubjectForm from '../components/subject-form';
import Summary from '../components/summary';
import Footer from '../components/footer';
import Person from '../components/person';
import AddIcon from '@mui/icons-material/Add';
import useStorage from '../hooks/use-storage';

export default function Home() {
  const [formOpen, setFormOpen] = useState(false);
  const courses = useStorage((state) => state.courses);
  const addCourse = useStorage((state) => state.addCourse);
  const removeCourse = useStorage((state) => state.removeCourse);
  const target = useStorage((state) => state.target);
  const setTarget = useStorage((state) => state.updateTarget);
  const [mentor, setMentor] = useState(false);

  const handleFormSubmit = (values) => addCourse(values);

  const handleDeleteItem = (id) => removeCourse(id);

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(e.target.value));
  };

  const handleMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMentor(e.target.checked);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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

        {courses.length > 0 && (
          <Summary
            data={courses}
            target={target}
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
