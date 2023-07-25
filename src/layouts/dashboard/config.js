import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import SvgIcon from '@mui/material/SvgIcon';

import Building04Icon from 'src/icons/untitled-ui/duocolor/building-04';
import Lock01Icon from 'src/icons/untitled-ui/duocolor/lock-01';
import ReceiptCheckIcon from 'src/icons/untitled-ui/duocolor/receipt-check';
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03';
import LayoutAlt02Icon from 'src/icons/untitled-ui/duocolor/layout-alt-02';
import { tokens } from 'src/locales/tokens';
import { paths } from 'src/paths';

export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [

      {
        subheader: t(tokens.nav.reservationsAndGuests),
        items: [
          {
            title: t(tokens.nav.reservations),
            path: paths.dashboard.reservations.index,
            icon: (
              <SvgIcon fontSize="small">
                <ReceiptCheckIcon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.guests),
            path: paths.dashboard.guests.index,
            icon: (
              <SvgIcon fontSize="small">
                <Users03Icon />
              </SvgIcon>
            ),
          }
        ]
      },
      {
        subheader: t(tokens.nav.hotelFacility),
        items: [
          {
            title: t(tokens.nav.rooms),
            path: paths.dashboard.rooms.index,
            icon: (
              <SvgIcon fontSize="small">
                <LayoutAlt02Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.roomTypes),
            path: paths.dashboard.roomTypes.index,
            icon: (
              <SvgIcon fontSize="small">
                <Building04Icon />
              </SvgIcon>
            ),
          },

        ],
      }, {
        subheader: t(tokens.nav.staff),
        items: [

          {
            title: t(tokens.nav.users),
            path: paths.dashboard.customers.index,
            icon: (
              <SvgIcon fontSize="small">
                <Lock01Icon />
              </SvgIcon>
            ),
          }

        ],
      },
    ];
  }, [t]);
};
