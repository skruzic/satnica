import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Copyright = () => (
  <Typography variant="body2" color="text.secondary">
    Copyright © {new Date().getFullYear()}
  </Typography>
);

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 3,
      px: 2,
      mt: 'auto',
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    }}
  >
    <Container>
      <Typography>Koristite na vlastitu odgovornost</Typography>
      <Copyright />
    </Container>
  </Box>
);

export default Footer;
