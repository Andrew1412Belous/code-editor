import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import React from 'react';

import './resizable.css';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps =
		direction === 'horizontal'
			? {
					className: 'resize-horizontal',
					width: window.innerWidth * 0.75,
					height: Infinity,
					resizeHandles: ['e'],
					maxConstraints: [window.innerWidth * 0.75, Infinity],
					minConstraints: [window.innerWidth * 0.2, Infinity],
			  }
			: {
					width: Infinity,
					height: 300,
					resizeHandles: ['s'],
					maxConstraints: [Infinity, window.innerHeight * 0.9],
					minConstraints: [Infinity, 24],
			  };

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
