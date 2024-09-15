export default async function() {
	const base = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";
  const res = await fetch(`${base}/api/group`, {
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
    throw new Error("Getting Groups Failed");
  }

	return data;
}