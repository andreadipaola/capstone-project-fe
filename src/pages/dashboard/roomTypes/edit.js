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

import { roomTypesApi } from 'src/api/roomTypes';
import { RouterLink } from 'src/components/router-link';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { usePageView } from 'src/hooks/use-page-view';
import { paths } from 'src/paths';
import { RoomTypeEditForm } from 'src/sections/dashboard/roomType/roomType-edit-form';
import { getInitials } from 'src/utils/get-initials';

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

const Page = () => {
  const roomType = useRoomType();

  usePageView();

  if (!roomType) {
    return null;
  }

  return (
    <>
      <Seo title="Dashboard: RoomType Edit" />
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
              </Stack>
            </Stack>
            <RoomTypeEditForm roomType={roomType} />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
