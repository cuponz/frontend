import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import {
	createStaticHandler,
	createStaticRouter,
	StaticRouterProvider,
} from "react-router-dom/server";
import {
	HydrationBoundary,
	dehydrate,
	QueryClientProvider,
	QueryClient,
} from "@tanstack/react-query";
import routes from "./routes";

import { getCategories } from "@/api/category";
import { getGroups } from "@/api/group";

/**
 * Renders the server-side application.
 *
 * This function handles the server-side rendering of the application, including
 * creating the necessary handlers, prefetching data, and generating the HTML
 * for the initial page load.
 *
 * @param {Object} req - The request object.
 * @param {Object} rep - The response object.
 * @returns {Promise<Object>} The rendered HTML, context, and dehydrated state.
 */
export async function render(req, rep) {
	const { query, dataRoutes } = createStaticHandler(routes);
	const queryClient = new QueryClient();
	const remixRequest = createFetchRequest(req, rep);
	const context = await query(remixRequest);

	// Handle context as a response if needed
	if (context instanceof Response) {
		return context;
	}

	const router = createStaticRouter(dataRoutes, context);

	// Prefetch your react-query data here, e.g., for categories and groups
	await Promise.all([
		queryClient.prefetchQuery({
			queryKey: ["categories"],
			queryFn: getCategories,
		}),
		queryClient.prefetchQuery({
			queryKey: ["groups"],
			queryFn: getGroups,
		}),
	]);

	const dehydratedState = dehydrate(queryClient);
	console.log(JSON.stringify(dehydratedState, null, 2));

	const appHtml = renderToString(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<HydrationBoundary state={dehydratedState}>
					<StaticRouterProvider
						router={router}
						context={context}
						nonce="the-nonce"
					/>
				</HydrationBoundary>
			</QueryClientProvider>
		</StrictMode>,
	);

	return {
		html: appHtml,
		context,
		dehydratedState,
	};
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
