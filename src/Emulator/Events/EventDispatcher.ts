import {IEvent} from './Event';

export type EventListener<T extends IEvent = IEvent> = (event: T) => void;

export interface IEventListenerMap {
	[key: string]: {[key: number]: EventListener};
}

export class EventDispatcher {
	protected listeners: IEventListenerMap = {};
	protected listenerIds: {[key: string]: number} = {};

	public dispatch<T extends IEvent>(event: T): void {
		if (typeof this.listeners[event.name] === 'undefined')
			return;

		for (const key in this.listeners[event.name])
			this.listeners[event.name][key](event);
	}

	public reset(): void {
		this.listeners = {};
		this.listenerIds = {};
	}

	public addEventListener(event: string, listener: EventListener): number {
		if (typeof this.listeners[event] === 'undefined') {
			this.listeners[event] = {};
			this.listenerIds[event] = 0;
		}

		const id = ++this.listenerIds[event];

		this.listeners[event][id] = listener;

		return id;
	}

	public removeEventListeners(event: string): void {
		delete this.listeners[event];
	}

	public removeEventListener(event: string, listener: number | EventListener): boolean {
		if (typeof this.listeners[event] === 'undefined')
			return false;

		if (typeof listener === 'number')
			return this.removeEventListenerByKey(event, listener);
		else
			return this.removeEventListenerByReference(event, listener);
	}

	protected removeEventListenerByKey(event: string, listener: number): boolean {
		const removed = typeof this.listeners[event][listener] !== 'undefined';

		delete this.listeners[event][listener];

		return removed;
	}

	protected removeEventListenerByReference(event: string, listener: EventListener): boolean {
		for (const key in this.listeners[event]) {
			if (this.listeners[event][key] === listener) {
				delete this.listeners[event][key];

				return true;
			}
		}

		return false;
	}
}
