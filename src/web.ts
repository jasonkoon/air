import Fastify, {
  FastifyLoggerOptions,
  FastifyReply,
  FastifyRequest,
  FastifyLoggerInstance,
} from "fastify";
import { PrettyOptions } from "fastify/types/logger";
import { getStatus, turnOff, turnOn } from "./relay";
import fastifyStatic from "fastify-static";
import path from "path";

export const startWeb = async (
  callback: (onOff: boolean, logger: FastifyLoggerInstance) => void
) => {
  const prettyOptions: PrettyOptions = { colorize: true };
  const loggerOptions: FastifyLoggerOptions = {
    prettyPrint: prettyOptions,
    level: "warn",
  };
  const fastify = await Fastify({ logger: loggerOptions });

  const handleOn = async (request: FastifyRequest, reply: FastifyReply) => {
    callback(true, fastify.log);
    fastify.log.warn("web turn on");
    return {};
  };
  const handleOff = async (request: FastifyRequest, reply: FastifyReply) => {
    callback(false, fastify.log);
    fastify.log.warn("web turn off");
    return {};
  };
  const handleStatus = async (request: FastifyRequest, reply: FastifyReply) => {
    const status = getStatus();
    if (await status) {
      return "on";
    }

    return "off";
  };
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
  });

  fastify.route({ url: "/on", method: "GET", handler: handleOn });
  fastify.route({ url: "/off", method: "GET", handler: handleOff });
  fastify.route({ url: "/status", method: "GET", handler: handleStatus });

  const start = async () => {
    try {
      const port = 3000;
      await fastify.listen(port, "0.0.0.0");
      fastify.log.warn(`web listening on ${port}`);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  };
  await start();

  return fastify;
};
