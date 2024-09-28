import { RedemptionState } from "../constants";

async function getRedemptionsByCouponId(couponId) {
	const base = process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""
  const res = await fetch(`${base}/api/redemption/coupon/${couponId}`, {
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
      throw new Error(data.msg || data.error);
    } 
    throw new Error("Getting Redemptions Failed");
  }

	return data;
}

async function getRedemptionsByUserId() {
	const base = process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""
  const res = await fetch(`${base}/api/redemption/user`, {
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
      throw new Error(data.msg || data.error);
    } 
    throw new Error("Getting Redemptions Failed");
  }

	return data;
}

async function getRedemptionsById(redemptionId) {
	const base = process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""
  const res = await fetch(`${base}/api/redemption/${redemptionId}`, {
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
      throw new Error(data.msg || data.error);
    } 
    throw new Error("Getting Redemption Failed");
  }

	return data;
}

async function usingRedemptionById(redemptionId) {
	const base = process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""
  const res = await fetch(`${base}/api/redemption/${redemptionId}/state`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ state: RedemptionState.Used }),
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
      throw new Error(data.msg || data.error);
    } 
    throw new Error("Upading Redemption Failed");
  }

	return data;
}

export {
	getRedemptionsByCouponId,
	getRedemptionsByUserId,
	getRedemptionsById,
	usingRedemptionById,
}
