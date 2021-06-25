import { Gpio } from 'onoff';

const button = new Gpio(4, 'in', 'rising', { debounceTimeout: 50 });

export const watchButton = (toggle: () => void) => {
  button.watch((err, value) => {
    if (err) {
      throw err;
    }
    toggle();
  });
};

process.on('SIGINT', _ => {
  button.unexport();
});
