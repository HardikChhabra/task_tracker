const apiHelpers = {
  get: async (url, token) => {
    const res = await fetch(url, {
      headers: { Authorization: token },
    });
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  },
  post: async (url, data, token = null) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = token;
    console.log("POST Request to:", url, "with data:", JSON.stringify(data));
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  },
  put: async (url, data, token) => {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  },
  delete: async (url, token) => {
    console.log("DELETE Request to:", url);
    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `${token}` },
    });
    if (!res.ok) throw new Error("Request failed");
    if (res.status === 204) return;
    return res.json();
  },
};

export { apiHelpers };
