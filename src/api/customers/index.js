import { applyPagination } from 'src/utils/apply-pagination';
import { applySort } from 'src/utils/apply-sort';
import { deepCopy } from 'src/utils/deep-copy';
import { customer, customers, emails, invoices, logs } from './data';
import axios from 'axios';


class CustomersApi {
  async getCustomers(request = {}) {
    const token = sessionStorage.getItem('accessToken');
    // const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmRyM2EuZGlwYW9sYUBnbWFpbC5jb20iLCJpYXQiOjE2ODk0NDY4NzIsImV4cCI6MTY5MDA1MTY3Mn0.lDvX_jt6_v3SDdY3qtcn1oal9NLJ3W7vm7XLAShcfM0";
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    try {
      const res = await axios.get('http://localhost:3001/users', { headers })
      // console.log(res);
      // console.log(res.data);
      // console.log(res.data.content);
      // console.log(res.data.content.lenght);
      console.log(page);
      let data = res.data.content;
      let count = data.length;

      // let data = deepCopy(customers);
      // let count = data.length;

      if (typeof filters !== 'undefined') {
        data = data.filter((customer) => {
          if (typeof filters.query !== 'undefined' && filters.query !== '') {
            let queryMatched = false;
            const properties = ['email', 'firstName', 'lastName'];

            properties.forEach((property) => {
              if ((customer[property]).toLowerCase().includes(filters.query.toLowerCase())) {
                queryMatched = true;
              }
            });

            if (!queryMatched) {
              return false;
            }
          }

          if (typeof filters.isManager !== 'undefined') {
            if (customer.isManager !== filters.isManager) {
              return false;
            }
          }
          if (typeof filters.isReceptionist !== 'undefined') {
            if (customer.isReceptionist !== filters.isReceptionist) {
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

  async getCustomer(customerId) {
    const token = sessionStorage.getItem('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    try {
      const res = await axios.get(`http://localhost:3001/users/${customerId}`, { headers })
      let data = res.data;
      return {
        data
      }

    } catch (err) {
      console.error(err);
      throw err;
      // }    return Promise.resolve(deepCopy(customer));
    }
  }

  // getCustomer(request) {
  //   return Promise.resolve(deepCopy(customer));
  // }

  // async putCustomer(customerId, customerBody) {
  //   const token = sessionStorage.getItem('accessToken');
  //   const headers = {
  //     Authorization: `Bearer ${token}`
  //   };
  //   try {
  //     const res = await axios.put(`http://localhost:3001/users/${customerId}`, customerBody, { headers })
  //     console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // }

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

export const customersApi = new CustomersApi();


// class CustomersApi {
//   getCustomers(request = {}) {
//     const { filters, page, rowsPerPage, sortBy, sortDir } = request;

//     let data = deepCopy(customers);
//     let count = data.length;

//     if (typeof filters !== 'undefined') {
//       data = data.filter((customer) => {
//         if (typeof filters.query !== 'undefined' && filters.query !== '') {
//           let queryMatched = false;
//           const properties = ['email', 'name'];

//           properties.forEach((property) => {
//             if ((customer[property]).toLowerCase().includes(filters.query.toLowerCase())) {
//               queryMatched = true;
//             }
//           });

//           if (!queryMatched) {
//             return false;
//           }
//         }

//         if (typeof filters.isManager !== 'undefined') {
//           if (customer.isManager !== filters.isManager) {
//             return false;
//           }
//         }
//         if (typeof filters.isReceptionist !== 'undefined') {
//           if (customer.isReceptionist !== filters.isReceptionist) {
//             return false;
//           }
//         }

//         return true;
//       });
//       count = data.length;
//     }

//     if (typeof sortBy !== 'undefined' && typeof sortDir !== 'undefined') {
//       data = applySort(data, sortBy, sortDir);
//     }

//     if (typeof page !== 'undefined' && typeof rowsPerPage !== 'undefined') {
//       data = applyPagination(data, page, rowsPerPage);
//     }

//     return Promise.resolve({
//       data,
//       count
//     });
//   }

//   getCustomer(request) {
//     return Promise.resolve(deepCopy(customer));
//   }

//   getEmails(request) {
//     return Promise.resolve(deepCopy(emails));
//   }

//   getInvoices(request) {
//     return Promise.resolve(deepCopy(invoices));
//   }

//   getLogs(request) {
//     return Promise.resolve(deepCopy(logs));
//   }
// }

// export const customersApi = new CustomersApi();


