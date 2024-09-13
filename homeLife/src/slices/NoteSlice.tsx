import { createSlice } from '@reduxjs/toolkit'
import { INotesProps, IPageTabProps } from '../Notes';
import { RootState } from '../AppStore';

export interface IMainNoteSlice {
    selectedNote: INotesProps;
    selectedPage: IPageTabProps;
}

const initialState: IMainNoteSlice = {
    selectedNote: {
      id: -1,
      pageId: -1,
      title: '',
      link: '',
      description: '',
      pubDate: '',
      encrypted: false,
      x: 0,
      y: 0,
      z: 0,
      children: [],
    },
    selectedPage: {
      id: -1,
      title: '<>',
    },
}

export const MainNoteSlice = createSlice({
  name: 'mainNoteSlice',
  initialState,
  reducers: {
    setSelectedNote: (state, action) => {
        state.selectedNote = action.payload
    },
    setSelectedPage: (state, action) => {
        state.selectedPage = action.payload
    },
    clearSelectedNote: (state) => {
        state.selectedNote = null
    },
    clearSelectedPage: (state) => {
        state.selectedPage = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedNote, setSelectedPage, clearSelectedNote, clearSelectedPage } = MainNoteSlice.actions

export const selectPage = (state: RootState) => state.notes.selectedPage;

export default MainNoteSlice.reducer