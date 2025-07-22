import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { token } from "../../utils/constants";


export const addminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA2MzYyMTM1LCJpYXQiOjE3MDM3NzAxMzUsImp0aSI6Ijc3NjY5NTc0OTUzNTQ4NDk4MjU3MDYxYzkzMzc1OTcxIiwidXNlcl9pZCI6NTh9.ELmPUpeB7gIxaaSrNGWv8r8_nfXvCYgeTI3mL0hG-80'

type getAccountsType = {
    id : number, 
    full_name : string,
}
export const getAccountsApi = createApi({
    baseQuery : fetchBaseQuery({
      baseUrl : 'https://gitlub.pythonanywhere.com/',
      prepareHeaders: (headers) => {
        // Add the authorization token to the headers
        headers.set('Authorization', `Bearer ${addminToken}`);
        return headers;
      },
    }),
    tagTypes : ['Accounts'],
    endpoints : (builder) => ({
      getAccounts : builder.query<getAccountsType[] , void>({
        query : () => 'core/createdaccount/',
        providesTags : ['Accounts']
      }),
      getSelectedAccount : builder.query<any , number | null>({
        query : (id) => `admin_user/accounts/${id}/`,
        providesTags : ['Accounts']
      }),
      getAdminTimeTrackingData : builder.query<any , void>({
        query : () => 'timetracking/admintrackingmodel/',
        providesTags : ['Accounts']
      })
    }),
  })


export const {useGetAccountsQuery , useGetSelectedAccountQuery , useGetAdminTimeTrackingDataQuery} = getAccountsApi