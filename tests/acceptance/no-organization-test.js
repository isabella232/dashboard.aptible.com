import Ember from "ember";
import { stubRequest } from "ember-cli-fake-server";
import {module, test} from "qunit";
import startApp from "../helpers/start-app";

let App;

module("Acceptance: No Organization Page", {
  beforeEach: function() {
    App = startApp();

    stubRequest("get", "/organizations", function() {
      return this.success({
        _embedded: {
          organizations: []
        }
      });
    });

    stubRequest("get", "/accounts", function() {
      return this.success({
        _embedded: {
          accounts: []
        }
      });
    });
  },
  afterEach: function() {
    Ember.run(App, "destroy");
  }
});

test("visiting / redirects to no organization page", function(assert) {
  signInAndVisit("/");

  andThen(function() {
    assert.equal(currentPath(), "no-organization");
    expectLink("aptible.com/support");
    expectLink("status.aptible.com");
    expectLink("twitter.com/aptiblestatus");
    assert.ok(find(`a[href="/settings/logout"]`).length,
              "Has link to /settings/logout");
  });
});
