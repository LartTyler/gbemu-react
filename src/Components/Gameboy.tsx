import {Classes, FileInput} from '@blueprintjs/core';
import * as React from 'react';
import {IHardwareBus} from '../Emulator/hardware';

interface IProps {
	hardware: IHardwareBus;
}

interface IState {
	selectedFile: string;
	title: string;
}

export class Gameboy extends React.PureComponent<IProps, IState> {
	public state: Readonly<IState> = {
		selectedFile: null,
		title: '',
	};

	public constructor(props: IProps) {
		super(props);
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

				{this.state.selectedFile !== null && (
					<p className={Classes.TEXT_LARGE}>
						Now playing <strong>{this.state.title}</strong>...
					</p>
				)}
			</>
		);
	}

	private onCartridgeChange = (event: React.FormEvent<HTMLInputElement>) => {
		const file = event.currentTarget.files[0];

		this.setState({
			selectedFile: file.name,
		});

		this.props.hardware.memory.loadCartridge(file).then(() => this.setState({
			title: this.props.hardware.memory.getCartridge().title,
		}));
	};
}
