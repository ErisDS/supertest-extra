module.exports = function (superagent) {

    /**
     * Module dependencies
     */

    var agent = superagent.Request;

    agent.prototype.sign = function (oauth, token) {
        this.oauth = oauth;
        this.token = token;
        return this;
    };

    agent.prototype.signOauth2 = function () {
        this.set('Authorization', this.oauth.buildAuthHeader(this.token));
    };

    /**
     * Overrides .request() to add the OAuth2 access token query param if needed.
     * This cannot happen during .end() because the "query" params get processed
     * before that here in the request() function.
     */

    var oldRequest = agent.prototype.request;

    agent.prototype.request = function () {
        this.request = oldRequest
        if (this.oauth && this.oauth._request) {
            this.signOauth2();
        }

        return this.request();
    }

};