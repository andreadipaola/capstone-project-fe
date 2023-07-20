import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
import { reservation, reservations, emails, invoices, logs } from './data';
import axios from 'axios';


class ReservationsApi {
  async getReservations(request = {}) {
    const token = sessionStorage.getItem('accessToken');
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmRyM2EuZGlwYW9sYUBnbWFpbC5jb20iLCJpYXQiOjE2ODk0NDY4NzIsImV4cCI6MTY5MDA1MTY3Mn0.lDvX_jt6_v3SDdY3qtcn1oal9NLJ3W7vm7XLAShcfM0";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    try {
      const res = await axios.get('http://localhost:3001/reservations', { headers })
      console.log(page);
      let data = res.data.content;
      let count = data.length;


      if (typeof filters !== 'undefined') {
        data = data.filter((reservation) => {
          if (typeof filters.query !== 'undefined' && filters.query !== '') {
            let queryMatched = false;
            const properties = ['reservationId'];

            properties.forEach((property) => {
              if ((reservation[property]).toLowerCase().includes(filters.query.toLowerCase())) {
                queryMatched = true;
              }
            });

            if ((reservation.guest.firstName).toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
            if ((reservation.guest.lastName).toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }
            if ((reservation.guest.email).toLowerCase().includes(filters.query.toLowerCase())) {
              queryMatched = true;
            }


            if (!queryMatched) {
              return false;
            }
          }
          if (typeof filters.bookingStatus !== 'undefined') {
            const reservationMatched = reservation.bookingStatus === filters.bookingStatus
            if (!reservationMatched) {
              return false;
            }
          }
          return true;
        });
        count = data.length;
      }

      if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
        data = applySort(data, sortBy, sortDir);
      }

      if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
        data = applyPagination(data, page, rowsPerPage);
        console.log(data);
        console.log(page);
        console.log(rowsPerPage);
      }

      return {
        data,
        count
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  getReservation(request) {
    return Promise.resolve(deepCopy(reservation));
  }

  getEmails(request) {
    return Promise.resolve(deepCopy(emails));
  }

  getInvoices(request) {
    return Promise.resolve(deepCopy(invoices));
  }

  getLogs(request) {
    return Promise.resolve(deepCopy(logs));
  }
}

export const reservationsApi = new ReservationsApi();


