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
- Request payloads:
  - for POST route handler to accept client params -use-> @Body()
  - we need to determine the DTO (Data Transfer Object) schema
  - A DTO is an object that defines how the data will be sent over the network.
  - determine the DTO schema by using TypeScript interfaces, or by simple classes.
  - recommend using classes here why ? ==> Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime.

---

# Providers

- Providers:
  - Nest classes may be treated as a provider – services, repositories, factories, helpers,etc
  - main idea of a provider is that it can inject dependencies
  - @Injectable() decorator.
  - Controllers should handle HTTP requests and delegate more complex tasks to providers.
- Services:
  - CatsService - This service will be responsible for data storage and retrieval, and is designed to be used by the CatsController
  - \$ nest g service cats
  - @Injectable() decorator attaches metadata, which tells Nest that this class is a Nest provider.
- Scopes:
  - Providers normally have a lifetime ("scope") synchronized with the application lifecycle.
  - when the application shuts down, each provider will be destroyed. However, there are ways to make your provider lifetime request-scoped as well.
- Custom providers:
  - Nest has a built-in inversion of control ("IoC") container that resolves relationships between providers.
  - We can also define providers using - plain values, classes, and either asynchronous or synchronous factories.
- Optional providers:
  - provider is optional, use the @Optional() decorator in the constructor's signature.
  - If class depends on a configuration object, but if none is passed, the default values should be used.
- Property-based injection:
  - Previously we've used constructor-based injection, as providers are injected via the constructor method. In some very specific cases, property-based injection might be useful
  - if your top-level class depends on either one or multiple providers, passing them all the way up by calling super() in sub-classes from the constructor can be very tedious.
  - In order to avoid this, you can use the @Inject() decorator at the property level.
  - NOTE: If your class doesn't extend another provider, you should always prefer using constructor-based injection.
- Provider registration:
  - by editing our module file (app.module.ts) and adding the service to the providers array of the @Module() decorator

---

# Modules

- Modules:
  - class annotated with a @Module() decorator
  - @Module() decorator provides metadata that Nest makes use of to organize the application structure.
  - Each application has at least one module, a root module. The root module is the starting point Nest.
  - We want to emphasize that modules are strongly recommended as an effective way to organize your components.
  - resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.
  - Module encapsulates providers by default. which means that it's impossible to inject providers that are neither directly part of the current module nor exported from the imported modules.
  - Thus we should exports providers from a module as the module's public interface, or API. So that it this provider can be consumed by other modules
- Feature modules:
  - CatsController and CatsService belong to the same application domain. As they are closely related, it makes sense to move them into a feature module.
  - \$ nest g module cats
- Shared modules:
  - In Nest, modules are singletons by default, thus you can share the same instance of any provider between multiple modules effortlessly.
  - \$ nest g service shared/foo (Example)
- Module re-exporting:
  - modules can re-export the module that they have imported. In the example below, the CommonModule is both imported into and exported from the CoreModule

```
@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
```

- Dependency injection
  - A module class can inject providers as well (for configuration purposes)
  - A module classes themselves cannot be injected as providers due to circular dependency .
- Global modules:
  - NOTE: Angular providers are registered in the global scope ==> Once defined, they're available everywhere. Nest, however, encapsulates providers inside the module scope.
  - When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), make the module global with the @Global() decorator.
  - Global modules should be registered only once, generally by the root or core module.
  - NOTE: Making everything global is not a good design decision. Global modules are available to reduce the amount of necessary boilerplate. The imports array is generally the preferred way to make the module's API available to consumers.
- Dynamic modules:
  - This feature enables you to easily create customizable modules that can register and configure providers dynamically.

---

# Middleware

- Middleware:
  - Middleware is a function which is called before the route handler.
  - Middleware functions have access to the request and response objects, and the next() middleware function.
  - The next middleware function is commonly denoted by a variable named next
  - <Client_side> ----(http Req)---> <Middleware> --------> <Route_Handler>
  - Nest middleware are, by default, equivalent to express middleware.
  - Middleware functions can perform the following tasks:
    - make changes to the request and the response objects.
    - end the request-response cycle.
    - call the next middleware function in the stack.
    - if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
  - Nest middleware should be implemented in either a function, or in a class with an @Injectable
  -
