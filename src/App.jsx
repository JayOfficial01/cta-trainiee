import { Routes, Route, Outlet, Navigate } from "react-router";
import Account from "./pages/account/account";
import OpeningForm from "./pages/opening-form/openingform";
import Landing from "./pages/landing/landing";
import Header from "./pages/landing/header";
import AccountSetting from "./pages/account/settings/account-settings";
import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./pages/redux/user-slice";
import { setSign } from "./pages/redux/log-indicator";
import Loader from "./pages/loader/Loader";
import Coursedescription from "./pages/course-description/course-description";
import Slides from "./pages/slides/slides";
import Assessment from "./pages/assessment/assessment";
import SuccessScore from "./pages/success-score/success-score";
import ErrorPage from "./pages/404/ErrorPage";
import UserMetaAPI from "./pages/before-api/usermetaapi";

function App() {
  const hasLogged = useSelector((state) => state.signed);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const name = localStorage.getItem("name") || sessionStorage.getItem("name");
    const email =
      localStorage.getItem("email") || sessionStorage.getItem("email");
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (id && name && email && token) {
      dispatch(setUser({ id: id, name: name, email: email, token: token }));
      if (hasLogged.value) return;
      dispatch(setSign());
    }
  }, [hasLogged]);

  return (
    <main className="font-plus-jakarta-sans">
      <Routes>
        {/* Public Route in case the user hasn't logged in */}
        <Route path="/login" element={<Account />} />
        <Route path="/forgot-password" element={<Account />} />
        <Route path="/otp" element={<Account />} />
        <Route path="*" element={<ErrorPage />} />

        {/* Private Routes only access when user logged in */}
        <Route element={<Logged />}>
          <Route path="/openingform" element={<OpeningForm />} />
          <Route element={<UserMetaAPI />}>
            <Route
              element={
                <>
                  <Header currUser={user} />
                  <Outlet />
                </>
              }
            >
              <Route path="/" element={<Landing currUser={user} />} />
              <Route
                path="/account-setting"
                element={<AccountSetting currUser={user} />}
              />
              <Route
                path="/coursedescription"
                element={<Coursedescription currUser={user} />}
              />
              <Route path="/slides" element={<Slides currUser={user} />} />
              <Route
                path="/assessment"
                element={<Assessment currUser={user} />}
              />
              <Route path="/successscore" element={<SuccessScore />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        duration={2000}
        closeButton={true}
        theme="light"
        visibleToasts="1"
        richColors={true}
      />
    </main>
  );
}

export default App;

function Logged() {
  const user = useSelector((state) => state.user);
  const loading = !user.token;
  if (localStorage.getItem("id") || sessionStorage.getItem("id")) {
    if (loading) {
      return <Loader />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}
