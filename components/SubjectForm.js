import { useFormik } from "formik";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import * as Yup from "yup";

const SubjectForm = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      hours: 0,
      groups: 0,
      students: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Obavezno polje"),
      type: Yup.string().max(2).required("Obavezno polje"),
      hours: Yup.number().required("Obavezno polje"),
      groups: Yup.number().required("Obavezno polje"),
      students: Yup.number().required("Obavezno polje"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      onClose();
      resetForm();
      //alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>TEST</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Naziv predmeta"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="type-select-label">Vrsta nastave</InputLabel>
                <Select
                  labelId="type-select-label"
                  label="Vrsta nastave"
                  name="type"
                  displayEmpty
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <MenuItem disabled selected>
                    <em>Odaberi...</em>
                  </MenuItem>
                  <MenuItem value="P">Predavanja</MenuItem>
                  <MenuItem value="S">Seminari</MenuItem>
                  <MenuItem value="AV">Auditorne vježbe</MenuItem>
                  <MenuItem value="LV">Laboratorijske vježbe</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="hours"
                label="Broj sati"
                value={formik.values.hours}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="groups"
                label="Broj mojih grupa"
                value={formik.values.groups}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="students"
                label="Broj studenata po grupi"
                value={formik.values.students}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Sačuvaj
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SubjectForm;
