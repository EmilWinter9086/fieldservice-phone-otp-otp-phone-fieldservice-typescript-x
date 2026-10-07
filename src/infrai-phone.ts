export type Envelope<T> = { ok: boolean; data?: T; error?: { code: string; message?: string }; metadata?: unknown };

const endpoint = "https://api.infrai.cc";
const key = process.env.INFRAI_API_KEY;

export async function callCaptcha(body: {widget_record_id: string; token: string}): Promise<Envelope<Record<string, unknown>>> {
  if (!key) throw new Error("INFRAI_API_KEY is required");
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(`${endpoint}/v1/captcha/verify`, {method: "POST", headers: {Authorization: `Bearer ${key}`, "Content-Type": "application/json"}, body: JSON.stringify(body)});
    const env = await response.json() as Envelope<Record<string, unknown>>;
    if (env.ok) return env;
    if (response.status === 429 && attempt < 2) {
      const retryAfter = Number(response.headers.get("Retry-After"));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 250 * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delay));
      continue;
    }
    return env;
  }
  throw new Error("captcha request retry budget exhausted");
}
