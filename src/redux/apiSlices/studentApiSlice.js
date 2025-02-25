import { apiSlice } from "../../apis/apiSlice";

const studentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: '/register',
                method: 'POST',
                body: { ...credentials }
            })
        })
    })
})

export const { useRegisterMutation } = studentApiSlice