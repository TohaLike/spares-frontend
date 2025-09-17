import $api from "@/shared/api";

class AuthService {
  public async auth() {
    try {
      const response = await $api.post("/auth");
      
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const authService = new AuthService();
