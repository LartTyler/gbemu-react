import {Classes, Colors} from '@blueprintjs/core';
import * as React from 'react';
import {Gameboy} from './Components/Gameboy';
import {Cpu} from './Emulator/Cpu/Cpu';
import {HardwareBus, IHardwareBus} from './Emulator/hardware';
import {Memory} from './Emulator/Memory/Memory';
import './index.scss';

interface IState {
	hardware: IHardwareBus;
}

export class Layout extends React.PureComponent<{}, IState> {
	public constructor(props: {}) {
		super(props);

		const cpu = new Cpu();
		const memory = new Memory();

		this.state = {
			hardware: new HardwareBus(cpu, memory),
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
