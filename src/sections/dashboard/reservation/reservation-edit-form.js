import PropTypes from 'prop-types';
import { useCallback, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { reservationsApi } from "src/api/reservations";
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { wait } from 'src/utils/wait';
import axios from 'axios';

const statuses = [
  { text: 'Requested', value: 'REQUESTED' },
  { text: 'Pending', value: 'PENDING' },
  { text: 'Confirmed', value: 'CONFIRMED' },
  { text: 'Checked In', value: 'CHECKED_IN' },
  { text: 'Checked Out', value: 'CHECKED_OUT' },
  { text: 'Cancelled', value: 'CANCELLED' }
];
export const ReservationEditForm = (props) => {
  const { reservation, ...other } = props;

  const handleDelete = async (helpers) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const res = await axios.delete('http://localhost:3001/reservations/' + reservation.reservationId, { headers });
      console.log(res);
      await wait(500);
      helpers.setStatus({ success: true });
      helpers.setSubmitting(false);
      toast.success('Reservation deleted');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
      helpers.setStatus({ success: false });
      helpers.setErrors({ submit: err.message });
      helpers.setSubmitting(false);
    }
  }
  const statusOption = statuses.find((bookingStatus) => bookingStatus.value === reservation.bookingStatus);
  const formik = useFormik({
    initialValues: {
      // email: reservation.email || '',
      // firstName: reservation.guest.firstName || '',
      // lastName: reservation.lastName || '',
      bookingStatus: statusOption || null,
      // password: reservation.password || '',
      // phone: reservation.phone || '',
      // avatar: reservation.avatar || '',
      submit: null
    },
    validationSchema: Yup.object({
      // email: Yup
      //   .string()
      //   .email('Must be a valid email')
      //   .max(255)
      //   .required('Email is required'),
      // firstName: Yup
      //   .string()
      //   .max(255)
      //   .required('First Name is required'),
      // lastName: Yup
      //   .string()
      //   .max(255)
      //   .required('Last Name is required'),
      // password: Yup
      //   .string()
      //   .max(255)
      //   .required('Password is required'),
      // phone: Yup.string().max(15),
      // avatar: Yup.string().max(255)
    }),
    onSubmit: async (values, helpers) => {
      try {
        const token = sessionStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${token}`
        };
        const res = await axios.put('http://localhost:3001/reservations/' + reservation.reservationId, values, { headers });
        await wait(500);
        // console.log("Put reservation", reservation);
        console.log("VALUES", values);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Reservation updated');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue('bookingStatus', reservation.bookingStatus || '');
    // console.log("Reservation", reservation.bookingStatus);
  }, [reservation.bookingStatus, formik.setFieldValue]);




  return (
    <form
      onSubmit={formik.handleSubmit}
      {...other}>
      <Card>
        <CardHeader title="Edit Reservation" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={6}
            >
              {/* <TextField
                error={!!(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                value={formik.values.firstName}
              /> */}
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              {/* <TextField
                error={!!(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                value={formik.values.lastName}
              /> */}
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              {/* <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                value={formik.values.email}
              /> */}
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              {/* <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                value={formik.values.phone}
              /> */}
            </Grid>


            <Grid
              xs={12}
              md={6}
            >
              {/* <TextField
                error={!!(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                type="password"
                value={formik.values.password}
              /> */}
            </Grid>

            <Grid
              xs={12}
              md={6}
            >
              <Autocomplete
                options={statuses}
                label="Status"
                getOptionLabel={(option) => option.text}
                onChange={(event, value) => {
                  formik.setFieldValue('bookingStatus', value ? value.value : '');
                }}

                value={statuses.find((option) => option.value === formik.values.bookingStatus) || null}

                renderInput={(params) => (
                  <TextField {...params}
                    // required
                    label="Status"
                    name="bookingStatus"
                    fullWidth
                  // value={formik.values.bookingStatus}
                  />
                )}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              {/* <TextField
                error={!!(formik.touched.avatar && formik.errors.avatar)}
                fullWidth
                helperText={formik.touched.avatar && formik.errors.avatar}
                label="Avatar"
                name="avatar"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.avatar}
              /> */}
            </Grid>
          </Grid>
          <Stack
            divider={<Divider />}
            spacing={3}
            sx={{ mt: 3 }}
          >

          </Stack>
        </CardContent>
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            flexWrap="wrap"
            spacing={3}
            sx={{ p: 3 }}
          >
            <Button
              disabled={formik.isSubmitting}
              type="submit"
              variant="contained"
            >
              Update
            </Button>
            <Button
              color="inherit"
              component={RouterLink}
              disabled={formik.isSubmitting}
              // href={paths.dashboard.reservations.details}
              to={`/dashboard/reservations/${reservation.reservationId}/edit`}
            >
              Cancel
            </Button>

          </Stack>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row'
            }}
            flexWrap="wrap"
            spacing={3}
            sx={{ p: 3 }}>
            <Button
              color="error"
              variant="outlined"
              component={RouterLink}
              disabled={formik.isSubmitting}
              onClick={handleDelete}
              // to={`/dashboard/reservations/${reservation.reservationId}/edit`}
              to={`/dashboard/reservations`}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Card>
    </form>
  );
};

ReservationEditForm.propTypes = {
  reservation: PropTypes.object.isRequired
};
