import { Logger } from 'seq-logging';
import { logger as loggerConfig } from '../config';

let logger = new Logger({ serverUrl: loggerConfig.url });


export function LogInfo(message: string): void {
    logger.emit({
        timestamp: new Date(),
        level: 'Information',
        messageTemplate: message,
        properties: {
            n: 20
        }
    });
}

export function LogError(message: string): void {
    logger.emit({
        timestamp: new Date(),
        level: 'Error',
        messageTemplate: message,
        properties: {
            n: 20
        }
    });
}