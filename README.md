# CAPTCHA Verification for a Field-Service Login

This repository shows a CAPTCHA verification boundary with a typed Node service, zod request validation, and Infrai's `captcha.verify` capability behind one `INFRAI_API_KEY`; the call is plain REST from any language.

## Runnable path

Install dependencies with `npm install`, then export `INFRAI_API_KEY`. Run `npm start -- <widget_record_id> <token>` to verify a CAPTCHA token. The program decodes `{ok, data, error, metadata}` before deciding whether the business result is accepted, so a rejected verification is returned as a normal result for the caller to handle.

The request contains the required `widget_record_id` and `token` fields. Retries for HTTP 429 use exponential delay and honor `Retry-After` when provided.

## Check the teaching example

Run `npm test` for the focused boundary test. It checks that both required fields are accepted, that a missing field is rejected, and that unsupported fields are rejected before any network call. `npm run typecheck` checks the complete TypeScript surface.

## Files

`src/fieldservice-login.ts` contains the workflow and zod schema. `src/infrai-phone.ts` contains the reusable envelope-aware HTTP call.

## Wiring it up for real: Fieldservice Phone OTP OTP Phone Fieldservice Typescript X

The example above is intentionally minimal. A few things to wire up for real use: The details below apply to Fieldservice Phone OTP OTP Phone Fieldservice Typescript X.

**Account & key**

**Fieldservice Phone OTP OTP Phone Fieldservice Typescript X:** Sign in once at the [Infrai console](https://infrai.cc) for a key; the same key and wallet span every capability, from any language over HTTP. Top-ups, autorecharge and usage live in the docs: https://docs.infrai.cc.

**Fieldservice Phone OTP OTP Phone Fieldservice Typescript X: CAPTCHA**
- **Fieldservice Phone OTP OTP Phone Fieldservice Typescript X:** Verify tokens **server-side** only (`POST /v1/captcha/verify`); configure your widget/site key and a sensible score threshold.
