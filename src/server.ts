import { turnOff, turnOn } from './relay';
import { watchButton } from './button';

const activateDuration = 30 * (1000 * 60);
turnOff();

let running = false;
let timer: NodeJS.Timeout;
const timedActivate = () => {
  if (!running) {
    running = true;
    turnOn();
    timer = setTimeout(() => {
      turnOff();
    }, activateDuration);
  } else {
    timer.unref();
    running = false;
    turnOff();
  }
};

console.log('starting button watch');
watchButton(timedActivate);
console.log('button Watching');
