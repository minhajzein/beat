import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        student: null
    },
    reducers: {
        storeStudentId: (state, action) => {
            state.student = action.payload
        }
    }
})

export const { storeStudentId } = studentSlice.actions

export default studentSlice.reducer