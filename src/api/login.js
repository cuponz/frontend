export default async function(loginData) {
	const base = process.env.NODE_ENV == "development" ? "http://localhost:3000" : ""

  const res = await fetch(`${base}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
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
    throw new Error("Login failed");
  }

  return data;
}