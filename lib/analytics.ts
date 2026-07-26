// Plausible tagged events: the tracker scans the clicked element's classList
// (and up to 3 parents), so a custom event needs no JS — just these classes on
// the CTA. Fires "Download" with a `method` property.
// https://plausible.io/docs/custom-event-goals
export const downloadEvent = (
  method: "dmg" | "zip" | "brew" | "appstore" | "github",
) => `plausible-event-name=Download plausible-event-method=${method}`;
