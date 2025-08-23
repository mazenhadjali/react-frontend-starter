import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { queryClient } from "./api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";




const router = createBrowserRouter(AppRoutes);


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;