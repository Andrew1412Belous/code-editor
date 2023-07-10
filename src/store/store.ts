import { configureStore } from '@reduxjs/toolkit';
import { cellsActions, cellsReducer } from './slices/cellsSlice';

export const store = configureStore({
	reducer: {
		cells: cellsReducer,
	},
});

store.dispatch(
	cellsActions.insertCellBefore({
		id: null,
		type: 'code',
	}),
);

store.dispatch(
	cellsActions.insertCellBefore({
		id: null,
		type: 'text',
	}),
);

store.dispatch(
	cellsActions.insertCellBefore({
		id: null,
		type: 'code',
	}),
);

store.dispatch(
	cellsActions.insertCellBefore({
		id: null,
		type: 'text',
	}),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
