import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useCallback, useState, useEffect } from 'react';
// import { format } from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
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
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

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
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(dayjs(reservation.arrivalDate).toDate());
  const [endDate, setEndDate] = useState(dayjs(reservation.departureDate).toDate());


  const handleDelete = async (helpers) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${token}`
      };
      const res = await axios.delete('http://localhost:3001/reservations/' + reservation.reservationId, { headers });
      // console.log('Delete', res.data);
      await wait(500);
      // helpers.setStatus({ success: true });
      // helpers.setSubmitting(false);
      toast.success('Reservation deleted');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
      // helpers.setStatus({ success: false });
      // helpers.setErrors({ submit: err.message });
      // helpers.setSubmitting(false);
    }
  }
  const statusOption = statuses.find((status) => status.value === reservation.status);
  const formik = useFormik({
    initialValues: {
      email: reservation.guest.email || '',
      firstName: reservation.guest.firstName || '',
      lastName: reservation.guest.lastName || '',
      // role: reservation.role || '',
      // role: roleOption || { text: '', value: '' },
      status: statusOption || null,
      // password: reservation.password || '',
      // phone: reservation.phone || '',
      // avatar: reservation.avatar || '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      firstName: Yup
        .string()
        .max(255)
        .required('First Name is required'),
      lastName: Yup
        .string()
        .max(255)
        .required('Last Name is required'),
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
        // console.log('Put', res.data);
        // await reservationsApi.postReservation(reservation.userId);
        await wait(500);
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
    formik.setFieldValue('status', reservation.bookingStatus || '');
    console.log("Reservation", reservation.bookingStatus);
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
            {/* <Stack
              alignItems="center"
              direction="row"
              spacing={3}
            >
              <MobileDatePicker
                label="Start Date"
                onChange={(newDate) => setStartDate(newDate)}
                value={startDate}
              />
              <MobileDatePicker
                label="End Date"
                onChange={(newDate) => setEndDate(newDate)}
                value={endDate}
              />
            </Stack> */}
            {/* <Grid container justifyContent="space-between"> */}


            {/* <Grid xs={12} md={6}>
                <MobileDatePicker
                  label="Start Date"
                  onChange={(newDate) => setStartDate(newDate)}
                  value={startDate}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <MobileDatePicker
                  label="End Date"
                  onChange={(newDate) => setEndDate(newDate)}
                  value={endDate}
                  fullWidth
                />
              </Grid> */}
            {/* </Grid> */}


            <Grid
              xs={12}
              md={6}
            >
              <DemoItem label="Responsive variant" component="DateRangePicker">
                <DateRangePicker
                  value={[startDate, endDate]}
                  onChange={(newDates) => {
                    setStartDate(newDates[0]);
                    setEndDate(newDates[1]);
                  }}
                />
              </DemoItem>

            </Grid>
            <Grid
              xs={12}
              md={6}
            >

            </Grid>


            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.firstName && formik.errors.firstName)}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First Name"
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.firstName}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.lastName && formik.errors.lastName)}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last Name"
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.lastName}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                required
                value={formik.values.email}
              />
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
                  formik.setFieldValue('status', value ? value.value : '');
                }}
                value={statuses.find((option) => option.value === formik.values.status) || null}
                renderInput={(params) => (
                  <TextField {...params}
                    required
                    label="Status"
                    name="status"
                    fullWidth

                  />
                )}
              />
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
              to={`/dashboard/reservations/${reservation.userId}/edit`}
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
              to={`/dashboard/reservations`}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Card>
    </form >
  );
};

ReservationEditForm.propTypes = {
  reservation: PropTypes.object.isRequired
};
