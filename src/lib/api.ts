import type {
  BookingRecord,
  BookingStatus,
  RecommendationRequest,
  RecommendationResponse,
} from "@/types/bridal";
import { getAdminToken, type AdminSession } from "@/lib/admin-auth";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const adminToken = getAdminToken();
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {}),
      ...(options?.headers ?? {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    throw new Error(errorPayload?.message ?? "Request failed.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getRecommendation(payload: RecommendationRequest) {
  return request<RecommendationResponse>("/api/recommendations", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminLogin(email: string, password: string) {
  return request<AdminSession>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function createBooking(payload: RecommendationResponse) {
  return request<BookingRecord>("/api/bookings", {
    method: "POST",
    body: JSON.stringify({
      ...payload.customer,
      recommendedHairstyle: payload.recommendedHairstyle,
    }),
  });
}

export function getBookings() {
  return request<BookingRecord[]>("/api/bookings");
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  return request<BookingRecord>(`/api/bookings/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteBooking(id: string) {
  return request<void>(`/api/bookings/${id}`, {
    method: "DELETE",
  });
}
