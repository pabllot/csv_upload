import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "../App";

test("Renders the main page", () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  expect(true).toBeTruthy();
});
