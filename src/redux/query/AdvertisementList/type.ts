export interface IAdvertisementListResponse {
  message: string;
  status: boolean;
  error: Error;
  data: AdvertisementData;
}
export interface Error {}

export interface AdvertisementData {
  current_page: number;
  list?: AdvertisementListData[];
  next_page_url: string;
  prev_page_url: string;
}
export interface AdvertisementListData {
  id: number;
  name: string;
  description: string;
  image: string;
}
