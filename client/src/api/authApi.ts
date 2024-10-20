import baseApiRequest from "./baseApiRequest"

const authApi = {
  login(body: unknown) {
    const url = "login"
    return baseApiRequest.post(url, body)
  },

  logout() {
    const url = "logout"
    return baseApiRequest.get(url)
  },
}

export default authApi
