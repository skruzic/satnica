import Box from "@mui/material/Box";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import TextField from "@mui/material/TextField";

const Person = ({ hours, onBlur }) => {
  return (
    <Box sx={{ my: 5 }}>
      <TextField
        label="Godišnja nastava (sati)"
        InputLabelProps={{ shrink: true }}
        value={hours}
        onBlur={onBlur}
      />
    </Box>
  );
};

export default Person;
