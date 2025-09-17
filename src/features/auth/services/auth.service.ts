import $api from "@/shared/api";

class AuthService {
  public async auth() {
    try {
      const response = await $api.post("/auth");

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
