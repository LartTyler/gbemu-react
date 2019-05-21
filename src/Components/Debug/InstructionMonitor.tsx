import {TextArea} from '@blueprintjs/core';
import * as React from 'react';
import {CpuTickEvent} from '../../Emulator/Events/Cpu/CpuTickEvent';
import {IHardwareBus} from '../../Emulator/Hardware';
import {toHex} from '../../Emulator/Utility/number';

interface IProps {
	hardware: IHardwareBus;

	maxBufferLength?: number;
}

interface IState {
	buffer: string;
	bufferLength: number;
	listenerId: number;
}

export class InstructionMonitor extends React.PureComponent<IProps, IState> {
	public static defaultProps: Partial<IProps> = {
		maxBufferLength: 100,
	};

	public state: Readonly<IState> = {
		buffer: '',
		bufferLength: 0,
		listenerId: null,
	};

	public componentDidMount(): void {
		this.setState({
			listenerId: this.props.hardware.eventDispatcher.addEventListener('cpu.tick', this.onCpuTick),
		});
	}

	public componentWillUnmount(): void {
		if (!this.state.listenerId)
			return;

		this.props.hardware.eventDispatcher.removeEventListener('cpu.tick', this.state.listenerId);
	}

	public render(): React.ReactNode {
		return (
			<div>
				<TextArea
					className="monospace"
					readOnly={true}
					style={{
						minHeight: 150,
						minWidth: 500,
					}}
					value={this.state.buffer}
				/>
			</div>
		);
	}

	private onCpuTick = (event: CpuTickEvent) => {
		let buffer = `$${toHex(event.offset, false, 4)}: [${toHex(event.instruction.code)}] ${event.instruction.mnemonic}\n` +
			this.state.buffer;

		const bufferLength = this.state.bufferLength + 1;

		if (bufferLength > 100)
			buffer = buffer.substring(0, buffer.lastIndexOf('\n') - 1);

		this.setState({
			buffer,
			bufferLength,
		});
	};
}
