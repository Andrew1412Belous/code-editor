import React, { useState } from 'react';
import bundle from '../../bundler/index';
import CodeEditor from './code-editor/code-editor';
import Preview from './preview';

import 'bulmaswatch/superhero/bulmaswatch.min.css';

const CodeCell: React.FC = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	const onClick = async () => {
		const result = await bundle(input);

		setCode(result);
	};

	return (
		<div>
			<CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<Preview code={code} />
		</div>
	);
};

export default CodeCell;
