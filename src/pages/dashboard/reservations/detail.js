import { useCallback, useEffect, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import ChevronDownIcon from '@untitled-ui/icons-react/build/esm/ChevronDown';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { reservationsApi } from 'src/api/reservations';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { ReservationBasicDetails } from 'src/sections/dashboard/reservation/reservation-basic-details';
import { ReservationDataManagement } from 'src/sections/dashboard/reservation/reservation-data-management';
import { ReservationEmailsSummary } from 'src/sections/dashboard/reservation/reservation-emails-summary';
import { ReservationInvoices } from 'src/sections/dashboard/reservation/reservation-invoices';
import { ReservationPayment } from 'src/sections/dashboard/reservation/reservation-payment';
import { ReservationLogs } from 'src/sections/dashboard/reservation/reservation-logs';
import { getInitials } from 'src/utils/get-initials';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' }
];

const useReservation = () => {
  const isMounted = useMounted();
  const [reservation, setReservation] = useState(null);

  const handleReservationGet = useCallback(async () => {
    try {
      const response = await reservationsApi.getReservation();

      if (isMounted()) {
        setReservation(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleReservationGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return reservation;
};

const useInvoices = () => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState([]);

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await reservationsApi.getInvoices();

      if (isMounted()) {
        setInvoices(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleInvoicesGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return invoices;
};

const useLogs = () => {
  const isMounted = useMounted();
  const [logs, setLogs] = useState([]);

  const handleLogsGet = useCallback(async () => {
    try {
      const response = await reservationsApi.getLogs();

      if (isMounted()) {
        setLogs(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleLogsGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return logs;
};

const Page = () => {
  const [currentTab, setCurrentTab] = useState('details');
  const reservation = useReservation();
  const invoices = useInvoices();
  const logs = useLogs();

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!reservation) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Reservation Details" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.reservations.index}
                  sx={{
                    alignItems: 'center',
                    display: 'inline-flex'
                  }}
                  underline="hover"
                >
                  <SvgIcon sx={{ mr: 1 }}>
                    <ArrowLeftIcon />
                  </SvgIcon>
                  <Typography variant="subtitle2">
                    Reservations
                  </Typography>
                </Link>
              </div>
              <Stack
                alignItems="flex-start"
                direction={{
                  xs: 'column',
                  md: 'row'
                }}
                justifyContent="space-between"
                spacing={4}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Avatar
                    src={reservation.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(reservation.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {reservation.email}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        user_id:
                      </Typography>
                      <Chip
                        label={reservation.id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                >
                  <Button
                    color="inherit"
                    component={RouterLink}
                    endIcon={(
                      <SvgIcon>
                        <Edit02Icon />
                      </SvgIcon>
                    )}
                    href={paths.dashboard.reservations.edit}
                  >
                    Edit
                  </Button>
                  <Button
                    endIcon={(
                      <SvgIcon>
                        <ChevronDownIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                  >
                    Actions
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Tabs
                  indicatorColor="primary"
                  onChange={handleTabsChange}
                  scrollButtons="auto"
                  sx={{ mt: 3 }}
                  textColor="primary"
                  value={currentTab}
                  variant="scrollable"
                >
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                  ))}
                </Tabs>
                <Divider />
              </div>
            </Stack>
            {currentTab === 'details' && (
              <div>
                <Grid
                  container
                  spacing={4}
                >
                  <Grid
                    xs={12}
                    lg={4}
                  >
                    <ReservationBasicDetails
                      address1={reservation.address1}
                      address2={reservation.address2}
                      country={reservation.country}
                      email={reservation.email}
                      isVerified={!!reservation.isVerified}
                      phone={reservation.phone}
                      state={reservation.state}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={4}>
                      <ReservationPayment />
                      <ReservationEmailsSummary />
                      <ReservationDataManagement />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === 'invoices' && <ReservationInvoices invoices={invoices} />}
            {currentTab === 'logs' && <ReservationLogs logs={logs} />}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
