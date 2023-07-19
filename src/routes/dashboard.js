import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout as DashboardLayout } from 'src/layouts/dashboard';

const IndexPage = lazy(() => import('src/pages/dashboard/index'));

// Academy
const AcademyDashboardPage = lazy(() => import('src/pages/dashboard/academy/dashboard'));
const AcademyCoursePage = lazy(() => import('src/pages/dashboard/academy/course'));

// Blog
const BlogPostListPage = lazy(() => import('src/pages/dashboard/blog/list'));
const BlogPostDetailPage = lazy(() => import('src/pages/dashboard/blog/detail'));
const BlogPostCreatePage = lazy(() => import('src/pages/dashboard/blog/create'));

// Customer
const CustomerListPage = lazy(() => import('src/pages/dashboard/customers/list'));
const CustomerCreatePage = lazy(() => import('src/pages/dashboard/customers/create'));
const CustomerDetailPage = lazy(() => import('src/pages/dashboard/customers/detail'));
const CustomerEditPage = lazy(() => import('src/pages/dashboard/customers/edit'));

// Guest
const GuestListPage = lazy(() => import('src/pages/dashboard/guests/list'));
const GuestDetailPage = lazy(() => import('src/pages/dashboard/guests/detail'));
const GuestEditPage = lazy(() => import('src/pages/dashboard/guests/edit'));

// Reservation
const ReservationListPage = lazy(() => import('src/pages/dashboard/reservations/list'));
const ReservationDetailPage = lazy(() => import('src/pages/dashboard/reservations/detail'));
const ReservationEditPage = lazy(() => import('src/pages/dashboard/reservations/edit'));

// Room
const RoomListPage = lazy(() => import('src/pages/dashboard/rooms/list'));
const RoomDetailPage = lazy(() => import('src/pages/dashboard/rooms/detail'));
const RoomEditPage = lazy(() => import('src/pages/dashboard/rooms/edit'));

// Room Type
const RoomTypesListPage = lazy(() => import('src/pages/dashboard/roomTypes/list'));
const RoomTypesDetailPage = lazy(() => import('src/pages/dashboard/roomTypes/detail'));
const RoomTypesEditPage = lazy(() => import('src/pages/dashboard/roomTypes/edit'));

// Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoices/list'));
const InvoiceDetailPage = lazy(() => import('src/pages/dashboard/invoices/detail'));

// Job
const JobBrowsePage = lazy(() => import('src/pages/dashboard/jobs/browse'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/jobs/create'));
const CompanyDetailPage = lazy(() => import('src/pages/dashboard/jobs/companies/detail'));

// Logistics
const LogisticsDashboardPage = lazy(() => import('src/pages/dashboard/logistics/dashboard'));
const LogisticsFleetPage = lazy(() => import('src/pages/dashboard/logistics/fleet'));

// Order
const OrderListPage = lazy(() => import('src/pages/dashboard/orders/list'));
const OrderDetailPage = lazy(() => import('src/pages/dashboard/orders/detail'));

// Product
const ProductListPage = lazy(() => import('src/pages/dashboard/products/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/products/create'));

// Social
const SocialFeedPage = lazy(() => import('src/pages/dashboard/social/feed'));
const SocialProfilePage = lazy(() => import('src/pages/dashboard/social/profile'));

// Other
const AccountPage = lazy(() => import('src/pages/dashboard/account'));
const AnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const CryptoPage = lazy(() => import('src/pages/dashboard/crypto'));
const EcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));

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
        index: true,
        element: <IndexPage />
      },
      {
        path: 'academy',
        children: [
          {
            index: true,
            element: <AcademyDashboardPage />
          },
          {
            path: 'courses',
            children: [
              {
                path: ':courseId',
                element: <AcademyCoursePage />
              }
            ]
          }
        ]
      },
      {
        path: 'blog',
        children: [
          {
            index: true,
            element: <BlogPostListPage />
          },
          {
            path: 'create',
            element: <BlogPostCreatePage />
          },
          {
            path: ':postId',
            element: <BlogPostDetailPage />
          }
        ]
      },
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
            path: ':customerId',
            element: <CustomerDetailPage />
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
            path: ':guestId',
            element: <GuestDetailPage />
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
            path: ':reservationId',
            element: <ReservationDetailPage />
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
            path: ':roomId',
            element: <RoomDetailPage />
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
            path: ':roomTypesId',
            element: <RoomTypesDetailPage />
          },
          {
            path: ':roomTypesId/edit',
            element: <RoomTypesEditPage />
          }
        ]
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceListPage />
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetailPage />
          }
        ]
      },
      {
        path: 'jobs',
        children: [
          {
            index: true,
            element: <JobBrowsePage />
          },
          {
            path: 'create',
            element: <JobCreatePage />
          },
          {
            path: 'companies',
            children: [
              {
                path: ':companyId',
                element: <CompanyDetailPage />
              }
            ]
          }
        ]
      },
      {
        path: 'logistics',
        children: [
          {
            index: true,
            element: <LogisticsDashboardPage />
          },
          {
            path: 'fleet',
            element: <LogisticsFleetPage />
          }
        ]
      },
      {
        path: 'orders',
        children: [
          {
            index: true,
            element: <OrderListPage />
          },
          {
            path: ':orderId',
            element: <OrderDetailPage />
          }
        ]
      },
      {
        path: 'products',
        children: [
          {
            index: true,
            element: <ProductListPage />
          },
          {
            path: 'create',
            element: <ProductCreatePage />
          }
        ]
      },
      {
        path: 'social',
        children: [
          {
            path: 'feed',
            element: <SocialFeedPage />
          },
          {
            path: 'profile',
            element: <SocialProfilePage />
          }
        ]
      },
      {
        path: 'account',
        element: <AccountPage />
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />
      },
      {
        path: 'blank',
        element: <BlankPage />
      },
      {
        path: 'calendar',
        element: <CalendarPage />
      },
      {
        path: 'chat',
        element: <ChatPage />
      },
      {
        path: 'crypto',
        element: <CryptoPage />
      },
      {
        path: 'ecommerce',
        element: <EcommercePage />
      },
      {
        path: 'file-manager',
        element: <FileManagerPage />
      },
      {
        path: 'kanban',
        element: <KanbanPage />
      },
      {
        path: 'mail',
        element: <MailPage />
      }
    ]
  }
];
