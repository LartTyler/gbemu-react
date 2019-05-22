import {Button, Classes, Colors, ControlGroup, FileInput, FormGroup, InputGroup, Switch} from '@blueprintjs/core';
import {Cell, Row} from '@dbstudios/blueprintjs-components';
import * as React from 'react';
import {IHardwareBus} from '../Emulator/Hardware';
import {Debugger} from './Debug/Debugger';
import {InstructionMonitor} from './Debug/InstructionMonitor';
import {RegisterMonitor} from './Debug/RegisterMonitor';

interface IProps {
	hardware: IHardwareBus;
}

interface IState {
	cpuTickRate: string;
	debug: boolean;
	selectedFile: string;
	started: boolean;
	title: string;
}

export class Gameboy extends React.PureComponent<IProps, IState> {
	public state: Readonly<IState> = {
		cpuTickRate: '50',
		debug: false,
		selectedFile: null,
		started: false,
		title: '',
	};

	public constructor(props: IProps) {
		super(props);
	}

	public componentDidMount(): void {
		if (this.state.debug)
			this.props.hardware.cpu.setTickRate(parseInt(this.state.cpuTickRate, 10));
	}

	public render(): React.ReactNode {
		return (
			<div style={{width: 500}}>
				<p className={Classes.TEXT_LARGE}>
					{this.state.selectedFile !== null && (
						<>Now playing <strong>{this.state.title}</strong>...</>
					) || (
						<>Select a ROM to load</>
					)}
				</p>

				<ControlGroup style={{marginBottom: 10}}>
					<FileInput
						fill={true}
						hasSelection={this.state.selectedFile !== null}
						inputProps={{multiple: false}}
						onInputChange={this.onCartridgeChange}
						text={this.state.selectedFile || 'Select a cartridge...'}
					/>

					<Button icon="power" onClick={this.onPowerClick} />
				</ControlGroup>

				<Debugger
					enabled={this.state.debug}
					hardware={this.props.hardware}
					onEnabledChange={this.onDebuggerEnabledChange}
				/>
			</div>
		);
	}

	private onCartridgeChange = (event: React.FormEvent<HTMLInputElement>) => {
		this.props.hardware.reset();

		const file = event.currentTarget.files[0];

		this.setState({
			selectedFile: file.name,
		});

		this.props.hardware.memory.loadCartridge(file).then(() => {
			this.setState({
				title: this.props.hardware.memory.getCartridge().title,
			});

			if (!this.state.debug) {
				this.props.hardware.cpu.start();

				this.setState({
					started: true,
				});
			}
		});
	};

	private onDebuggerEnabledChange = (enabled: boolean) => this.setState({
		debug: enabled,
	});

	private onPowerClick = () => {
		this.props.hardware.reset();
		this.props.hardware.cpu.start();

		this.setState({
			started: true,
		});
	};
}
