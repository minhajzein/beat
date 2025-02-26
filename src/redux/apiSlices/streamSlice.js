import { apiSlice } from "../../apis/apiSlice";

const streamSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllStreams: builder.query({
            query: () => ({
                url: '/admin/streams',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Streams']
        }),
        createStream: builder.mutation({
            query: (credentials) => ({
                url: '/admin/streams',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Streams']
        })
    })
})


export const {
    useCreateStreamMutation,
    useGetAllStreamsQuery
} = streamSlice