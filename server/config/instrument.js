// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://b1c827d47e2e052cca4283ad3acc1f48@o4510748538896384.ingest.us.sentry.io/4510794516135936",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  // Tracing
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is evaluated only once per SDK.init call
//   profileSessionSampleRate: 1.0,
  // Trace lifecycle automatically enables profiling during active traces
//   profileLifecycle: 'trace',
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
//   sendDefaultPii: true,
});

// Profiling happens automatically after setting it up with `Sentry.init()`.
// All spans (unless those discarded by sampling) will have profiling data attached to them.
Sentry.startSpan({
  name: "My Span",
}, () => {
  // The code executed here will be profiled
}); 