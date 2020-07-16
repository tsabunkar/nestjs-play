API Desgin Protocols:

- resource should be noun (name of thing) not a verb (action) ex- nouns would be ticket, user and customer.

- uri should be plural not singular ex- tickets not ticket

- RESTful principles provide strategies to handle CRUD actions using HTTP methods

GET /tickets - Retrieves a list of tickets
GET /tickets/12 - Retrieves a specific ticket
POST /tickets - Creates a new ticket
PUT /tickets/12 - Updates ticket #12
PATCH /tickets/12 - Partially updates ticket #12
DELETE /tickets/12 - Deletes ticket #12

IF there is Relationship b/w entities:

GET /tickets/12/messages - Retrieves list of messages for ticket #12
GET /tickets/12/messages/5 - Retrieves message #5 for ticket #12
POST /tickets/12/messages - Creates a new message in ticket #12
PUT /tickets/12/messages/5 - Updates message #5 for ticket #12
PATCH /tickets/12/messages/5 - Partially updates message #5 for ticket #12
DELETE /tickets/12/messages/5 - Deletes message #5 for ticket #12

- use SSL protocol for API URLs
- Robust Documentation - Swagger, examples of complete request/response cycles, include any deprecation schedules, etc
- Versioning-

      	- Academically speaking, it should probably be in a header. However, the version needs to be in the URL
      	- Stripe has taken to API versioning - the URL has a major version number (v1), but the API has date based sub-versions which can be chosen using a custom HTTP request header. In this case, the major version provides structural stability of the API as a whole while the sub-versions accounts for smaller changes

- Result filtering, sorting & searching

      	- Filtering:
      		- example: requesting a list of tickets from the /tickets endpoint, you may want to limit these to only those in the open state. This could be accomplished with a request like GET /tickets?state=open. Here, state is a query parameter that implements a filter.
      	- Sorting:
      		- complex sorting requirements by letting the sort parameter take in list of comma separated fields, each with a possible unary negative to imply descending sort order.
      		- GET /tickets?sort=-priority - Retrieves a list of tickets in descending order of priority
      		- GET /tickets?sort=-priority,created_at - Retrieves a list of tickets in descending order of priority. Within a specific priority, older tickets are ordered first
      	- Searching:
      		- power of full text search using ElasticSearch or another Lucene based search technology.
      		- GET /tickets?sort=-updated_at - Retrieve recently updated tickets
      		- GET /tickets?state=closed&sort=-updated_at - Retrieve recently closed tickets
      		- GET /tickets?q=return&state=open&sort=-priority,created_at - Retrieve the highest priority open tickets mentioning the word 'return'
      	- fields:
      		- fields query parameter that takes a comma separated list of fields to include. For example, the following request would retrieve just enough information to display a sorted listing of open tickets:
      		GET /tickets?fields=id,subject,updated_at&state=open&sort=-updated_at
      		GET /tickets?embed=customer&fields=id,customer.id,customer.name

- Updates & creation should return a resource representation:

      	- PUT, POST or PATCH call may make modifications to fields of the underlying resource that weren't part of the provided parameters (for example: created_at or updated_at timestamps).
      	-  To prevent an API consumer from having to hit the API again for an updated representation, make sure the API return the updated (or created) representation as part of the response
      	- In case of a POST that resulted in a creation, use a HTTP 201 status code and include a Location header that points to the URL of the new resource.

- HATEOAS:

      	- RESTful design principles specify HATEOAS which roughly states that interaction with an endpoint should be defined within metadata that comes with the output representation
      	-  I don't think we're ready for HATEOAS on APIs just yet. When browsing a website, decisions on what links will be clicked are made at run time. However, with an API, decisions as to what requests will be sent are made when the API integration code is written, not at run time. Could the decisions be deferred to run time? Sure, however, there isn't much to gain going down that route as code would still not be able to handle significant API changes without breaking. That said, I think HATEOAS is promising but not ready for prime time just yet.

- JSON only responses no more XML

- snake_case vs camelCase for field names:

      	- JSON  as your primary representation format then follow javaScript naming conventions - and that means camelCase for field names.
      	- best to use idiomatic naming conventions in them - camelCase for C# & Java, snake_case for python & ruby.
      	- Based on an eye tracking study on camelCase and snake_case (PDF) from 2010, snake_case is 20% easier to read than camelCase!

- JSON encoded POST, PUT & PATCH bodies:

      	- API that accepts JSON encoded POST, PUT & PATCH requests should also require the Content-Type header be set to application/json or throw a 415 Unsupported Media Type HTTP status code.

- Auto loading related resource representations: (Object inside object/Array of object)

      	- API consumer needs to load data related to (or referenced from) the resource being requested. Rather than requiring the consumer to hit the API repeatedly for this on multiple source , there would be a significant efficiency gain from allowing related data to be returned and loaded alongside the original resource on demand.
      	- RESTful principles, we can minimize our deviation by only doing so based on an embed (or expand) in Query parameter.
      	- GET /tickets/12?embed=customer.name,assigned_user

- Rate limiting

      	- To prevent abuse, it is standard practice to add some sort of rate limiting to an API. HTTP status code 429 Too Many Requests.
      	- minimum, include the following headers:
      		- X-Rate-Limit-Limit - The number of allowed requests in the current period
      		- X-Rate-Limit-Remaining - The number of remaining requests in the current period
      		- X-Rate-Limit-Reset - The number of seconds left in the current period

- Authentication:

      	- A RESTful API should be stateless. This means that request authentication should not depend on cookies or sessions. Instead, each request should come with some sort authentication credentials.
      	- By always using SSL, the authentication credentials can be simplified to a randomly generated access token that is delivered in the user name field of HTTP Basic Auth.
      	- 401 Unauthorized status code from the server.
      	- Recommended -> OAuth 2 uses Bearer tokens & also depends on SSL for its underlying transport encryption.

- Errors

      	- like an HTML error page shows a useful error message to a visitor, an API should provide a useful error message in a known consumable format.
      	- API should always return sensible HTTP status codes
      	- 400 series status codes for client issues & 500 series status codes for server issues.
      	- Validation errors for PUT, PATCH and POST requests will need a field breakdown.
      	- validation failures and providing the detailed errors in an additional errors field.

- HTTP status codes (usage of right status code)

      	- 200 OK - Response to a successful GET, PUT, PATCH or DELETE
      	- 201 Created - Response to a POST that results in a creation. Should be combined with a Location header pointing to the location of the new resource
      	- 204 No Content - Response to a successful request that won't be returning a body (like a DELETE request)
      	- 304 Not Modified - Used when HTTP caching headers are in play
      	- 400 Bad Request - The request is malformed, such as if the body does not parse
      	- 401 Unauthorized - When no or invalid authentication details are provided. Also useful to trigger an auth popup if the API is used from a browser
      	- 403 Forbidden - When authentication succeeded but authenticated user doesn't have access to the resource
      	- 404 Not Found - When a non-existent resource is requested
      	- 405 Method Not Allowed - When an HTTP method is being requested that isn't allowed for the authenticated user
      	- 410 Gone - Indicates that the resource at this end point is no longer available. Useful as a blanket response for old API versions
      	- 415 Unsupported Media Type - If incorrect content type was provided as format/part of the request
      	- 422 Unprocessable Entity - Used for validation errors
      	- 429 Too Many Requests - When a request is rejected due to rate limiting

---

REF:

- https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api
- https://idratherbewriting.com/learnapidoc/
- https://restfulapi.net/resource-naming/
- https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/
- https://idratherbewriting.com/learnapidoc/
