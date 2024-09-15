async function getCategories() {
	const base = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
  const res = await fetch(`${base}/api/category`, {
		credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
	});

  let data;
  try {
    data = await res.json();
  } catch(e) {
    data = undefined;
  }

  if (!res.ok) {
    if (data) {
      throw new Error(data.msg);
    } 
    throw new Error("Getting Categories Failed");
  }

	return data;
}

async function postCategory(categoryata) {
	const base = process.env.NODE_ENV == "development" ? "http://localhost:3000" : ""

  const res = await fetch(`${base}/api/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryata),
		credentials: process.env.NODE_ENV === "development" ? "include" : "same-origin",
  });

  let data;
  try {
    data = await res.json();
  } catch(e) {
    data = undefined;
  }

  if (!res.ok) {
    if (data) {
      throw new Error(data.msg);
    } 
    throw new Error("Creating Category Failed");
  }

  return data;
}

export {
	getCategories,
	postCategory,
}
