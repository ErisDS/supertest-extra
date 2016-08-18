# supertest-extra

Additions & Extensions to [SuperTest](https://github.com/visionmedia/supertest)

Forked from [supertest-oauth](https://github.com/ryankelley/supertest-oauth) which was originally forked by [supertest-scy](https://github.com/scy/supertest-scy)

## Features

### Append request and response contents to stack trace

When a test fails, the stack trace displayed by Mocha (or whatever you use) won't contain information about the request itself. I mean, it's good to see that you got an HTTP 500 instead of the expected 200, but what was the error message? What was the data you sent in that request?

supertest-extra keeps track of the currently running request and, on error, appends all relevant information to the stack trace: request URL, headers, and body as well as response headers and body. You don't need to do anything to enable this, it just works.

Since that information can be quite a lot of output, the maximum length of attached response body data can be limited:

    // Limit to 500 characters, the default.
    supertest.setMaxBodyDump(500);

    // Disable the limit.
    supertest.setMaxBodyDump(Infinity);

It would be useful if all of the requests were written to a file for later analysis, but this is currently not implemented.


### Show request/response data for certain tests

There is a convenience wrapper that you can use to log information about any request,
for example to show what is actually sent to or received from the server.
This information is part of the request dump that's appended to the stack trace of failed test (see above),
but using this wrapper you can do that for tests that don't fail as well.

Simply use `.end(supertest.debug(done))` instead of a plain `.end(done)`.

