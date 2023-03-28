# vite-plugin-404-proxy

Vite plugin that proxies requests to a backend server when files are not found

```js
// vite.config.ts
import 404Proxy from "tilleps/vite-plugin-404-proxy";

export default {
  plugins: [
    404Proxy()
  ]
}
```


## Options

Short hand options are provided below:


Specify a port (host will be localhost)
```js
// vite.config.ts
import 404Proxy from "tilleps/vite-plugin-404-proxy";

// Set to port 8080 (localhost)
export default {
  plugins: [
    404Proxy(8080)
  ]
}
```

Specify a target string
```js
// vite.config.ts
import 404Proxy from "tilleps/vite-plugin-404-proxy";

export default {
  plugins: [
    404Proxy("http://localhost:8080")
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
import 404Proxy from "tilleps/vite-plugin-404-proxy";

export default {
  plugins: [
    404Proxy({
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

