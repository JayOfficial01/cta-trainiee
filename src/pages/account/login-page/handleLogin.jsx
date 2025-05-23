// awan48510@yopmail.com
// bilal456
import axios from "axios";

export async function handleLogin(bio) {
  const { email, password, check } = bio;
  if (!email || !password)
    return { response: { data: { message: "Enter Email or Password" } } };
  if (!email.includes("@") || !email.includes(".com"))
    return { response: { data: { message: "Invalid Email" } } };
  if (!/^[0-9A-Za-z]*$/.test(password))
    return { response: { data: { message: "Invalid Email or Password" } } };
  const url = "https://auth.cta.uat.api.codibot.ai/api/v1.5.0/auth/login";

  try {
    const request = await axios.post(
      url,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = request.data.data;
    const storage = check ? localStorage : sessionStorage;

    storage.setItem("id", data.id);
    storage.setItem("name", data.name);
    storage.setItem("email", data.email);
    storage.setItem("token", data.access_token);

    return true;
  } catch (err) {
    return err;
  }
}
