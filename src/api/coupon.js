async function getCoupons() {
	const base = process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""
  const res = await fetch(`${base}/api/coupon`, {
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
    throw new Error("Getting Coupon Failed");
  }

	return data;
}

async function postCoupon(couponData) {
	const base = process.env.NODE_ENV == "development" ? "http://localhost:3000" : ""

  const res = await fetch(`${base}/api/coupoon`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(couponData),
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
    throw new Error("Creating coupon Failed");
  }

  return data;
}

export {
	getCoupons,
	postCoupon,
}
