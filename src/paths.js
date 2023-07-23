export const paths = {
  index: '/',
  auth: {
    jwt: {
      login: '/',
      register: '/register'
    },
  },
  dashboard: {
    index: '/dashboard',
    customers: {
      index: '/dashboard/customers',
      create: '/dashboard/customers/create',
      edit: '/dashboard/customers/:customerId/edit'
    },
    guests: {
      index: '/dashboard/guests',
      edit: '/dashboard/guests/:guestId/edit'
    },
    reservations: {
      index: '/dashboard/reservations',
      create: '/dashboard/reservations/create',
      edit: '/dashboard/reservations/:reservationsId/edit'
    },
    rooms: {
      index: '/dashboard/rooms',
      edit: '/dashboard/rooms/:roomId/edit'
    },
    roomTypes: {
      index: '/dashboard/roomTypes',
      edit: '/dashboard/roomTypes/:roomTypeId/edit'
    },
  },
  notAuthorized: '/401',
  notFound: '/404',
  serverError: '/500'
};
