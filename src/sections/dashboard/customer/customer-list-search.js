import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';

import { useUpdateEffect } from 'src/hooks/use-update-effect';

const tabs = [
  {
    label: 'All',
    value: 'all'
  },
  // {
  //   label: 'Accepts Marketing',
  //   value: 'hasAcceptedMarketing'
  // },
  // {
  //   label: 'Prospect',
  //   value: 'isProspect'
  // },
  // {
  //   label: 'Returning',
  //   value: 'isReturning'
  // },
  {
    label: 'Manager',
    value: 'MANAGER'
  },
  {
    label: 'Receptionist',
    value: 'RECEPTIONIST'
  },
  {
    label: 'Guest',
    value: 'GUEST'
  },
];

const sortOptions = [
  {
    label: 'Last Name (desc)',
    value: 'lastName|desc'
  },
  {
    label: 'Last Name (asc)',
    value: 'lastName|asc'
  },
  {
    label: 'First Name (desc)',
    value: 'firstName|desc'
  },
  {
    label: 'First Name (asc)',
    value: 'firstName|asc'
  },
  {
    label: 'email (desc)',
    value: 'email|desc'
  },
  {
    label: 'email (asc)',
    value: 'email|asc'
  },
  // {
  //   label: 'Last update (newest)',
  //   value: 'updatedAt|desc'
  // },
  // {
  //   label: 'Last update (oldest)',
  //   value: 'updatedAt|asc'
  // },
  // {
  //   label: 'Total orders (highest)',
  //   value: 'totalOrders|desc'
  // },
  // {
  //   label: 'Total orders (lowest)',
  //   value: 'totalOrders|asc'
  // }
];

export const CustomerListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    query: undefined,
    role: undefined
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, tab) => {
    setCurrentTab(tab);
    const role = tab === 'all' ? undefined : tab;

    setFilters((prevState) => ({
      ...prevState,
      role
    }));
  }, []);

  // const handleTabsChange = useCallback((event, value) => {
  //   setCurrentTab(value);
  //   setFilters((prevState) => {
  //     const updatedFilters = {
  //       ...prevState,
  //       // hasAcceptedMarketing: undefined,
  //       // isProspect: undefined,
  //       // isReturning: undefined,
  //       isManager: undefined,
  //       isReceptionist: undefined
  //     };

  //     if (value !== 'all') {
  //       updatedFilters[value] = true;
  //     }

  //     return updatedFilters;
  //   });
  // }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    const query = queryRef.current?.value || '';
    setFilters((prevState) => ({
      ...prevState,
      query
      // query: queryRef.current?.value
    }));
  }, []);

  const handleSortChange = useCallback((event) => {
    const [sortBy, sortDir] = event.target.value.split('|');

    onSortChange?.({
      sortBy,
      sortDir
    });
  }, [onSortChange]);

  return (
    <>
      <Tabs
        indicatorColor="primary"
        onChange={handleTabsChange}
        scrollButtons="auto"
        sx={{ px: 3 }}
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
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        spacing={3}
        sx={{ p: 3 }}
      >
        <Box
          component="form"
          onSubmit={handleQueryChange}
          sx={{ flexGrow: 1 }}
        >
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search guests"
            startAdornment={(
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            )}
          />
        </Box>
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={`${sortBy}|${sortDir}`}
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </>
  );
};

CustomerListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc'])
};
