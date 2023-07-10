import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellListItem from '../cell-list-item/Cell-list-item';
import AddCell from '../add-cell/Add-cell';

const CellList: React.FC = () => {
	const cellsState = useTypedSelector((state) => state.cells);
	const cells = cellsState.order.map((id) => cellsState.data[id]);

	const renderedCells = cells.map((cell) => (
		<>
			<AddCell nextCellId={cell.id} />
			<CellListItem key={cell.id} cell={cell} />
		</>
	));

	return (
		<div>
			{renderedCells}
			<AddCell nextCellId={null} />
		</div>
	);
};

export default CellList;
