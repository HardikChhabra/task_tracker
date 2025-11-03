/**
 * apiHelpers
 *
 * Small centralized wrapper around fetch to standardize how API requests are
 * performed across the app (headers, JSON handling and basic error handling).
 */
const apiHelpers = {
  /**
   * Perform a GET request.
   *
   * @param {string} url - endpoint URL
   * @param {string} token - optional auth token to include in Authorization header
   * @returns {Promise<any>} parsed JSON response
   * @throws {Error} when response.ok is false
   */
  get: async (url, token) => {
    // include Authorization header when token provided
    const res = await fetch(url, {
      headers: { Authorization: token },
    });

    // throw on non-2xx responses so callers can handle failures
    if (!res.ok) throw new Error("Request failed");

    // parse and return JSON body
    return res.json();
  },

  /**
   * Perform a POST request with JSON body.
   *
   * @param {string} url - endpoint URL
   * @param {Object} data - payload to send as JSON
   * @param {string|null} [token=null] - optional auth token
   * @returns {Promise<any>} parsed JSON response
   * @throws {Error} when response.ok is false
   */
  post: async (url, data, token = null) => {
    // prepare JSON content-type header and include Authorization when token exists
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = token;

    // debug log for development to trace outgoing payloads
    console.log("POST Request to:", url, "with data:", JSON.stringify(data));

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    // throw on HTTP error status
    if (!res.ok) throw new Error("Request failed");

    // parse and return JSON response
    return res.json();
  },

  /**
   * Perform a PUT request with JSON body.
   *
   * @param {string} url - endpoint URL
   * @param {Object} data - payload to send as JSON
   * @param {string} token - auth token (required for PUTs in this app)
   * @returns {Promise<any>} parsed JSON response
   * @throws {Error} when response.ok is false
   */
  put: async (url, data, token) => {
    // send JSON body and Authorization header
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    });

    // normalize error handling for callers
    if (!res.ok) throw new Error("Request failed");

    // parse and return JSON response
    return res.json();
  },

  /**
   * Perform a DELETE request.
   *
   * @param {string} url - endpoint URL
   * @param {string} token - auth token
   * @returns {Promise<any|void>} parsed JSON response or void for 204 No Content
   * @throws {Error} when response.ok is false
   */
  delete: async (url, token) => {
    // debug log for deletion requests
    console.log("DELETE Request to:", url);

    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `${token}` },
    });

    // throw on HTTP error status
    if (!res.ok) throw new Error("Request failed");

    // if server returned 204 No Content, return nothing
    if (res.status === 204) return;

    // otherwise parse and return JSON body
    return res.json();
  },
};

export { apiHelpers };
