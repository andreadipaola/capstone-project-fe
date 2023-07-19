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

  {
    label: 'Requested',
    value: 'REQUESTED'
  },
  {
    label: 'Pending',
    value: 'PENDING'
  },
  {
    label: 'Confirmed',
    value: 'CONFIRMED'
  },
  {
    label: 'Cheked In',
    value: 'CHECKED_IN'
  },
  {
    label: 'Checked Out',
    value: 'CHECKED_OUT'
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED'
  },
];

const sortOptions = [
  {
    label: 'Arrival Date (desc)',
    value: 'arrivalDate|desc'
  },
  {
    label: 'Arrival Date (asc)',
    value: 'arrivalDate|asc'
  },
  {
    label: 'Departure Date (desc)',
    value: 'departureDate|desc'
  },
  {
    label: 'Departure Date (asc)',
    value: 'departureDate|asc'
  },
  // {
  //   label: 'Check In (desc)',
  //   value: 'checkin|desc'
  // },
  // {
  //   label: 'Check In (asc)',
  //   value: 'checkin|asc'
  // },
  // {
  //   label: 'Check Out (desc)',
  //   value: 'checkout|desc'
  // },
  // {
  //   label: 'Check Out (asc)',
  //   value: 'checkout|asc'
  // }
];

export const ReservationListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy, sortDir } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    query: undefined,
    bookingStatus: undefined
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, tab) => {
    setCurrentTab(tab);
    const bookingStatus = tab === 'all' ? undefined : tab;

    setFilters((prevState) => ({
      ...prevState,
      bookingStatus
    }));
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    const query = queryRef.current?.value || '';
    setFilters((prevState) => ({
      ...prevState,
      query
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
            placeholder="Search reservations"
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

ReservationListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc'])
};
