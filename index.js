import httpProxy from "http-proxy";

export default function (options) {

  // Support for port only (localhost)
  if (typeof options === "number") {
    options = {
      target: "localhost",
      port: options
    };
  }

  // Support for target string
  if (typeof options === "string") {
    options = {
      target: options
    };
  }

  // Default to port 8080
  if (!options) {
    options = {
      target: {
        host: "localhost",
        port: 8080
      }
    };
  }

  return {
    name: "vite-404-proxy",
    configureServer(server) {
      setImmediate(function () {
        const proxy = new httpProxy.createProxyServer(options);

        const middleware = server.middlewares.stack.find(
          (v) => v.handle.name === "vite404Middleware"
        );

        middleware.handle = async function viteRedirect404(req, res, next) {
          proxy.web(req, res);
        };
      });
    }
  };
}