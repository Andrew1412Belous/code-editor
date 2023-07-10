import React, { Fragment } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import CellListItem from '../cell-list-item/Cell-list-item';
import AddCell from '../add-cell/Add-cell';

const CellList: React.FC = () => {
	const cellsState = useTypedSelector((state) => state.cells);
	const cells = cellsState.order.map((id) => cellsState.data[id]);

	const renderedCells = cells.map((cell) => (
		<Fragment key={cell.id}>
			<CellListItem key={cell.id} cell={cell} />
			<AddCell previousCellId={cell.id} />
		</Fragment>
	));

	return (
		<div>
			<AddCell forceVisible={cells.length === 0} previousCellId={null} />
			{renderedCells}
		</div>
	);
};

export default CellList;
