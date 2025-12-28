export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isVisible: boolean;
  createdAt: string;
}

export interface GetMenuItemsResponse {
  id: string;
  name: string;
  shortCode: string;
  logoUrl: string | null;
  menuItems: MenuItem[];
}

export interface Data {
  name: string;
  description?: string;
  price: number;
  isVisible: boolean;
}

export interface PostMenuItemRequest {
  id: string;
  data: Data;
}
