import { apiSlice } from "../../apis/apiSlice";

const questionTypeSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllQuestionTypes: builder.query({
            query: () => ({
                url: '/admin/question-types',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Question-Types']
        }),
        createQuestionType: builder.mutation({
            query: (credentials) => ({
                url: '/admin/question-types',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Question-Types']
        })
    })
})


export const {
    useCreateQuestionTypeMutation,
    useGetAllQuestionTypesQuery
} = questionTypeSlice