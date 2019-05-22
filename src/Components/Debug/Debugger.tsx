import {Button, FormGroup, InputGroup, Switch} from '@blueprintjs/core';
import {Cell, Row} from '@dbstudios/blueprintjs-components';
import * as React from 'react';
import {IHardwareBus} from '../../Emulator/Hardware';
import {InstructionMonitor} from './InstructionMonitor';
import {RegisterMonitor} from './RegisterMonitor';

interface IProps {
	enabled: boolean;
	hardware: IHardwareBus;

	onEnabledChange?: (enabled: boolean) => void;
}

interface IState {
	paused: boolean;
	tickRate: string;
}

export class Debugger extends React.PureComponent<IProps, IState> {
	public constructor(props: IProps) {
		super(props);

		this.state = {
			paused: !props.hardware.cpu.isRunning(),
			tickRate: '50',
		};
	}

	public componentDidUpdate(prevProps: Readonly<IProps>): void {
		if (this.props.enabled === prevProps.enabled)
			return;

		if (this.props.enabled)
			this.props.hardware.cpu.setTickRate(parseInt(this.state.tickRate, 10));
		else {
			this.props.hardware.cpu.setTickRate(0);
			this.props.hardware.cpu.start();

			this.setState({
				paused: false,
			});
		}
	}

	public render(): React.ReactNode {
		return (
			<>
				<div style={{marginBottom: 10}}>
					<Row>
						<Cell size={3}>
							<FormGroup label="Enable Debug">
								<Switch checked={this.props.enabled} onChange={this.onEnabledChange} />
							</FormGroup>
						</Cell>

						{this.props.enabled && (
							<>
								<Cell size={5}>
									<FormGroup label="CPU Tick Rate" helperText="Tick rate cannot be lower than 50ms">
										<InputGroup
											onBlur={this.onTickRateBlur}
											onChange={this.onTickRateChange}
											value={this.state.tickRate}
										/>
									</FormGroup>
								</Cell>

								<Cell size={2}>
									<FormGroup label={<span>&nbsp;</span>}>
										<Button fill={true} onClick={this.onPauseClick}>
											{this.state.paused ? 'Resume' : 'Pause'}
										</Button>
									</FormGroup>
								</Cell>

								<Cell size={2}>
									<FormGroup label={<span>&nbsp;</span>}>
										<Button fill={true} onClick={this.onStepClick}>
											Step
										</Button>
									</FormGroup>
								</Cell>
							</>
						)}
					</Row>
				</div>

				{this.props.enabled && (
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

	private onEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!this.props.onEnabledChange)
			return;

		this.props.onEnabledChange(event.currentTarget.checked);
	};

	private onPauseClick = () => {
		if (this.state.paused)
			this.props.hardware.cpu.start();
		else
			this.props.hardware.cpu.stop();

		this.setState({
			paused: !this.state.paused,
		});
	};

	private onStepClick = () => {
		if (!this.state.paused) {
			this.props.hardware.cpu.stop();

			this.setState({
				paused: true,
			});
		}

		this.props.hardware.cpu.step();
	};

	private onTickRateBlur = () => {
		const tickRate = Math.max(parseInt(this.state.tickRate, 10) || 50, 50);

		this.setState({
			tickRate: tickRate.toString(10),
		});

		this.props.hardware.cpu.setTickRate(tickRate);
	};

	private onTickRateChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
		tickRate: event.currentTarget.value,
	});
}
