import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
	QueryClientProvider,
	QueryClient,
	HydrationBoundary,
} from "@tanstack/react-query";

import routes from "./routes";

const queryClient = new QueryClient();
/**
 * The dehydrated state of the React Query cache, which is typically used for server-side rendering (SSR).
 * This state is rehydrated on the client side to avoid refetching data that was already fetched on the server.
 *
 * @type {object}
 */
const dehydratedState = window.__REACT_QUERY_DEHYDRATED_STATE__;

const router = createBrowserRouter(routes);

const root = document.getElementById("root");

hydrateRoot(
	root,
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<HydrationBoundary state={dehydratedState}>
				<RouterProvider router={router} />
			</HydrationBoundary>
		</QueryClientProvider>
	</StrictMode>,
);
