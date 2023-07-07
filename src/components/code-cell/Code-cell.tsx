import React, { useEffect, useState } from 'react';
import bundle from '../../bundler/index';
import CodeEditor from './code-editor/Code-editor';
import Preview from './preview/Preview';
import Resizable from './resizable/Resizable';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const CodeCell: React.FC = () => {
	const [code, setCode] = useState('');
	const [err, setErr] = useState('');
	const [input, setInput] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const result = await bundle(input);

			setCode(result.code);
			setErr(result.err);
		}, 750);

		return () => {
			clearTimeout(timer);
		};
	}, [input]);

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
				</Resizable>
				<Preview code={code} err={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
