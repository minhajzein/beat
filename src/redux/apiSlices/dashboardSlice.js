import { apiSlice } from "../../apis/apiSlice";

const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getDashboard: builder.query({
            query: () => ({
                url: '/admin/dashboard',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Students']
        })
    })
})


export const { useGetDashboardQuery } = dashboardApiSlice