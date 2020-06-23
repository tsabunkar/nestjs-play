# Nestjs

- \$ npm i -g @nestjs/cli
- \$ nest new nestjs-play
- keeping each module in its own dedicated directory.
- There are two HTTP platforms supported out-of-the-box: express and fastify.

---

# Controllers

- Controller
  - responsible for handling incoming requests and returning responses to the client.
  - A controller's purpose is to receive specific requests for the application. The routing mechanism controls which controller receives which requests.
  - to create a basic controller, we use classes and decorators.
  - Decorators associate classes with required metadata and enable Nest to create a routing map
- Routing
  - @Controller() decorator, which is required to define a basic controller.
  - defined at Class level, used to group a set of routes
  - \$ nest g controller cats
  - How route is formed/made -> the path includes both the optional controller path prefix + any path string declared in the request method decorator. ex- @Controller('cats') and @Get('profile') thus request url - GET /cats/profile
  - Nest employs 2 different options for manipulating responses:
    - Standard :
      - when a request handler returns a JavaScript object or array, it will automatically be serialized to JSON.
      - When it returns a JavaScript primitive type (e.g., string, number, boolean), however, Nest will send just the value without attempting to serialize it.
      - the response's status code is always 200 by default, except for POST requests which use 201.
      - We can easily change this behavior by adding the @HttpCode(...) decorator at a handler-level
    - Library-specific :
      - We can use the library-specific (e.g., Express) response object
      - Which can be injected using the @Res() decorator in the method handler signature (e.g., findAll(@Res() response))
      - with Express, you can construct responses using code like response.status(200).send()
  - NOTE : we cannot use both approaches at the same time. If both approaches are used at the same time, the Standard approach is automatically disabled.
- Request object :
  - Nest provides access to the request object of the underlying platform (Express by default).
  - We can access the request object by instructing Nest to inject it by adding the @Req() decorator to the handler's signature.
- Resources :
  - Nest provides the rest of the standard HTTP request endpoint decorators - @Put(), @Delete(), @Patch(), @Options(), @Head(), and @All()
- Route wildcards :
  - asterisk is used as a wildcard, and will match any combination of characters.
  - The characters ?, +, \*, and () may be used in a route path, and are subsets of their regular expression counterparts.
  - The hyphen (-) and the dot (.) are interpreted literally by string-based paths.
- Status Code :
  - response status code is always 200 by default
  - except for POST requests which are 201.
  - We can easily change this behavior by adding the @HttpCode(...) decorator at a handler level.
- Headers :
  - @Header() decorator or a library-specific (express) response object (and call res.header() directly)
  - This Response Header, not Request Header
- Redirection :
  - To redirect a response to a specific URL, you can either use a @Redirect() decorator or a library-specific response object (and call res.redirect() directly).
  - requires url argument, and an optional statusCode argument.
  - statusCode defaults to 302 (Found) if omitted.
- Route parameters:
  - Routes with dynamic data can be accessed.
  - Route parameters declared in this way can be accessed using the @Param() decorator, which should be added to the method signature.
- Sub-Domain Routing:
  - A subdomain is a domain that is part of a larger domain
  - For example, west.example.com and east.example.com are subdomains of the example.com domain
  - @Controller decorator can take a host option to require that the HTTP host of the incoming requests matches
  - route path specified in the host can be accessed dynamically using @HostParam() decorator
  - example: \$ nest g controller sub-domain
- Scopes :
  - Node.js doesn't follow the request/response Multi-Threaded Stateless Model in which every request is processed by a separate thread. Hence, using singleton instances is fully safe for our applications.
- Asynchronicity :
  - Every async function has to return a Promise
  - RxJs Observable - Nest will automatically subscribe to the source underneath and take the last emitted value (once the stream is completed).
