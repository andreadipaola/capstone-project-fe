import { useCallback, useEffect, useMemo, useState } from "react";
import axios from 'axios';
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { roomsApi } from "src/api/rooms";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { RoomListSearch } from "src/sections/dashboard/room/room-list-search";
import { RoomListTable } from "src/sections/dashboard/room/room-list-table";

const useRoomsSearch = () => {
  const [state, setState] = useState({
    filters: {
      query: undefined,
      // hasAcceptedMarketing: undefined,
      // isProspect: undefined,
      // isReturning: undefined,
      isManager: undefined,
      isReceptionist: undefined
    },
    page: 0,
    rowsPerPage: 5,
    sortBy: "lastName",
    sortDir: "asc"
  });

  const handleFiltersChange = useCallback((filters) => {
    setState((prevState) => ({
      ...prevState,
      filters
    }));
  }, []);

  const handleSortChange = useCallback((sort) => {
    setState((prevState) => ({
      ...prevState,
      sortBy: sort.sortBy,
      sortDir: sort.sortDir
    }));
  }, []);

  const handlePageChange = useCallback((event, page) => {
    setState((prevState) => ({
      ...prevState,
      page
    }));
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10)
    }));
  }, []);

  return {
    handleFiltersChange,
    handleSortChange,
    handlePageChange,
    handleRowsPerPageChange,
    state
  };
};

//FUNZIONANTE
// const useRoomsStore = () => {
//   // const useRoomsStore = () => {
//   const isMounted = useMounted();
//   const [state, setState] = useState({
//     rooms: [],
//     roomsCount: 0
//   });

//   const handleRoomsGet = useCallback(async () => {
//     try {
//       // const token = sessionStorage.getItem('token');
//       const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmRyM2EuZGlwYW9sYUBnbWFpbC5jb20iLCJpYXQiOjE2ODk0NDY4NzIsImV4cCI6MTY5MDA1MTY3Mn0.lDvX_jt6_v3SDdY3qtcn1oal9NLJ3W7vm7XLAShcfM0";
//       const headers = {
//         Authorization: `Bearer ${token}`
//       };
//       const response = await axios.get('http://localhost:3001/users', { headers });
//       let data = response.data.content;
//       let count = data.count;
//       console.log("Token:", token);
//       console.log("Rooms:", data);
//       console.log("Count:", count);


//       if (isMounted()) {
//         setState({
//           rooms: data,
//           //DA VEDERE
//           roomsCount: count
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);
//   useEffect(
//     () => {
//       handleRoomsGet();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return {
//     ...state
//   };
// };

const useRoomsStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    rooms: [],
    roomsCount: 0
  });

  const handleRoomsGet = useCallback(async () => {
    try {
      const response = await roomsApi.getRooms(searchState);
      // console.log("Rooms:", response.data);
      // console.log("Count:", response.count);
      if (isMounted()) {
        setState({
          rooms: response.data,
          roomsCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleRoomsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state
  };
};



const useRoomsIds = (rooms = []) => {
  return useMemo(() => {
    return rooms.map((room) => room.roomId);
    // return rooms.map((room) => room.id);
    // return rooms.map((room, index) => { return { ...room, key: `${room.id}-${index}` }; });

  }, [rooms]);
};

const Page = () => {
  const roomsSearch = useRoomsSearch();
  const roomsStore = useRoomsStore(roomsSearch.state);
  // const roomsStore = useRoomsStore();
  const roomsIds = useRoomsIds(roomsStore.rooms);
  const roomsSelection = useSelection(roomsIds);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Room List" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Rooms</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  {/* <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Upload01Icon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button> */}
                  {/* <Button
                    color="inherit"
                    size="small"
                    startIcon={(
                      <SvgIcon>
                        <Download01Icon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button> */}
                </Stack>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <RoomListSearch
                onFiltersChange={roomsSearch.handleFiltersChange}
                onSortChange={roomsSearch.handleSortChange}
                sortBy={roomsSearch.state.sortBy}
                sortDir={roomsSearch.state.sortDir}
              />
              <RoomListTable
                count={roomsStore.roomsCount}
                items={roomsStore.rooms}
                onDeselectAll={roomsSelection.handleDeselectAll}
                onDeselectOne={roomsSelection.handleDeselectOne}
                onPageChange={roomsSearch.handlePageChange}
                onRowsPerPageChange={roomsSearch.handleRowsPerPageChange}
                onSelectAll={roomsSelection.handleSelectAll}
                onSelectOne={roomsSelection.handleSelectOne}
                page={roomsSearch.state.page}
                rowsPerPage={roomsSearch.state.rowsPerPage}
                selected={roomsSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
