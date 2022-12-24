import { Gpio } from 'onoff';

const relay = new Gpio(23, 'out');

export const turnOn = () => {
  relay.writeSync(0);
  relay.writeSync(0);
};

export const turnOff = () => {
  relay.writeSync(1);
};

export const getStatus = async () => {
  return (await relay.read()) === 0;
};

process.on('SIGINT', _ => {
  relay.unexport();
});
