import { API } from "../../../core/constants/API.constants"

class ApiClient {
  async get<T>(
    endpoint: string,
    params: Record<string, string | number> = {},
  ): Promise<T> {
    const url = new URL(`${API.BASE_URL}${endpoint}`)

    url.searchParams.set("api_key", API.API_KEY)

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, String(value))
    })

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `Request failed (${response.status}): ${response.statusText}`,
      )
    }

    return response.json() as Promise<T>
  }
}

export const apiClient = new ApiClient()