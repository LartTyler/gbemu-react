import {Button, Classes, FileInput} from '@blueprintjs/core';
import * as React from 'react';
import {IHardwareBus} from '../Emulator/Hardware';
import {InstructionMonitor} from './Debug/InstructionMonitor';
import {RegisterMonitor} from './Debug/RegisterMonitor';

interface IProps {
	hardware: IHardwareBus;
}

interface IState {
	cpuTickRate: number;
	debug: boolean;
	selectedFile: string;
	started: boolean;
	title: string;
}

export class Gameboy extends React.PureComponent<IProps, IState> {
	public state: Readonly<IState> = {
		cpuTickRate: 50,
		debug: true,
		selectedFile: null,
		started: false,
		title: '',
	};

	public constructor(props: IProps) {
		super(props);
	}

	public componentDidMount(): void {
		if (this.state.debug)
			this.props.hardware.cpu.setTickRate(this.state.cpuTickRate);
	}

	public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>): void {
		if (this.state.debug)
			this.props.hardware.cpu.setTickRate(this.state.cpuTickRate);
		else
			this.props.hardware.cpu.setTickRate(0);
	}

	public render(): React.ReactNode {
		return (
			<>
				<FileInput
					inputProps={{multiple: false}}
					onInputChange={this.onCartridgeChange}
					style={{
						marginBottom: 10,
					}}
					text={this.state.selectedFile || 'Select a cartridge...'}
				/>

				{this.state.debug && (
					<div style={{marginBottom: 10}}>
						<Button onClick={this.onStartStopClick} style={{marginRight: 5}}>
							Start / Stop
						</Button>

						<Button onClick={this.onStepClick} style={{marginRight: 5}}>
							Step
						</Button>

						<Button onClick={this.onResetClick}>
							Reset
						</Button>
					</div>
				)}

				{this.state.selectedFile !== null && (
					<p className={Classes.TEXT_LARGE}>
						Now playing <strong>{this.state.title}</strong>...
					</p>
				)}

				{this.state.debug && (
					<>
						<div style={{width: 500, marginBottom: 10}}>
							<RegisterMonitor hardware={this.props.hardware} />
						</div>

						<InstructionMonitor hardware={this.props.hardware} />
					</>
				)}
			</>
		);
	}

	private onCartridgeChange = (event: React.FormEvent<HTMLInputElement>) => {
		this.props.hardware.reset();

		const file = event.currentTarget.files[0];

		this.setState({
			selectedFile: file.name,
		});

		this.props.hardware.memory.loadCartridge(file).then(() => this.setState({
			title: this.props.hardware.memory.getCartridge().title,
		}));
	};

	private onStartStopClick = () => {
		if (this.state.started)
			this.props.hardware.cpu.stop();
		else
			this.props.hardware.cpu.start();

		this.setState({
			started: !this.state.started,
		});
	};

	private onStepClick = () => {
		this.setState({
			started: false,
		});

		this.props.hardware.cpu.stop();
		this.props.hardware.cpu.step();
	};

	private onResetClick = () => {
		this.props.hardware.cpu.reset();
		this.props.hardware.cpu.start();

		this.setState({
			started: true,
		});
	};
}
