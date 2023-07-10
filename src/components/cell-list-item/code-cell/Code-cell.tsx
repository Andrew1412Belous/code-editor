import React, { useEffect } from 'react';
import CodeEditor from './code-editor/Code-editor';
import Preview from './preview/Preview';
import Resizable from './resizable/Resizable';
import { Cell, createBundle } from '../../../store';
import { useCellsActions } from '../../../hooks/useActions/useCellsActions';
import { useTypedDispatch } from '../../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }: CodeCellProps) => {
	const { updateCell } = useCellsActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);
	const dispatch = useTypedDispatch();

	useEffect(() => {
		if (!bundle) {
			dispatch(createBundle({ cellId: cell.id, input: cell.content }));
			return;
		}

		const timer = setTimeout(async () => {
			dispatch(createBundle({ cellId: cell.id, input: cell.content }));
		}, 750);

		return () => {
			clearTimeout(timer);
		};
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cell.id, cell.content]);

	return (
		<Resizable direction="vertical">
			<div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell({ id: cell.id, content: value })}
					/>
				</Resizable>
				{!bundle || bundle.loading ? (
					<div>Loading...</div>
				) : (
					<Preview code={bundle.code} err={bundle.err} />
				)}
			</div>
		</Resizable>
	);
};

export default CodeCell;
