import { useCallback, useEffect, useMemo, useState } from "react";
import axios from 'axios';
import Download01Icon from "@untitled-ui/icons-react/build/esm/Download01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Upload01Icon from "@untitled-ui/icons-react/build/esm/Upload01";
import Link from '@mui/material/Link';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import { customersApi } from "src/api/customers";
import { Seo } from "src/components/seo";
import { useMounted } from "src/hooks/use-mounted";
import { usePageView } from "src/hooks/use-page-view";
import { useSelection } from "src/hooks/use-selection";
import { CustomerListSearch } from "src/sections/dashboard/customer/customer-list-search";
import { CustomerListTable } from "src/sections/dashboard/customer/customer-list-table";
import { RouterLink } from 'src/components/router-link';
import { paths } from 'src/paths';

const useCustomersSearch = () => {
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
    sortDir: "desc"
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
// const useCustomersStore = () => {
//   // const useCustomersStore = () => {
//   const isMounted = useMounted();
//   const [state, setState] = useState({
//     customers: [],
//     customersCount: 0
//   });

//   const handleCustomersGet = useCallback(async () => {
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
//       console.log("Customers:", data);
//       console.log("Count:", count);


//       if (isMounted()) {
//         setState({
//           customers: data,
//           //DA VEDERE
//           customersCount: count
//         });
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }, [isMounted]);
//   useEffect(
//     () => {
//       handleCustomersGet();
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return {
//     ...state
//   };
// };

const useCustomersStore = (searchState) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    customers: [],
    customersCount: 0
  });

  const handleCustomersGet = useCallback(async () => {
    try {
      const response = await customersApi.getCustomers(searchState);
      // console.log("Customers:", response.data);
      // console.log("Count:", response.count);
      if (isMounted()) {
        setState({
          customers: response.data,
          customersCount: response.count
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchState, isMounted]);

  useEffect(
    () => {
      handleCustomersGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchState]
  );

  return {
    ...state
  };
};



const useCustomersIds = (customers = []) => {
  return useMemo(() => {
    return customers.map((customer) => customer.userId);
    // return customers.map((customer) => customer.id);
    // return customers.map((customer, index) => { return { ...customer, key: `${customer.id}-${index}` }; });

  }, [customers]);
};

const Page = () => {
  const customersSearch = useCustomersSearch();
  const customersStore = useCustomersStore(customersSearch.state);
  // const customersStore = useCustomersStore();
  const customersIds = useCustomersIds(customersStore.customers);
  const customersSelection = useSelection(customersIds);

  usePageView();

  return (
    <>
      <Seo title="Dashboard: Customer List" />
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
                <Typography variant="h4">Users</Typography>
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

              {/* <Link
                  color="text.primary"
                  component={RouterLink}
                  href={paths.dashboard.customers.index}
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
                    Users
                  </Typography>
                </Link> */}

              <Stack alignItems="center" direction="row" spacing={3}>
                <Link
                  component={RouterLink}
                  href={paths.dashboard.customers.create}>
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
                </Link>
              </Stack>

            </Stack>
            <Card>
              <CustomerListSearch
                onFiltersChange={customersSearch.handleFiltersChange}
                onSortChange={customersSearch.handleSortChange}
                sortBy={customersSearch.state.sortBy}
                sortDir={customersSearch.state.sortDir}
              />
              <CustomerListTable
                count={customersStore.customersCount}
                items={customersStore.customers}
                onDeselectAll={customersSelection.handleDeselectAll}
                onDeselectOne={customersSelection.handleDeselectOne}
                onPageChange={customersSearch.handlePageChange}
                onRowsPerPageChange={customersSearch.handleRowsPerPageChange}
                onSelectAll={customersSelection.handleSelectAll}
                onSelectOne={customersSelection.handleSelectOne}
                page={customersSearch.state.page}
                rowsPerPage={customersSearch.state.rowsPerPage}
                selected={customersSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;
