import { AlertTriangle, Check, Clock } from "lucide-react";

export const statusConfig = {
  taken: {
    label: "Taken",
    icon: Check,
    className: "bg-green-100 text-green-700 border-green-200",
  },
  upcoming: {
    label: "Upcoming",
    icon: Clock,
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  missed: {
    label: "Missed",
    icon: AlertTriangle,
    className: "bg-red-100 text-red-700 border-red-200",
  },
};