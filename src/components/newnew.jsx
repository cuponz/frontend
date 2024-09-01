import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

const ShopCouponTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [coupons, setCoupons] = useState([]);
  const location = useLocation();
};
export default ShopCouponTable;
