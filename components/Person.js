import Box from "@mui/material/Box";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";

const Person = ({ hours, mentor, onHoursChange, onMentorChange }) => {
  return (
    <>
      <Box sx={{ mt: 5, mb: 2 }}>
        <TextField
          label="Godišnja nastava (sati)"
          InputLabelProps={{ shrink: true }}
          value={hours}
          onChange={onHoursChange}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      </Box>
      <Box sx={{ mt: 1, mb: 1 }}>
        <FormControlLabel
          control={<Switch checked={mentor} onChange={onMentorChange} />}
          label="Mentorski rad"
        />
      </Box>
    </>
  );
};

export default Person;
