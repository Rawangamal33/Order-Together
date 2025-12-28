export interface Restaurant {
  id: string;
  name: string;
  shortCode: string;
  shortCode: string;
  logoUrl: string | null;
  isVisible: boolean;
  menuItemCount: number;
  createdAt: string;
}

export interface RestaurantRequest {
  name: string;
  logoUrl?: string;
  isVisible: boolean;
}

export interface GetRestaurantByShortCodeResponse {
  id: string;
  logoUrl: string | null;
  shortCode: string;
  name: string;
  menuItems: any;
}

export interface UpdateRestaurantRequest extends RestaurantRequest {
  id: string;
}

export interface UpdateRestaurantResponse {
  id: string;
  name: string;
  shortCode: string | null;
  isVisible: boolean;
}

export interface UpdateRestVisibility {
  id: string;
  isVisible: boolean;
}
