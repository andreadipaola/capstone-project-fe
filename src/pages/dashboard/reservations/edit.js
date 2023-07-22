import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { reservationsApi } from 'src/api/reservations';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { ReservationEditForm } from 'src/sections/dashboard/reservation/reservation-edit-form';
import { getInitials } from 'src/utils/get-initials';


const useReservation = () => {
  const isMounted = useMounted();
  const [reservation, setReservation] = useState(null);
  const { reservationId } = useParams();


  const handleReservationGet = useCallback(async () => {
    try {
      const response = await reservationsApi.getReservation(reservationId);

      if (isMounted()) {
        setReservation(response.data);
        console.log(reservationId);
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, reservationId]);

  useEffect(() => {
    handleReservationGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return reservation;
};
// const useReservation = () => {
//   const isMounted = useMounted();
//   const [reservation, setReservation] = useState(null);

//   const handleReservationGet = useCallback(async () => {
//     try {
//       const response = await reservationsApi.getReservation();

//       if (isMounted()) {
//         setReservation(response);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);

//   useEffect(() => {
//     handleReservationGet();
//   },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []);

//   return reservation;
// };

const Page = () => {
  const reservation = useReservation();

  usePageView();

  if (!reservation) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Reservation Edit" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
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
                    {reservation.guest?.firstName && reservation.guest?.lastName
                      ? getInitials(reservation.guest.firstName) + getInitials(reservation.guest.lastName)
                      : null
                    }
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {reservation.guest?.email || "N/A"}
                    </Typography>
                    <Stack
                      alignItems="center"
                      direction="row"
                      spacing={1}
                    >
                      <Typography variant="subtitle2">
                        reservation_id:
                      </Typography>
                      <Chip
                        label={reservation.reservationId}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <ReservationEditForm reservation={reservation} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
