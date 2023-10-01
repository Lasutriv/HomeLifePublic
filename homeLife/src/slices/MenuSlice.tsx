import { createSlice } from '@reduxjs/toolkit'

export interface IMainMenuSlice {
    mainMenuSlice: {
        options: string[];
        optionFunctions: Function[];
    }
}

export const MenuOptions = {
  deleteNotePage: 'Delete Page',
  deleteNote: 'Delete Note',
  addNote: 'Add Note',
  editNote: 'Edit Note',
  addPage: 'Add Page',
  editPage: 'Edit Page',
}

export const MainMenuSlice = createSlice({
  name: 'mainMenuSlice',
  initialState: {
    options: [],  
  },
  reducers: {
    addOption: (state, action) => {
        state.options.push(action.payload)
    },
    performAction: (state, action) => {
        if (state.options.length > 0) {
            state.options.forEach((option, index) => {
              if (option === action.payload && option == MenuOptions.deleteNotePage) {
                // Delete note page that's in redux
              }
            });
        }
    },
    clearAllOptions: (state) => {
        state.options = []
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { addOption, performAction, clearAllOptions } = MainMenuSlice.actions

export default MainMenuSlice.reducer