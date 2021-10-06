import { useFormik } from "formik";
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useState } from "react";

const SubjectForm = ({ open, onClose, onSubmit }) => {
  const formik = useFormik({
    initialValues: { name: "", type: "", hoursCount: 0, groupsCount: 0 },
    onSubmit: (values) => {
      onSubmit(values);
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>TEST</DialogTitle>
      <DialogContent>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
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
              <Select
                fullWidth
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="hoursCount"
                //label="Broj sati"
                value={formik.values.hoursCount}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="groupsCount"
                //label="Broj sati"
                value={formik.values.groupsCount}
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
