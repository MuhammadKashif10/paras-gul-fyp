export type EventType = "Mehndi" | "Baraat" | "Walima";
export type HairLength = "Short" | "Medium" | "Long";
export type BookingStatus = "Pending" | "Approved" | "Rejected";

export interface RecommendationRequest {
  name: string;
  eventType: EventType;
  hairLength: HairLength;
  image: string;
}

export interface HairstyleMatch {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
  matchScore: number;
}

export interface RecommendationResponse {
  customer: RecommendationRequest;
  recommendedHairstyle: HairstyleMatch;
  alternatives: HairstyleMatch[];
  explanation: string;
}

export interface BookingRecord {
  _id: string;
  name: string;
  eventType: EventType;
  hairLength: HairLength;
  image: string;
  recommendedHairstyle: {
    hairstyleId: string;
    name: string;
    description: string;
    image: string;
    matchScore: number;
    tags: string[];
  };
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
}
