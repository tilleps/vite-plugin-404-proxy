const httpProxy = require("http-proxy");

module.exports = function (options) {

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

        function vite404ProxyMiddleware(req, res, next) {
          proxy.web(req, res);
        }

        //
        //  Remove existing 404 middleware
        //  vite404Middleware is only added with appType: "spa" | "mpa"
        //
        const vite404MiddlewareIndex = server.middlewares.stack.findIndex(
          (v) => v.handle.name === "vite404Middleware"
        );

        if (~vite404MiddlewareIndex) {
          server.middlewares.stack.splice(vite404MiddlewareIndex, 1);
        }

        //
        //  Add proxy middleware before error middleware
        //
        const errorMiddlewareIndex = server.middlewares.stack.findIndex(
          (v) => v.handle.name === "viteErrorMiddleware"
        );

        if (~errorMiddlewareIndex) {
          server.middlewares.stack.splice(errorMiddlewareIndex, 0, {
            route: "",
            handle: function vite404ProxyMiddleware(req, res, next) {
              // undo the url change made by htmlFallbackMiddleware 
              req.url = req.originalUrl;

              // proxy
              proxy.web(req, res, next);
            }
          });
        }

      });
    }
  };
}