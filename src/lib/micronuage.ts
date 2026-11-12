import { site } from "@/content/site";

export type Lead = {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  /** Answers of a custom form, label → answer. */
  fields?: Record<string, string>;
  source?: string;
  consent?: boolean;
};

/** Sends a lead to the project's Leads inbox on Micronuage. */
export async function submitLead(lead: Lead): Promise<void> {
  const res = await fetch(site.micronuage.apiBase + "/api/s/" + encodeURIComponent(site.micronuage.slug) + "/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  if (!res.ok) throw new Error("Could not send the message");
}
