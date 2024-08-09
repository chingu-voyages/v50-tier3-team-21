const API_BASE_URL = "http://localhost:3000/api";

interface UserProfile {
    firstName?: string,
    lastName?: string,
    contact?: string,
    password?: string,
}
// set up header or each fetch request
const headers = new Headers();
headers.append("Content-Type", "application/json");


// function to make api calls, requires correct url and options for each request
async function fetchJson(url: URL, options: RequestInit = {}, onCancel) {
  try {
    const response = await fetch(url, options);
    // if something was deleted, return nothing
    if (response.status === 204) return null;

    const data = await response.json();
    if (data.error) {
      return Promise.reject({ message: data.error });
    }
    return data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

// edit profile api request
export const editProfile = async (data: UserProfile, signal) => {
    const url = new URL(`${API_BASE_URL}/profile/`);
    const options = {
      method: "PUT",
      headers,
      body: JSON.stringify({ data }),
    };
    return await fetchJson(url, options);
  };
  
