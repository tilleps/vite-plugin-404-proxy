# vite-plugin-404-proxy

Vite plugin that proxies requests to a backend server when files are not found.  Defaults to http://localhost:8080


```js
// vite.config.ts
import proxyPlugin from "vite-plugin-404-proxy";

export default {
  plugins: [
    proxyPlugin()
  ]
}
```


## Installation


```sh
npm install --save-dev vite-plugin-404-proxy
```


## Options

Short hand options are provided below:


Specify a port (host will be localhost)
```js
// vite.config.ts
import proxyPlugin from "vite-plugin-404-proxy";

// Set to port 8080 (localhost)
export default {
  plugins: [
    proxyPlugin(8080)
  ]
}
```

Specify a target string
```js
// vite.config.ts
import proxyPlugin from "vite-plugin-404-proxy";

export default {
  plugins: [
    proxyPlugin("http://localhost:8080")
  ]
}
```


Full [`http-proxy` options](https://github.com/http-party/node-http-proxy#options)
```js
// Options object to vite-plugin-404-proxy will be supplied to http-proxy
const httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer(options);
```

```js
// vite.config.ts
import proxyPlugin from "vite-plugin-404-proxy";

export default {
  plugins: [
    proxyPlugin({
      target: {
        host: "localhost",
        port: 8080
      }
    })
  ]
}
```


## License

MIT

