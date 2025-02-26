import { apiSlice } from "../../apis/apiSlice";

const courseSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllCourses: builder.query({
            query: () => ({
                url: '/admin/courses',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Courses']
        }),
        createCourse: builder.mutation({
            query: (credentials) => ({
                url: '/admin/courses',
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Courses']
        })
    })
})

export const {
    useGetAllCoursesQuery,
    useCreateCourseMutation
} = courseSlice