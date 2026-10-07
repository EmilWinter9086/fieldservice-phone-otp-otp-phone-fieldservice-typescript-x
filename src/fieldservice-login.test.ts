import assert from "node:assert/strict";
import { loginRequest } from "./fieldservice-login.js";

assert.equal(loginRequest.safeParse({widget_record_id: "widget-1", token: "token-1"}).success, true);
assert.equal(loginRequest.safeParse({widget_record_id: "widget-1"}).success, false);
assert.equal(loginRequest.safeParse({widget_record_id: "widget-1", token: "token-1", phone: "+15551234567"}).success, false);
console.log("captcha request boundary: required fields accepted, missing and unsupported fields rejected");
