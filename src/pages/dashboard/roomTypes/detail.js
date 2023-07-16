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

import { roomTypesApi } from 'src/api/roomTypes';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { RoomTypeBasicDetails } from 'src/sections/dashboard/roomType/roomType-basic-details';
import { RoomTypeDataManagement } from 'src/sections/dashboard/roomType/roomType-data-management';
import { RoomTypeEmailsSummary } from 'src/sections/dashboard/roomType/roomType-emails-summary';
import { RoomTypeInvoices } from 'src/sections/dashboard/roomType/roomType-invoices';
import { RoomTypePayment } from 'src/sections/dashboard/roomType/roomType-payment';
import { RoomTypeLogs } from 'src/sections/dashboard/roomType/roomType-logs';
import { getInitials } from 'src/utils/get-initials';

const tabs = [
  { label: 'Details', value: 'details' },
  { label: 'Invoices', value: 'invoices' },
  { label: 'Logs', value: 'logs' }
];

const useRoomType = () => {
  const isMounted = useMounted();
  const [roomType, setRoomType] = useState(null);

  const handleRoomTypeGet = useCallback(async () => {
    try {
      const response = await roomTypesApi.getRoomType();

      if (isMounted()) {
        setRoomType(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleRoomTypeGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return roomType;
};

const useInvoices = () => {
  const isMounted = useMounted();
  const [invoices, setInvoices] = useState([]);

  const handleInvoicesGet = useCallback(async () => {
    try {
      const response = await roomTypesApi.getInvoices();

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
      const response = await roomTypesApi.getLogs();

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
  const roomType = useRoomType();
  const invoices = useInvoices();
  const logs = useLogs();

  usePageView();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  if (!roomType) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: RoomType Details" />
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
                  href={paths.dashboard.roomTypes.index}
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
                    RoomTypes
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
                    src={roomType.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(roomType.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {roomType.email}
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
                        label={roomType.id}
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
                    href={paths.dashboard.roomTypes.edit}
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
                    <RoomTypeBasicDetails
                      address1={roomType.address1}
                      address2={roomType.address2}
                      country={roomType.country}
                      email={roomType.email}
                      isVerified={!!roomType.isVerified}
                      phone={roomType.phone}
                      state={roomType.state}
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    lg={8}
                  >
                    <Stack spacing={4}>
                      <RoomTypePayment />
                      <RoomTypeEmailsSummary />
                      <RoomTypeDataManagement />
                    </Stack>
                  </Grid>
                </Grid>
              </div>
            )}
            {currentTab === 'invoices' && <RoomTypeInvoices invoices={invoices} />}
            {currentTab === 'logs' && <RoomTypeLogs logs={logs} />}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
