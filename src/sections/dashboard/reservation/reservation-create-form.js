import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/it';
import dayjs from 'dayjs';
import { useCallback, useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import SvgIcon from '@mui/material/SvgIcon';
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
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import { reservationsApi } from "src/api/reservations";
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';
import { wait } from 'src/utils/wait';
import axios from 'axios';

dayjs.locale('it');

const statuses = [
  { text: 'Requested', value: 'REQUESTED' },
  { text: 'Pending', value: 'PENDING' },
  { text: 'Confirmed', value: 'CONFIRMED' },
  { text: 'Checked In', value: 'CHECKED_IN' },
  { text: 'Checked Out', value: 'CHECKED_OUT' },
  { text: 'Cancelled', value: 'CANCELLED' }
];


export const ReservationCreateForm = () => {
  // const { reservation, ...other } = props;
  // const [startDate, setStartDate] = useState(dayjs(reservation.arrivalDate).toDate().getTime() + Math.abs(dayjs(reservation.arrivalDate).toDate().getTimezoneOffset() * 60000));
  // const [endDate, setEndDate] = useState(dayjs(reservation.departureDate).toDate().getTime() + Math.abs(dayjs(reservation.departureDate).toDate().getTimezoneOffset() * 60000));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const formik = useFormik({
    initialValues: {
      email: 'bruno.barbieri@gmail.com',
      firstName: '',
      lastName: '',
      bookingStatus: '',
      citizenship: 'Italiana',
      phone: '333777777',
      note: '',
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
      citizenship: Yup
        .string()
        .max(255)
        .required('Citizenship is required'),
      phone: Yup.string().max(15),
    }),


    // onSubmit: async (values, helpers) => {
    //   const token = sessionStorage.getItem('accessToken');
    //   const headers = {
    //     Authorization: `Bearer ${token}`
    //   };
    //   try {

    //     const guestValuesToSubmit = {
    //       email: values.email,
    //       firstName: values.firstName,
    //       lastName: values.lastName,
    //       citizenship: values.citizenship,
    //       phone: values.phone,
    //       note: values.note,
    //     };
    //     const guestResp = await axios.post('http://localhost:3001/guests', guestValuesToSubmit, { headers });
    //     console.log(guestResp);
    //     await wait(500);
    //     // console.log("Put reservation", reservation);
    //     helpers.setStatus({ success: true });
    //     helpers.setSubmitting(false);
    //     toast.success('Guest created');
    //   } catch (err) {
    //     console.error(err);
    //     toast.error('Something went wrong!');
    //     helpers.setStatus({ success: false });
    //     helpers.setErrors({ submit: err.message });
    //     helpers.setSubmitting(false);
    //   }

    //   try {
    //     const reservationValuesToSubmit = {
    //       bookingStatus: values.bookingStatus,
    //       arrivalDate: startDate,
    //       departureDate: endDate,
    //       guest: {
    //         guestId: "808ab052-686b-4275-81d8-d2712e825c77",
    //         email: values.email,
    //         firstName: values.firstName,
    //         lastName: values.lastName,
    //         citizenship: values.citizenship,
    //         phone: values.phone,
    //         note: values.note,
    //       }
    //     };
    //     // console.log("VALUES", valuesToSubmit);
    //     const res = await axios.post('http://localhost:3001/reservations', reservationValuesToSubmit, { headers });
    //     // console.log(res);
    //     await wait(500);
    //     // console.log("Put reservation", reservation);
    //     helpers.setStatus({ success: true });
    //     helpers.setSubmitting(false);
    //     toast.success('Reservation created');
    //   } catch (err) {
    //     console.error(err);
    //     toast.error('Something went wrong!');
    //     helpers.setStatus({ success: false });
    //     helpers.setErrors({ submit: err.message });
    //     helpers.setSubmitting(false);
    //   }
    // },
    onSubmit: async (values, helpers) => {
      const token = sessionStorage.getItem('accessToken');
      const headers = {
        Authorization: `Bearer ${token}`
      };

      try {
        // Creazione del guest
        const guestValuesToSubmit = {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          citizenship: values.citizenship,
          phone: values.phone,
          note: values.note,
        };

        const guestResp = await axios.post('http://localhost:3001/guests', guestValuesToSubmit, { headers });

        // Ottieni l'oggetto guest appena creato
        const guestData = guestResp.data;

        // Creazione della prenotazione con tutti i dati del guest appena creato
        const reservationValuesToSubmit = {
          bookingStatus: values.bookingStatus,
          arrivalDate: startDate,
          departureDate: endDate,
          guest: guestData, // Utilizza l'intero oggetto guestData
        };

        const res = await axios.post('http://localhost:3001/reservations', reservationValuesToSubmit, { headers });

        await wait(500);
        helpers.setStatus({ success: true });
        helpers.setSubmitting(false);
        toast.success('Guest created');
        toast.success('Reservation created');
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong!');
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },

  });

  const handleDateChange = useCallback((field, newValue) => {
    if (field === 'arrivalDate') {
      setStartDate(newValue.toISOString());
    } else if (field === 'departureDate') {
      setEndDate(newValue.toISOString());
    }
  }, []);

  return (
    <form
      onSubmit={formik.handleSubmit}
    // {...other}
    >
      <Card>
        <CardHeader title="Create Reservation" />
        <CardContent sx={{ pt: 0 }}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              md={3}
            >
              <DatePicker
                label="Arrival Date"
                format="dd/MM/yyyy"
                slotProps={{ textField: { fullWidth: true } }}
                value={formik.values.arrivalDate}
                onChange={(newValue) => handleDateChange('arrivalDate', newValue)}
              />
            </Grid>
            <Grid
              xs={12}
              md={3}
            >


              <DatePicker
                label="Departure Date"
                format="dd/MM/yyyy"
                slotProps={{ textField: { fullWidth: true } }}
                value={formik.values.departureDate}
                onChange={(newValue) => handleDateChange('departureDate', newValue)}
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
            {/* <Grid
              xs={12}
              md={12}
            >
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6"
                sx={{ mb: -1, mt: 2 }}>
                Search Existing Guest
              </Typography>
            </Grid> */}
            {/* <Stack
              alignItems="center"
              direction="row"
              flexWrap="wrap"
              spacing={3}
              sx={{ p: 3 }}
            > */}
            {/* <Box
              component="form"
              // onSubmit={handleQueryChange}
              sx={{ flexGrow: 1 }}
            > */}
            {/* <Grid
              xs={12}
              md={12}
            >
              <OutlinedInput
                defaultValue=""
                fullWidth
                // inputProps={{ ref: queryRef }}
                placeholder="Search guests"
                startAdornment={(
                  <InputAdornment position="start">
                    <SvgIcon>
                      <SearchMdIcon />
                    </SvgIcon>
                  </InputAdornment>
                )}
              />
            </Grid> */}
            {/* </Box> */}
            {/* <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField> */}
            {/* </Stack> */}
            <Grid
              xs={12}
              md={12}
            >
              {/* <Divider sx={{ mb: 3 }} /> */}
              <Typography variant="h6"
                sx={{ mb: -1, mt: 2 }}>
                Add New Guest
              </Typography>
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
                // required
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
                // required
                value={formik.values.lastName}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.citizenship && formik.errors.citizenship)}
                fullWidth
                helperText={formik.touched.citizenship && formik.errors.citizenship}
                label="Citizenship"
                name="citizenship"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                value={formik.values.citizenship}
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
                // required
                value={formik.values.email}
              />
            </Grid>


            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.phone && formik.errors.phone)}
                fullWidth
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone"
                name="phone"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                // required
                value={formik.values.phone}
              />
            </Grid>


            <Grid
              xs={12}
              md={6}
            >
              <TextField
                error={!!(formik.touched.note && formik.errors.note)}
                fullWidth
                helperText={formik.touched.note && formik.errors.note}
                label="note"
                name="note"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}

                value={formik.values.note}
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
              Create
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
          </Stack>
        </Stack>
      </Card>
    </form>
  );
};

ReservationCreateForm.propTypes = {
  reservation: PropTypes.object.isRequired
};
