import { configureStore } from "@reduxjs/toolkit";
import { MainUserSlice } from "./slices/UserSlice";
import { MainMenuSlice } from "./slices/MenuSlice";
import { MainNoteSlice } from "./slices/NoteSlice";
import { MainMaintenanceSlice } from "./slices/MaintenanceSlice";

export const store = configureStore({
    reducer: {
        users: MainUserSlice.reducer,
        menu: MainMenuSlice.reducer,
        notes: MainNoteSlice.reducer,
        maintenance: MainMaintenanceSlice.reducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch