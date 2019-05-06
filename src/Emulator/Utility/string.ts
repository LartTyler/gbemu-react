export const fromBinary = (data: Uint8Array): string => String.fromCharCode(...data).replace(/\0/g, '');
