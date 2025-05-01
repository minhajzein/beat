import { apiSlice } from "../../apis/apiSlice";

const questionsSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllQuestions: builder.query({
            query: () => ({
                url: '/admin/questions',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Questions']
        }),
        getQuestionByid: builder.query({
            query: (id) => ({
                url: `/admin/questions/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Question']
        }),
        createQuestion: builder.mutation({
            query: (credentials) => ({
                url: '/admin/questions',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Questions']
        }),
        updateQuestion: builder.mutation({
            query: (credentials) => ({
                url: `/admin/questions/${credentials.id}`,
                method: 'PUT',
                body: { ...credentials }
            }),
            invalidatesTags: ['Questions', 'Question']
        }),
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/admin/questions/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Questions']
        })
    })
})

export const {
    useGetAllQuestionsQuery,
    useCreateQuestionMutation,
    useDeleteQuestionMutation,
    useGetQuestionByidQuery,
    useUpdateQuestionMutation
} = questionsSlice