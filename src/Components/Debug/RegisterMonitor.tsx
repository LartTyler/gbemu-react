import {Cell, Row} from '@dbstudios/blueprintjs-components';
import * as React from 'react';
import {RegisterFlag} from '../../Emulator/Cpu/RegisterFlag';
import {CpuRegister16, CpuRegister8} from '../../Emulator/Cpu/Registers';
import {CpuTickEvent} from '../../Emulator/Events/Cpu/CpuTickEvent';
import {IHardwareBus} from '../../Emulator/Hardware';
import {toHex} from '../../Emulator/Utility/number';
import {toRegisterFlagDisplayName} from '../../Emulator/Utility/string';
import './RegisterMonitor.scss';

const byteKeys: CpuRegister8[] = ['a', 'b', 'c', 'd', 'e', 'h', 'l'];
const wordRegisters: CpuRegister16[] = ['bc', 'de', 'hl'];

interface IProps {
	hardware: IHardwareBus;
}

interface IState {
	listenerId: number;
}

export class RegisterMonitor extends React.PureComponent<IProps, IState> {
	public state: Readonly<IState> = {
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
		const registers = this.props.hardware.cpu.registers;

		return (
			<>
				<Row>
					<Cell className="monospace" size={6}>
						Program Counter: <span className="monospace">{toHex(registers.programCounter, true, 4)}</span>
					</Cell>

					<Cell className="monospace" size={6}>
						Stack Pointer: <span className="monospace">{toHex(registers.stackPointer, true, 4)}</span>
					</Cell>
				</Row>

				<Row style={{marginTop: 10}}>
					<Cell className="monospace" size={6}>
						{byteKeys.map(register => (
							<div key={register}>
								{register.toUpperCase()}: {registers[register]} ({toHex(registers[register])})
							</div>
						))}
					</Cell>

					<Cell className="monospace" size={6}>
						{wordRegisters.map(register => (
							<div key={register}>
								{register.toUpperCase()}: {registers[register]} ({toHex(registers[register], true, 4)})
							</div>
						))}

						<div style={{marginTop: 10}}>
							Flags: {Object.values(RegisterFlag).map((flag: number) => {
								if (typeof flag !== 'number')
									return null;

								const setClass = registers.flags & flag ? 'register-flag-set' : '';

								return (
									<span className={`register-flag ${setClass}`} key={flag}>
										{toRegisterFlagDisplayName(flag)}
									</span>
								);
							})}
						</div>
					</Cell>
				</Row>
			</>
		);
	}

	private onCpuTick = (event: CpuTickEvent) => {
		this.forceUpdate();
	};
}
