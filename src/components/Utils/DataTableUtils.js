export const dataTableCompareValues = (a, b, type) => {
  if (a === b) {
    return 0;
  }
  if (a === null || a === undefined) {
    return 1;
  }
  if (b === null || b === undefined) {
    return -1;
  }

  switch (type) {
    case "date":
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    case "number":
      return Number(a) - Number(b);
    case "string":
    default:
      return String(a).localeCompare(String(b));
  }
};

export const downloadCSV = (columns, data, filename) => {
  const headers = columns.map((col) => col.header);
  const rows = data.map((row) =>
    columns.map((col) => `"${String(row[col.accessor]).replace(/"/g, '""')}"`)
  );
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const filterMatchCheck = (item, filters) => {
  return Object.entries(filters).every(([key, value]) => {
    if (!value) {
      return true;
    }

    const filter = additionalFilters.find((f) => f.name === key);
    const itemValue = item[key];

    if (filter?.type === "date") {
      const filterDate = new Date(value);
      const itemDate = new Date(itemValue);

      if (key.includes("start")) {
        return itemDate >= filterDate;
      }
      if (key.includes("end")) {
        return itemDate <= filterDate;
      }
    }

    return itemValue?.toString().toLowerCase().includes(value.toLowerCase());
  });
};
