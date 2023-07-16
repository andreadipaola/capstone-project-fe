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

import { guestsApi } from "src/api/guests";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { GuestListSearch } from "src/sections/dashboard/guest/guest-list-search";
import { GuestListTable } from "src/sections/dashboard/guest/guest-list-table";

const useGuestsSearch = () => {
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
// const useGuestsStore = () => {
//   // const useGuestsStore = () => {
//   const isMounted = useMounted();
//   const [state, setState] = useState({
//     guests: [],
//     guestsCount: 0
//   });

//   const handleGuestsGet = useCallback(async () => {
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
//       console.log("Guests:", data);
//       console.log("Count:", count);


//       if (isMounted()) {
//         setState({
//           guests: data,
//           //DA VEDERE
//           guestsCount: count
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);
//   useEffect(
//     () => {
//       handleGuestsGet();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return {
//     ...state
//   };
// };

const useGuestsStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    guests: [],
    guestsCount: 0
  });

  const handleGuestsGet = useCallback(async () => {
    try {
      const response = await guestsApi.getGuests(searchState);
      // console.log("Guests:", response.data);
      // console.log("Count:", response.count);
      if (isMounted()) {
        setState({
          guests: response.data,
          guestsCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleGuestsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state
  };
};



const useGuestsIds = (guests = []) => {
  return useMemo(() => {
    return guests.map((guest) => guest.guestId);
    // return guests.map((guest) => guest.id);
    // return guests.map((guest, index) => { return { ...guest, key: `${guest.id}-${index}` }; });

  }, [guests]);
};

const Page = () => {
  const guestsSearch = useGuestsSearch();
  const guestsStore = useGuestsStore(guestsSearch.state);
  // const guestsStore = useGuestsStore();
  const guestsIds = useGuestsIds(guestsStore.guests);
  const guestsSelection = useSelection(guestsIds);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Guest List" />
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
                <Typography variant="h4">Guests</Typography>
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
              <GuestListSearch
                onFiltersChange={guestsSearch.handleFiltersChange}
                onSortChange={guestsSearch.handleSortChange}
                sortBy={guestsSearch.state.sortBy}
                sortDir={guestsSearch.state.sortDir}
              />
              <GuestListTable
                count={guestsStore.guestsCount}
                items={guestsStore.guests}
                onDeselectAll={guestsSelection.handleDeselectAll}
                onDeselectOne={guestsSelection.handleDeselectOne}
                onPageChange={guestsSearch.handlePageChange}
                onRowsPerPageChange={guestsSearch.handleRowsPerPageChange}
                onSelectAll={guestsSelection.handleSelectAll}
                onSelectOne={guestsSelection.handleSelectOne}
                page={guestsSearch.state.page}
                rowsPerPage={guestsSearch.state.rowsPerPage}
                selected={guestsSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
