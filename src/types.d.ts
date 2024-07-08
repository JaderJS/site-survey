
interface Port {
    friendlyName: string;
    locationId: string;
    manufacturer: string;
    path: string;
    pnpId: string;
    productId: string;
    serialNumber: string;
    vendorId: string;
}

declare namespace serial {
    function list(): Promise<Port[]>
    function connect(path: string, baudRate: number): any
    function onData(callback: (data: Buffer) => void): void
    function onDataL(callback: (data: any) => void): void
    function disconnect(): void
    function write(data: string): void
}
