import { createSlice } from '@reduxjs/toolkit'
import { IMaintenanceItemsProps } from '../Maintenance'

export interface IMainUserSlice {
  mainMaintenanceSlice: {
    selectedMaintenanceItem: IMaintenanceItemsProps | null;
    }
}

export const MainMaintenanceSlice = createSlice({
  name: 'mainMaintenanceSlice',
  initialState: {
    selectedMaintenanceItem: null,
  },
  reducers: {
    setSelectedMaintenanceItem: (state, action) => {
      state.selectedMaintenanceItem = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedMaintenanceItem } = MainMaintenanceSlice.actions

export default MainMaintenanceSlice.reducer