import { CellsState } from '../types/cell';
import { createSlice } from '@reduxjs/toolkit';
import {
	DeleteCellAction,
	InsertCellBeforeAction,
	MoveCellAction,
	UpdateCellAction,
} from '../actions/cellAction';

const initialState: CellsState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const cellsSlice = createSlice({
	initialState,
	name: 'cells',
	reducers: {
		updateCell(state, action: UpdateCellAction) {
			const { content, id } = action.payload;
			state.data[id].content = content;
		},
		deleteCell(state, action: DeleteCellAction) {},
		insertCell(state, action: InsertCellBeforeAction) {},
		moveCell(state, action: MoveCellAction) {},
	},
});

export const cellsActions = cellsSlice.actions;
export const cellsReducer = cellsSlice.reducer;
