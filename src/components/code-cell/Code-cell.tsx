import React, { useState } from 'react';
import bundle from '../../bundler/index';
import CodeEditor from './code-editor/Code-editor';
import Preview from './preview/Preview';
import Resizable from './resizable/Resizable';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const CodeCell: React.FC = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	const onClick = async () => {
		const result = await bundle(input);

		setCode(result);
	};

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
				</Resizable>
				<Preview code={code} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
