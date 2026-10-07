import { z } from "zod";
import { callCaptcha } from "./infrai-phone.js";

export const loginRequest = z.object({widget_record_id: z.string().min(1), token: z.string().min(1)}).strict();
export type LoginRequest = z.infer<typeof loginRequest>;

export async function technicianLogin(input: LoginRequest) {
  const parsed = loginRequest.parse(input);
  return callCaptcha({widget_record_id: parsed.widget_record_id, token: parsed.token});
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [widget_record_id, token] = process.argv.slice(2);
  technicianLogin({widget_record_id: widget_record_id ?? "", token: token ?? ""}).then((result) => {
    if (!result.ok) { console.error(result.error); process.exitCode = 1; return; }
    console.log(JSON.stringify(result.data));
  }).catch((error) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
}
