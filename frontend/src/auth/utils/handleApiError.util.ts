export const handleApiError = (error: any) => {
  const msg = error?.response?.data?.message;

  if (Array.isArray(msg)) {
    return msg.join("\n");
  }

  if (typeof msg === "string") {
    return msg;
  }

  return error?.message || "Unexpected error";
};