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
  - To apply middleware there is no place for middleware in the @Module() decorator.
  - Instead, we set them up using the configure() method of the module class.
  - Modules that include middleware have to implement the NestModule
  - We can apply middleware at : (ex- CoreModule)
    - Class Level
      - Class level Route
      - Specific method level Route
      - Specific method level Route Wildcards
    - Functional Level
    - Global Level (ex- main.ts)
- Middleware consumer
  - MiddlewareConsumer is a helper class. It provides several built-in methods to manage middleware.

---

# Exception Filters

- Nest comes with a built-in exceptions layer which is responsible for processing all unhandled exceptions across an application.
- When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.
- this action is performed by a built-in global exception filter, which handles exceptions of type HttpException (and its subclasses)
- When an exception is unrecognized the built-in exception filter generates the following default JSON response:

```
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

- Exception filters
  - full control over the exceptions layer.
  - For example, to add logging or use a different JSON schema
  - ex- http-exception.filter.ts
  - UseFilters() decorator is used to bind custom excpetion filter with particular method
  - Exception filters can be scoped at different levels: method-scoped, controller-scoped, or global-scoped. -> main.ts

---

# Pipes

- Pipes should implement the PipeTransform interface.
- Pipes use cases:
  - TRANSFORMATION: transform input data to the desired form (e.g., from string to integer)
  - VALIDATION: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect
- pipes operate on the ARGUMENTS being processed by a controller route handler.
- Nest has- built-in pipes and also we can create custom pipes
- Check - how to bind pipes to route handlers.
- Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer (global exceptions filter and any exceptions filters that are applied to the current context)
- when an exception is thrown in a Pipe, no controller method is subsequently executed.
- This gives you a best-practice technique for validating data coming into the application from external sources at the system boundary.
- Built-in pipes
  - ValidationPipe
  - ParseIntPipe
  - ParseBoolPipe
  - ParseArrayPipe
  - ParseUUIDPipe
  - DefaultValuePipe
- ParseIntPipe: pipe ensures that a method handler parameter is converted to a JavaScript integer (or throws an exception if the conversion fails). -> dog.controller.ts
- Custom Pipes:
  - \$ nest g pipe core/pipe/validation-custom
- Schema based validation:
  - Any incoming request to a method must contains a valid body.
  - So we have to validate the three members of the createDogDto object.
    - Solution-1) -> We could do this inside the route handler method, but doing so is not ideal as it would break the single responsibility rule (SRP).
    - Solution-2) -> to create a validator class and delegate the task there. This has the disadvantage that we would have to remember to call this validator at the beginning of each method.
    - Solution-3) -> creating validation middleware, This could work, but unfortunately it's not possible to create generic middleware which can be used across all contexts across the whole application.
      - because middleware is unaware of the execution context, including the handler that will be called and any of its parameters.
    - Solution-4) -> exactly the use case for which pipes are designed (IDEAL SOLUTION)
- Object schema validation (Solution -4)
  - Let us Joi library for validation
  - \$ npm install --save @hapi/joi
  - \$ npm install --save-dev @types/hapi\_\_joi (Installing Types as DevDependency)
  - \$ nest g pipe core/pipe/joi-validation
  - Create Joi Schema validations -> core/helpers/create-dog.validators.ts
  - In controller add this Joi Schema Validation -> In-order to validate incoming request POST object ==> @UsePipes(new JoiValidationPipe(CreateDogSchema))
- Global scoped pipes:
  - main.ts
  - Global pipes are used across the whole application, for every controller and every route handler.
- Transformation use case:
  - pipe can also transform the input data to the desired format.
- Providing defaults
  - dog.controller.ts

---

# Guards

- A guard is a class annotated with the @Injectable() decorator. Guards should implement the CanActivate interface.
- Guards have a single responsibility - They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) at RUN-TIME, this is called - Authorization
- Authorization (and its cousin, authentication, with which it usually collaborates) has typically been handled by middleware in traditional Express applications.
- middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the next() function.
- On the other hand, Guards have access to the ExecutionContext instance, and thus know exactly what's going to be executed next.
- Authorization guard
  - authorization is a great use case for Guards because - To specific routes should be available only when the caller (usually a specific authenticated user) has sufficient permissions.
  - The AuthGuard that we'll build now assumes an authenticated user (and that, therefore, a token is attached to the request headers).
  - It will extract and validate the token, and use the extracted information to determine whether the request can proceed or not.
  - \$ nest g guard core/auth/auth
- Role-based authentication
  - Guard that permits access only to users with a specific role. -> AuthGuard
  - \$ nest g guard core/auth/role -> RoleGuard
- Binding guards
  - like pipes and exception filters, guards can be controller-scoped, method-scoped, or global-scoped.
  - @UseGuards(AuthGuard) or @UseGuards(new AuthGuard())
- Setting roles per handler
  - could have different permission schemes for different routes. Some might be available only for an admin user, and others could be open for everyone.
  - How can we match roles to routes in a flexible and reusable way?
  - Nest provides the ability to attach custom metadata to route handlers through the @SetMetadata() decorator
  - @SetMetadata('roles', ['admin']) <-- Provide Role Data/Information
  - Check -> roles.decorator.ts

---

# Interceptors

- An interceptor is a class annotated with the @Injectable() decorator.
- Interceptors should implement the NestInterceptor interface.
- It is -> inspired by the Aspect Oriented Programming (AOP) technique.
- Using Interceptors we can:
  - bind extra logic before / after method execution
  - transform the result returned from a function
  - transform the exception thrown from a function
  - extend the basic function behavior
  - completely override a function depending on specific conditions (e.g., for caching purposes)
- intercept() method, which takes two arguments - ExecutionContext, Call handler
- Execution context - extending ArgumentsHost
- CallHandler - this interface implements the handle() method, which you can use to invoke the route handler method at some point in your interceptor.
- Binding Interceptors -> @UseInterceptors(LoggingInterceptor)

---

# Validation

- to validate the correctness of any data sent into a web application.
- ValidationPipe - builtin pipe, provides a convenient approach to enforce validation rules for all incoming client payloads, where the specific rules are declared
- Try using validationPipe at global level -> main.ts
- In order to use ValidationPipe must import lib -> \$ npm i --save class-validator class- (Need to raise issue with these library)

---

# Logger

- Nest comes with a built-in text-based logger which is used during application bootstrapping
- This functionality is provided via the -> Logger class in the @nestjs/common package
- fully control the behavior of the logging system:
  - disable logging entirely
  - specify the log level of detail (e.g., display errors, warnings, debug information, etc.)
  - completely override the default logger
  - customize the default logger by extending it
  - make use of dependency injection to simplify composing and testing your application
- Logging level - 'log', 'error', 'warn', 'debug', and 'verbose'
- In order to enable logging check- main.ts
- Implement Customize Logger -> CustomLogger and CustomizeLogger (Both are different)
- NestFactory.create()) happens outside the context of any module, it doesn't participate in the normal Dependency Injection phase of initialization.
  - So we must ensure that at least one application module imports the LoggerModule to trigger Nest to instantiate a singleton instance of our MyLogger class.
- I believe customizeLogger Module is right fit inside Shared Module bcoz - Its Service -CustomizeLogger is shared with other feature modules but in SingleInstance Mode
