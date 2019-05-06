import {Classes, Colors} from '@blueprintjs/core';
import * as React from 'react';
import './index.scss';

export class Layout extends React.PureComponent<{}, {}> {
	public render(): React.ReactNode {
		return (
			<div
				className={Classes.DARK}
				style={{
					backgroundColor: Colors.DARK_GRAY4,
					minHeight: '100vh',
					minWidth: '100%',
					padding: 10,
				}}
			>
				Coming soon.
			</div>
		);
	}
}
