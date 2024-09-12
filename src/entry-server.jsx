import React from "react";
import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router-dom/server";

import routes from "./routes"

export async function render(req, rep) {
  const { query, dataRoutes } = createStaticHandler(routes);
  const remixRequest = createFetchRequest(req, rep);
  const context = await query(remixRequest);

  // Handle context as a response if needed
  if (context instanceof Response) {
    return context;
  }

  const router = createStaticRouter(dataRoutes, context);

  const appHtml = renderToString(
    <React.StrictMode>
      <StaticRouterProvider
        router={router}
        context={context}
        nonce="the-nonce"
      />
    </React.StrictMode>
  );
  
  return {
    html: appHtml,
    context,
  }
}

export function createFetchRequest(req, rep) {
  const origin = `${req.protocol}://${req.hostname}`;
  const url = new URL(req.url, origin);

  const controller = new AbortController();
  rep.raw.on("close", () => controller.abort());

  const headers = new Headers();

  // Convert Fastify headers to Fetch-compatible Headers
  for (const [key, value] of Object.entries(req.headers)) {
    if (value) {
      if (Array.isArray(value)) {
        for (const v of value) {
          headers.append(key, v);
        }
      } else {
        headers.set(key, value);
      }
    }
  }

  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD" && req.body) {
    init.body = req.body;
  }

  return new Request(url.href, init);
}