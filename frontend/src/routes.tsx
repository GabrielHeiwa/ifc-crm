import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import App from "./App";
import { Products } from "./pages/Products/Products";
import { Negotiations } from "./pages/Negotiations/Negotiations";
import { Users } from "./pages/Users/Users";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient()

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/negotiations',
                element: <Negotiations />
            },
            {
                path: '/users',
                element: <Users />
            }
        ]
    }
]);

export function Routes() {
    return <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
}
