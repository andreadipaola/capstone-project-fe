import { useCallback, useEffect, useState } from 'react';
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { roomsApi } from 'src/api/rooms';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { RoomEditForm } from 'src/sections/dashboard/room/room-edit-form';
import { getInitials } from 'src/utils/get-initials';

const useRoom = () => {
  const isMounted = useMounted();
  const [room, setRoom] = useState(null);

  const handleRoomGet = useCallback(async () => {
    try {
      const response = await roomsApi.getRoom();

      if (isMounted()) {
        setRoom(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    handleRoomGet();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return room;
};

const Page = () => {
  const room = useRoom();

  usePageView();

  if (!room) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: Room Edit" />
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
                  href={paths.dashboard.rooms.index}
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
                    Rooms
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
                    src={room.avatar}
                    sx={{
                      height: 64,
                      width: 64
                    }}
                  >
                    {getInitials(room.name)}
                  </Avatar>
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      {room.email}
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
                        label={room.id}
                        size="small"
                      />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <RoomEditForm room={room} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
