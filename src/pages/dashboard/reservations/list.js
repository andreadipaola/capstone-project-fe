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

import { reservationsApi } from "src/api/reservations";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { ReservationListSearch } from "src/sections/dashboard/reservation/reservation-list-search";
import { ReservationListTable } from "src/sections/dashboard/reservation/reservation-list-table";

const useReservationsSearch = () => {
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
    sortBy: "arrivalDate",
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


const useReservationsStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    reservations: [],
    reservationsCount: 0
  });

  const handleReservationsGet = useCallback(async () => {
    try {
      const response = await reservationsApi.getReservations(searchState);
      // console.log("Reservations:", response.data);
      // console.log("Count:", response.count);
      if (isMounted()) {
        setState({
          reservations: response.data,
          reservationsCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleReservationsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state
  };
};



const useReservationsIds = (reservations = []) => {
  return useMemo(() => {
    return reservations.map((reservation) => reservation.reservationId);
    // return reservations.map((reservation) => reservation.id);
    // return reservations.map((reservation, index) => { return { ...reservation, key: `${reservation.id}-${index}` }; });

  }, [reservations]);
};

const Page = () => {
  const reservationsSearch = useReservationsSearch();
  const reservationsStore = useReservationsStore(reservationsSearch.state);
  // const reservationsStore = useReservationsStore();
  const reservationsIds = useReservationsIds(reservationsStore.reservations);
  const reservationsSelection = useSelection(reservationsIds);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Reservation List" />
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
                <Typography variant="h4">Reservations</Typography>
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
              <ReservationListSearch
                onFiltersChange={reservationsSearch.handleFiltersChange}
                onSortChange={reservationsSearch.handleSortChange}
                sortBy={reservationsSearch.state.sortBy}
                sortDir={reservationsSearch.state.sortDir}
              />
              <ReservationListTable
                count={reservationsStore.reservationsCount}
                items={reservationsStore.reservations}
                onDeselectAll={reservationsSelection.handleDeselectAll}
                onDeselectOne={reservationsSelection.handleDeselectOne}
                onPageChange={reservationsSearch.handlePageChange}
                onRowsPerPageChange={reservationsSearch.handleRowsPerPageChange}
                onSelectAll={reservationsSelection.handleSelectAll}
                onSelectOne={reservationsSelection.handleSelectOne}
                page={reservationsSearch.state.page}
                rowsPerPage={reservationsSearch.state.rowsPerPage}
                selected={reservationsSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
