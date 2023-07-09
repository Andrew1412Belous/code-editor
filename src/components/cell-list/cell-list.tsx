import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellListItem from '../cell-list-item/cell-list-item';

const CellList: React.FC = () => {
	const cellsState = useTypedSelector((state) => state.cells);
	const cells = cellsState.order.map((id) => cellsState.data[id]);

	const renderedCells = cells.map((cell) => <CellListItem key={cell.id} cell={cell} />);

	return <div>{renderedCells}</div>;
};

export default CellList;
