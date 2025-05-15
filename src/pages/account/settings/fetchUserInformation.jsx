import axios from "axios";

export async function fetchUserInformation(url, token, setBio, setLoading) {
  try {
    const request = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (request.status != 200) {
      return console.log("Failed to get user information");
    }
    const { first_name, last_name, level_of_education, about, profile_pic } =
      request.data.data;
    setBio({
      firstname: first_name,
      lastname: last_name,
      level_of_education: level_of_education,
      about: about,
      profile_pic: profile_pic,
    });
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}
