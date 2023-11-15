export interface IProfileResponse {
  message: string;
  status: boolean;
  error: Error;
  data: ProfileData;
}
export interface Error {}
export interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  country_code: string;
  gender: number;
  profile_image: string;
}

export interface IUploadedPic {
  name: string;
  type: string;
  uri: string;
}
