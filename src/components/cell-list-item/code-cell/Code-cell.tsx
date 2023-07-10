import React, { useEffect, useState } from 'react';
import bundle from '../../../bundler';
import CodeEditor from './code-editor/Code-editor';
import Preview from './preview/Preview';
import Resizable from './resizable/Resizable';
import { Cell } from '../../../store';
import { useCellsActions } from '../../../hooks/useActions/useCellsActions';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }: CodeCellProps) => {
	const [code, setCode] = useState('');
	const [err, setErr] = useState('');

	const { updateCell } = useCellsActions();

	useEffect(() => {
		const timer = setTimeout(async () => {
			const result = await bundle(cell.content);

			setCode(result.code);
			setErr(result.err);
		}, 750);

		return () => {
			clearTimeout(timer);
		};
	}, [cell.content]);

	return (
		<Resizable direction="vertical">
			<div style={{ height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor
						initialValue={cell.content}
						onChange={(value) => updateCell({ id: cell.id, content: value })}
					/>
				</Resizable>
				<Preview code={code} err={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
