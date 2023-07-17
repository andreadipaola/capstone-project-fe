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

import { roomTypesApi } from "src/api/roomTypes";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { RoomTypeListSearch } from "src/sections/dashboard/roomType/roomType-list-search";
import { RoomTypeListTable } from "src/sections/dashboard/roomType/roomType-list-table";

const useRoomTypesSearch = () => {
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
    sortBy: "name",
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


const useRoomTypesStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    roomTypes: [],
    roomTypesCount: 0
  });

  const handleRoomTypesGet = useCallback(async () => {
    try {
      const response = await roomTypesApi.getRoomTypes(searchState);
      // console.log("RoomTypes:", response.data);
      // console.log("Count:", response.count);
      if (isMounted()) {
        setState({
          roomTypes: response.data,
          roomTypesCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleRoomTypesGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state
  };
};



const useRoomTypesIds = (roomTypes = []) => {
  return useMemo(() => {
    return roomTypes.map((roomType) => roomType.roomTypeId);


  }, [roomTypes]);
};

const Page = () => {
  const roomTypesSearch = useRoomTypesSearch();
  const roomTypesStore = useRoomTypesStore(roomTypesSearch.state);
  const roomTypesIds = useRoomTypesIds(roomTypesStore.roomTypes);
  const roomTypesSelection = useSelection(roomTypesIds);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: RoomType List" />
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
                <Typography variant="h4">Room Types</Typography>
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
              <RoomTypeListSearch
                onFiltersChange={roomTypesSearch.handleFiltersChange}
                onSortChange={roomTypesSearch.handleSortChange}
                sortBy={roomTypesSearch.state.sortBy}
                sortDir={roomTypesSearch.state.sortDir}
              />
              <RoomTypeListTable
                count={roomTypesStore.roomTypesCount}
                items={roomTypesStore.roomTypes}
                onDeselectAll={roomTypesSelection.handleDeselectAll}
                onDeselectOne={roomTypesSelection.handleDeselectOne}
                onPageChange={roomTypesSearch.handlePageChange}
                onRowsPerPageChange={roomTypesSearch.handleRowsPerPageChange}
                onSelectAll={roomTypesSelection.handleSelectAll}
                onSelectOne={roomTypesSelection.handleSelectOne}
                page={roomTypesSearch.state.page}
                rowsPerPage={roomTypesSearch.state.rowsPerPage}
                selected={roomTypesSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
