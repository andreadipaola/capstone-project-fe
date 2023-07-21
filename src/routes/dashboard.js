import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';

// Customer
const CustomerListPage = lazy(() => import('src/pages/dashboard/customers/list'));
const CustomerCreatePage = lazy(() => import('src/pages/dashboard/customers/create'));
const CustomerEditPage = lazy(() => import('src/pages/dashboard/customers/edit'));

// Guest
const GuestListPage = lazy(() => import('src/pages/dashboard/guests/list'));
const GuestEditPage = lazy(() => import('src/pages/dashboard/guests/edit'));

// Reservation
const ReservationListPage = lazy(() => import('src/pages/dashboard/reservations/list'));
const ReservationEditPage = lazy(() => import('src/pages/dashboard/reservations/edit'));

// Room
const RoomListPage = lazy(() => import('src/pages/dashboard/rooms/list'));
const RoomEditPage = lazy(() => import('src/pages/dashboard/rooms/edit'));

// Room Type
const RoomTypesListPage = lazy(() => import('src/pages/dashboard/roomTypes/list'));
const RoomTypesEditPage = lazy(() => import('src/pages/dashboard/roomTypes/edit'));





export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <CustomerListPage />
          },
          {
            path: 'create',
            element: <CustomerCreatePage />
          },
          {
            path: ':customerId/edit',
            element: <CustomerEditPage />
          }
        ]
      },
      {
        path: 'guests',
        children: [
          {
            index: true,
            element: <GuestListPage />
          },
          {
            path: ':guestId/edit',
            element: <GuestEditPage />
          }
        ]
      },
      {
        path: 'reservations',
        children: [
          {
            index: true,
            element: <ReservationListPage />
          },
          {
            path: ':reservationId/edit',
            element: <ReservationEditPage />
          }
        ]
      },
      {
        path: 'rooms',
        children: [
          {
            index: true,
            element: <RoomListPage />
          },
          {
            path: ':roomId/edit',
            element: <RoomEditPage />
          }
        ]
      },
      {
        path: 'roomTypes',
        children: [
          {
            index: true,
            element: <RoomTypesListPage />
          },
          {
            path: ':roomTypesId/edit',
            element: <RoomTypesEditPage />
          }
        ]
      },

    ]
  }
];
