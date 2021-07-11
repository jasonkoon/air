import { Gpio } from 'onoff';

const relay = new Gpio(23, 'out');

export const turnOn = () => {
  relay.writeSync(0);
};

export const turnOff = () => {
  relay.writeSync(1);
};

export const getStatus = () => {
  return relay.readSync() === 0;
};

process.on('SIGINT', _ => {
  relay.unexport();
});
