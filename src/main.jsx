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
