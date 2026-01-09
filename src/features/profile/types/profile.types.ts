export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  role: string[];
}

export interface GetProfileResponse {
  user: User;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

export interface UpdateProfileResponse extends GetProfileResponse {}
