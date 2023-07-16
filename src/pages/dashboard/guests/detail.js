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

import { guestsApi } from 'src/api/guests';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { GuestBasicDetails } from 'src/sections/dashboard/guest/guest-basic-details';
import { GuestDataManagement } from 'src/sections/dashboard/guest/guest-data-management';
import { GuestEmailsSummary } from 'src/sections/dashboard/guest/guest-emails-summary';
import { GuestInvoices } from 'src/sections/dashboard/guest/guest-invoices';
import { GuestPayment } from 'src/sections/dashboard/guest/guest-payment';
import { GuestLogs } from 'src/sections/dashboard/guest/guest-logs';
import { getInitials } from 'src/utils/get-initials';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' }
];

const useGuest = () => {
  const isMounted = useMounted();
  const [guest, setGuest] = useState(null);

  const handleGuestGet = useCallback(async () => {
    try {
      const response = await guestsApi.getGuest();

      if (isMounted()) {
        setGuest(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleGuestGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return guest;
};

const useInvoices = () => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState([]);

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await guestsApi.getInvoices();

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
      const response = await guestsApi.getLogs();

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
  const guest = useGuest();
  const invoices = useInvoices();
  const logs = useLogs();

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!guest) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Guest Details" />
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
                  href={paths.dashboard.guests.index}
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
                    Guests
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
                    src={guest.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(guest.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {guest.email}
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
                        label={guest.id}
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
                    href={paths.dashboard.guests.edit}
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
                    <GuestBasicDetails
                      address1={guest.address1}
                      address2={guest.address2}
                      country={guest.country}
                      email={guest.email}
                      isVerified={!!guest.isVerified}
                      phone={guest.phone}
                      state={guest.state}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={4}>
                      <GuestPayment />
                      <GuestEmailsSummary />
                      <GuestDataManagement />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === 'invoices' && <GuestInvoices invoices={invoices} />}
            {currentTab === 'logs' && <GuestLogs logs={logs} />}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
