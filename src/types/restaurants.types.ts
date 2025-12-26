export interface Restaurant {
  id: string;
  name: string;
  shortCode?: string;
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
