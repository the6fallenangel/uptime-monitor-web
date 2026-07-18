import { MonitorsDetail } from "@/app/(dashboard)/monitors/monitors-detail";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monitors",
};

export default function MonitorsPage() {
  return <MonitorsDetail />;
}
