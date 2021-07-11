import Fastify, {
  FastifyLoggerOptions,
  FastifyReply,
  FastifyRequest,
} from 'fastify';
import { PrettyOptions } from 'fastify/types/logger';
import { getStatus, turnOff, turnOn } from './relay';
import fastifyStatic from 'fastify-static';
import path from 'path';

export const startWeb = async (callback: (onOff: boolean) => void) => {
  const prettyOptions: PrettyOptions = { colorize: true };
  const loggerOptions: FastifyLoggerOptions = {
    prettyPrint: prettyOptions,
  };
  const fastify = await Fastify({ logger: loggerOptions });

  const handleOn = async (request: FastifyRequest, reply: FastifyReply) => {
    callback(true);
    reply.redirect(302, '/');
  };
  const handleOff = async (request: FastifyRequest, reply: FastifyReply) => {
    callback(false);
    reply.redirect(302, '/');
  };
  const handleStatus = async (request: FastifyRequest, reply: FastifyReply) => {
    return { status: getStatus() };
  };
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
  });

  fastify.route({ url: '/on', method: 'GET', handler: handleOn });
  fastify.route({ url: '/off', method: 'GET', handler: handleOff });
  fastify.route({ url: '/status', method: 'GET', handler: handleStatus });

  const start = async () => {
    try {
      const port = 3000;
      await fastify.listen(port, '0.0.0.0');
      fastify.log.info(`web listening on ${port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  await start();

  return fastify;
};
