import './add-cell.css';
import React from 'react';
import { useCellsActions } from '../../hooks/useActions/useCellsActions';

interface AddCellProps {
	nextCellId: string | null;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId }) => {
	const { insertCellBefore } = useCellsActions();

	return (
		<div>
			<button onClick={() => insertCellBefore({ id: nextCellId, type: 'code' })}>Code</button>
			<button onClick={() => insertCellBefore({ id: nextCellId, type: 'text' })}>Text</button>
		</div>
	);
};

export default AddCell;
