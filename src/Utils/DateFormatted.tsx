export const FormatDate = (dateInput: any | Date): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return ""; 

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short", 
    day: "numeric",
  });
};

export const FormatTime = (dateInput: any | Date): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
  });
};


export const FormatDateTime = (dateInput: any | Date): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate}, ${formattedTime}`;
};