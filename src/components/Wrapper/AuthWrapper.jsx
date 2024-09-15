import { useQuery } from "@tanstack/react-query";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

import { useUserStore } from "../../store/user";
import { userAuth } from "../../api/user";

import Layout from "../../layout/layout";
import { useEffect } from "react";

const LoadingSpinner = () => <div>Loading...</div>;

const AuthWrapper = ({ isProtected }) => {
  const [user, setUser] = useUserStore((state) => [state.user, state.setUser, state.logout]);
  const navigate = useNavigate();

  const { isPending, isError, isFetched, data, error } = useQuery({
		queryKey: ["auth"],
		queryFn: userAuth,
		retry: false,
		enabled: !user,
  });

	if (isProtected && isFetched && !data) {
		setUser(undefined)
		navigate("/login");
	}

	useEffect(() => {
		if (data) {
			toast.success("Logged in");
			setUser(data.user)
		}
		if (isError) {
			toast.error(error?.message || "Authentication error");
			setUser(undefined)
			if (isProtected) {
				navigate("/login");
			}
		}
	}, [data, error])

  if (isPending) {
		return <Layout><LoadingSpinner /></Layout>
  }

	return (
		<Layout>
			<Outlet />
		</Layout>
	)
};

export default AuthWrapper;
