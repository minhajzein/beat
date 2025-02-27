import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../apis/apiSlice";

const studentsAdapter = createEntityAdapter({})
const initialState = studentsAdapter.getInitialState()

const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: { ...credentials }
            }),
        }),
        getTestQuestions: builder.query({
            query: () => ({
                url: '/test-questions',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Test']
        }),

        createResult: builder.mutation({
            query: (credentials) => ({
                url: '/create-result',
                method: 'POST',
                body: { ...credentials }
            })
        }),

        getResult: builder.query({
            query: (studentId) => ({
                url: `/result/${studentId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
            }),
        }),

        getAllStudent: builder.query({
            query: () => ({
                url: '/admin/students',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
                keepUnusedDataFor: 5,
                transformResponse: async (responseData, meta, args) => {
                    const loadedStudents = await responseData.map(student => {
                        student.id = student._id
                        return student
                    })
                    return studentsAdapter.setAll(initialState, loadedStudents)
                },
            }),
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Students', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Students', id }))
                    ]
                } else return [{
                    type: 'Students', id: 'LIST'
                }]
            }
        })
    })
})

export const {
    useRegisterMutation,
    useCreateResultMutation,
    useGetResultQuery,
    useGetAllStudentQuery,
    useGetTestQuestionsQuery,
    useLazyGetAllStudentQuery,
} = studentApiSlice

export const selectStudentsResult = studentApiSlice.endpoints.getAllStudent.select()

const selectStudentData = createSelector(
    selectStudentsResult, studentResult => studentResult.data
)

export const {
    selectAll: selectAllStudents,
    selectById: selectStudentById,
    selectIds: selectStudentsIds
} = studentsAdapter.getSelectors(state => selectStudentData(state) ?? initialState)