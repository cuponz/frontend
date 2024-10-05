import { useState } from "react";
import { format } from "date-fns";

import PopupCreateCoupon from "@/components/PopupCreateCoupon";
// import { getCouponsByShopIdFromShop } from "@/api/coupon";
import { getCouponsByShopIdFromShop, editCoupon, pauseCoupon, deleteCoupon } from "@/api/coupon";
import { useMutation, useQuery } from "@tanstack/react-query";
import DataTable from "@/components/Wrapper/DataTable";
import { CouponState } from "@/constants";

import Button from "@/components/Utils/Button";

const ShopCouponTable = () => {
  const [isCreateCouponOpen, setIsCreateCouponOpen] = useState(false);

  const {
    isLoading,
    error,
    data: coupons = [],
  } = useQuery({
    queryKey: ["get", "coupons", "shop"],
    queryFn: getCouponsByShopIdFromShop,
    retry: false,
  });

  // Mutations
  const editMutation = useMutation({
    queryKey: ["edit", "coupons", "shop"],
    mutationFn: ({ couponId, data }) => editCoupon(couponId, data),
    onSuccess: () => {
      toast.success("Coupon edited successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update coupon");
    },
  });

  const pauseMutation = useMutation({
    queryKey: ["edit", "coupons", "shop"],
    mutationFn: pauseCoupon,
    onSuccess: () => {
      toast.success("Coupon paused successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to pause coupon");
    },
  });

  const deleteMutation = useMutation({
    // mutationFn: deleteCoupon,
    mutationFn: () => {},
    onSuccess: () => {
      toast.success("Coupon deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete coupon");
    },
  });

  // Action handlers
  const handleEdit = (couponId) => {
    editMutation.mutate(couponId);
  };

  const handlePause = (couponId) => {
    pauseMutation.mutate(couponId);
  };

  const handleDelete = (couponId) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      deleteMutation.mutate(couponId);
    }
  };

  // Table columns configuration
  // TODO: considering about using 
  const columns = [
    {
      header: "ID",
      accessor: "id",
    },
    {
      header: "Code",
      accessor: "code",
    },
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Category",
      accessor: "category",
    },
    {
      header: "Start Date",
      accessor: "start_date",
      cell: (value) => format(new Date(value), "dd/MM/yyyy"),
    },
    {
      header: "End Date",
      accessor: "end_date",
      cell: (value) => format(new Date(value), "dd/MM/yyyy"),
    },
    {
      header: "Usage",
      accessor: "usage_count",
      cell: (value, row) => `${value}/${row.max_usage || "∞"}`,
    },
    {
      header: "State",
      accessor: "state",
      cell: (value) => Object.keys(CouponState)[value],
    },
    {
      header: "Actions",
      accessor: "actions",
      cell: (_, row) => {
        return (
          <div className="flex justify-center space-x-2">
            <Button
              onClick={() => handleEdit(row.id)}
              colour="yellow-500"
              disabled={editMutation.isLoading}
            >
              Edit
            </Button>
            <Button
              onClick={() => handlePause(row.id)}
              colour="blue-500"
              disabled={
                row["state"] === CouponState.Pending || pauseMutation.isLoading
              }
            >
              Pause
            </Button>
            <Button
              onClick={() => handleDelete(row.id)}
              colour="red-500"
              disabled={deleteMutation.isLoading}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const additionalFilters = [
    {
      name: "category",
      type: "select",
      placeholder: "Filter by Category",
      options: [...new Set(coupons.map((coupon) => coupon.category))],
    },
    {
      name: "start_date",
      type: "date",
      placeholder: "Start Date",
    },
    {
      name: "end_date",
      type: "date",
      placeholder: "End Date",
    },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    throw error;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shop Coupons</h1>
        <Button onClick={() => setIsCreateCouponOpen(true)} colour="yellow-500">
          Create Coupon
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={coupons}
        filename="shop_coupons.csv"
        additionalFilters={additionalFilters}
      />

      {isCreateCouponOpen && (
        <PopupCreateCoupon
          isOpen={isCreateCouponOpen}
          onClose={handleCloseCreateCoupon}
          onSubmit={handleSubmitCreateCoupon}
        />
      )}
    </div>
  );
};

export default ShopCouponTable