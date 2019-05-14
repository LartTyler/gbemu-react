import {Classes, Colors} from '@blueprintjs/core';
import * as React from 'react';
import {Gameboy} from './Components/Gameboy';
import {IHardwareBus} from './Emulator/Hardware';
import {HardwareBus} from './Emulator/Hardware/HardwareBus';
import './index.scss';

interface IState {
	hardware: IHardwareBus;
}

export class Layout extends React.PureComponent<{}, IState> {
	public constructor(props: {}) {
		super(props);

		this.state = {
			hardware: new HardwareBus(),
		};
	}

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
				<Gameboy hardware={this.state.hardware} />
			</div>
		);
	}
}
