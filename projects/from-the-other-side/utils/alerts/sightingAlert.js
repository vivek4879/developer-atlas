import { EventEmitter } from 'node:events'
import { createSightingAlert } from '../createSightingAlert.js'

export const eventEmitter = new EventEmitter();

eventEmitter.on('ghost-sighted', createSightingAlert);