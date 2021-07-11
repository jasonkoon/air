import { turnOff, turnOn } from './relay';
import { watchButton } from './button';
import { startWeb } from './web';

const activateDuration = 30 * (1000 * 60);
turnOff();

let running = false;
let timer: NodeJS.Timeout;
const timedActivate = (onOff: boolean) => {
  if (!running && onOff) {
    running = true;
    turnOn();
    timer = setTimeout(() => {
      turnOff();
    }, activateDuration);
  } else {
    timer?.unref();
    running = false;
    turnOff();
  }
};

startWeb(timedActivate);

console.log('starting button watch');
watchButton(timedActivate);
console.log('button Watching');
