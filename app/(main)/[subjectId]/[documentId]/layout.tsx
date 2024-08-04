import { AIProvider } from "@/utils/client";
import { EndpointsContext } from "./agent";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AIProvider actions={EndpointsContext}>
      {children}
    </AIProvider>
  );
}