<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the **DevEvent** Next.js App Router application. Here's a summary of all changes made:

- **`instrumentation-client.ts`** (new) — Initializes PostHog on the client side using the Next.js 15.3+ recommended approach. Configured with the EU PostHog host routed through a reverse proxy (`/ingest`), automatic exception capture for Error Tracking, and debug mode in development.
- **`next.config.ts`** (updated) — Added reverse proxy rewrites so PostHog ingestion requests are tunnelled through `/ingest` on your own domain (EU region), reducing the chance of ad-blocker interference. Also enabled `skipTrailingSlashRedirect` as required by PostHog.
- **`components/ExploreBtn.tsx`** (updated) — Converted to capture a `posthog.capture('explore_events_clicked')` event when the "Explore Events" CTA button is clicked. This event marks the top of the user engagement funnel.
- **`components/EventCard.tsx`** (updated) — Converted to a client component to capture `posthog.capture('event_card_clicked')` with rich properties (`event_title`, `event_slug`, `event_location`, `event_date`) whenever a user clicks an event card.
- **`components/Navbar.tsx`** (updated) — Converted to a client component to capture `posthog.capture('nav_link_clicked')` with `nav_label` and `nav_href` properties on each navigation link click.
- **`.env.local`** (created) — `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` added securely. The file is covered by `.gitignore`.

## Events instrumented

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the "Explore Events" CTA button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details (includes title, slug, location, date) | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the top navbar (includes label and href) | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://eu.posthog.com/project/129251/dashboard/533117
- 📈 **Event Engagement Overview** (daily trend of CTA + card clicks): https://eu.posthog.com/project/129251/insights/S9rG4LnV
- 🔽 **Explore to Event Detail Funnel** (conversion from CTA click → card click): https://eu.posthog.com/project/129251/insights/vqkOqOgl
- 🏆 **Most Clicked Events by Title** (which events attract the most interest): https://eu.posthog.com/project/129251/insights/kEmcyIAt
- 🧭 **Navigation Link Popularity** (which nav links users click most): https://eu.posthog.com/project/129251/insights/eqCcOUPC
- 👥 **Daily Active Users by Engagement** (unique users engaging per day): https://eu.posthog.com/project/129251/insights/ZzhOa8A9

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
