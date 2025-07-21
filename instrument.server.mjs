import * as Sentry from "@sentry/react-router";

Sentry.init({
    dsn: "https://c9f71c3b76a5853ff38b4cff4c645445@o4509632219250688.ingest.us.sentry.io/4509632223313920",

    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
});
