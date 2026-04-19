import type { RecommendationRequest, RecommendationResponse } from "@/types/bridal";

const REQUEST_KEY = "bridalRecommendationRequest";
const RESULT_KEY = "bridalRecommendationResult";

export function saveRecommendationRequest(payload: RecommendationRequest) {
  sessionStorage.setItem(REQUEST_KEY, JSON.stringify(payload));
}

export function getRecommendationRequest(): RecommendationRequest | null {
  const raw = sessionStorage.getItem(REQUEST_KEY);
  return raw ? (JSON.parse(raw) as RecommendationRequest) : null;
}

export function clearRecommendationRequest() {
  sessionStorage.removeItem(REQUEST_KEY);
}

export function saveRecommendationResult(payload: RecommendationResponse) {
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(payload));
}

export function getRecommendationResult(): RecommendationResponse | null {
  const raw = sessionStorage.getItem(RESULT_KEY);
  return raw ? (JSON.parse(raw) as RecommendationResponse) : null;
}

export function clearRecommendationResult() {
  sessionStorage.removeItem(RESULT_KEY);
}
