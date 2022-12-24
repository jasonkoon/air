import { turnOff, turnOn } from "./relay";
// import { watchButton } from './button';
import { startWeb } from "./web";
import { FastifyLoggerInstance } from "fastify";

const activateDuration = 30 * (1000 * 60);
turnOff();

let running = false;
let timer: NodeJS.Timeout;
const timedActivate = (onOff: boolean, logger: FastifyLoggerInstance) => {
  if (!running && onOff) {
    logger.warn("server on");
    running = true;
    turnOn();
    timer = setTimeout(() => {
      logger.warn("timeout off");
      turnOff();
    }, activateDuration);
  } else {
    logger.warn("server off");
    timer?.unref();
    running = false;
    turnOff();
  }
};

startWeb(timedActivate);

// console.log('starting button watch');
// watchButton(timedActivate);
// console.log('button Watching');
