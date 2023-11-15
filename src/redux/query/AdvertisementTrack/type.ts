export interface IAdvertisementTrackBody {
  advertisement_id: number;
  json: string;
}

export interface IAdvertisementTrack {
  latitude: number;
  longitude: number;
  timestamp?: number;
}
export interface IAdvertisementTrackResponse {
  message: string;
  status: boolean;
  error: ErrorOrData;
  data: {};
}

export interface IPaginationData {
  prevUrl: string;
  nextUrl: string;
}

export interface ErrorOrData {}
