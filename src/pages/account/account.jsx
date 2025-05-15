import AccountLeft from "./account-left";
import ForgotPassword from "./forgot-password/forgot-password";
import LoginForm from "./login-page/login-form";
import Otp from "./otp/Otp";

export default function Account() {
  return (
    <section className="flex sm:space-x-4 h-dvh max-lg:justify-center font-Plus-Jakarta-Sans">
      <AccountLeft />
      {window.location.pathname === "/login" && <LoginForm />}
      {window.location.pathname === "/forgot-password" && <ForgotPassword />}
      {window.location.pathname === "/otp" && <Otp />}
    </section>
  );
}
