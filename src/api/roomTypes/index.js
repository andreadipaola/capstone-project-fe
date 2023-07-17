import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
import { roomType, roomTypes, emails, invoices, logs } from './data';
import axios from 'axios';


class RoomTypesApi {
  async getRoomTypes(request = {}) {
    const token = sessionStorage.getItem('accessToken');
    // const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmRyM2EuZGlwYW9sYUBnbWFpbC5jb20iLCJpYXQiOjE2ODk0NDY4NzIsImV4cCI6MTY5MDA1MTY3Mn0.lDvX_jt6_v3SDdY3qtcn1oal9NLJ3W7vm7XLAShcfM0";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    try {
      const res = await axios.get('http://localhost:3001/roomTypes', { headers })
      // console.log(res);
      // console.log(res.data);
      // console.log(res.data.content);
      // console.log(res.data.content.lenght);
      console.log(page);
      let data = res.data.content;
      let count = data.length;

      // let data = deepCopy(roomTypes);
      // let count = data.length;

      if (typeof filters !== 'undefined') {
        data = data.filter((roomType) => {
          if (typeof filters.query !== 'undefined' && filters.query !== '') {
            let queryMatched = false;
            const properties = ['name', 'initials', 'description'];

            properties.forEach((property) => {
              if ((roomType[property]).toLowerCase().includes(filters.query.toLowerCase())) {
                queryMatched = true;
              }
            });

            if (!queryMatched) {
              return false;
            }
          }

          if (typeof filters.isManager !== 'undefined') {
            if (roomType.isManager !== filters.isManager) {
              return false;
            }
          }
          if (typeof filters.isReceptionist !== 'undefined') {
            if (roomType.isReceptionist !== filters.isReceptionist) {
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

  getRoomType(request) {
    return Promise.resolve(deepCopy(roomType));
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

export const roomTypesApi = new RoomTypesApi();


