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
        createQuestion: builder.mutation({
            query: (credentials) => ({
                url: '/admin/questions',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Questions']
        })
    })
})

export const {
    useGetAllQuestionsQuery,
    useCreateQuestionMutation
} = questionsSlice