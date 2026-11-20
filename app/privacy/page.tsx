import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { briefChannel, site } from "@/lib/site";

export const metadata: Metadata = { title: `Privacy policy | ${site.brand} Studio` };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="{{date}}"
      sections={[
        { heading: "Who we are", body: `${site.brand} Studio ({{registered business name}}), ${site.address.join(", ") || site.city}.${site.email ? " Contact " + site.email + "." : ""}` },
        { heading: "What we collect", body: briefChannel === "download" ? "The brief form creates a text file on your device. You choose whether and how to share that file." : `The form prepares your project details and opens ${briefChannel}. The studio receives them when you send the message.` },
        { heading: "How we use it", body: "Only to reply to your enquiry, prepare a quote and run the project you book. {{Any other uses, for example newsletters, and how people opt in}}" },
        { heading: "How long we keep it", body: "{{Retention period}}" },
        { heading: "Cookies and analytics", body: "{{Which analytics or cookies the site uses, if any}}" },
        { heading: "Your rights", body: `You can ask to see, correct or delete the personal details we hold about you ${site.email ? "by writing to " + site.email : "through the channel you used to share them"}.` },
      ]}
    />
  );
}
