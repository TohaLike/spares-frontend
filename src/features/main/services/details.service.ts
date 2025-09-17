import $api from "@/shared/api";

class DetailsService {
  public async getDetails(code: string) {
    try {
      const response = await $api.get(`/search/${code}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const detailsService = new DetailsService();
