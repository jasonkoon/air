import { Gpio } from 'onoff';

const button = new Gpio(4, 'in', 'rising', { debounceTimeout: 200 });

export const watchButton = (callback: (onOff: boolean) => void) => {
  button.watch((err, value) => {
    if (err) {
      throw err;
    }
    console.log(`button value ${value}`);
    callback(value === 1);
  });
};

process.on('SIGINT', _ => {
  button.unexport();
});
