import { EventEmitter } from "events";

/**
 * @class SocketIO
 * @param {Object} options
 */
export default class SocketIO extends EventEmitter {

  private socket: any;

  constructor(socket: any) {
    super();
    this.socket = socket;

    this.socket.on("rtc.open", () => {
      this.emit("open");
    });

    this.socket.on("rtc.message", (message?: any) => {
      this.emit("message", message);
    });

    this.socket.on("connect", () => {
      this.socket.emit("rtc.open");
    });

    if (this.socket.connected) {
      this.socket.emit("rtc.open");
    }
  }

  public send(message: any): void {
    this.socket.emit("rtc.message", message);
  }

  public close(code: any, reason?: any): void {
    this.socket.close(code, reason || "");
  }

  public addEventListener(event: any, listener: any): void {
    this.addListener(event, listener);
  }

  public removeEventListener(event: any, listener: any): void {
    this.removeListener(event, listener);
  }
}
