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

export interface PostMenuItemRequest {
  id: string;
  name: string;
  description?: string;
  price: number;
  isVisible: boolean;
}

export interface GetMenuDetailsByIdResponse {
  menuItemId: string;
  name: string;
  price: number;
  description: string;
  isVisible: boolean;
}

export interface UpdateMenuItemRequest {
  id: string;
  name: string;
  description?: string;
  price: number;
  isVisible: boolean;
}

export interface UpdateMenuItemResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  isVisible: boolean;
  createdAt: string;
}

export interface updateMenuItemVisibilityRequest {
  id: string;
  isVisible: boolean;
}
