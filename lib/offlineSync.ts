/**
 * Offline Sync Queue helper for high-altitude mountain terrain drops
 */

export interface OfflineScanItem {
  id: string;
  cropName: string;
  imageBase64: string;
  mimeType: string;
  latitude?: number;
  longitude?: number;
  altitudeMeters?: number;
  timestamp: number;
}

export interface OfflineQueryItem {
  id: string;
  userQuery: string;
  language: string;
  timestamp: number;
}

const SCANS_KEY = "agriassist_offline_scans";
const QUERIES_KEY = "agriassist_offline_queries";

export function saveOfflineScan(item: Omit<OfflineScanItem, "id" | "timestamp">): OfflineScanItem {
  if (typeof window === "undefined") return { ...item, id: "", timestamp: Date.now() };
  const existing = getOfflineScans();
  const newItem: OfflineScanItem = {
    ...item,
    id: `scan_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    timestamp: Date.now(),
  };
  existing.push(newItem);
  localStorage.setItem(SCANS_KEY, JSON.stringify(existing));
  return newItem;
}

export function getOfflineScans(): OfflineScanItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SCANS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearOfflineScans() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SCANS_KEY);
  }
}

export function saveOfflineQuery(item: Omit<OfflineQueryItem, "id" | "timestamp">): OfflineQueryItem {
  if (typeof window === "undefined") return { ...item, id: "", timestamp: Date.now() };
  const existing = getOfflineQueries();
  const newItem: OfflineQueryItem = {
    ...item,
    id: `query_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
    timestamp: Date.now(),
  };
  existing.push(newItem);
  localStorage.setItem(QUERIES_KEY, JSON.stringify(existing));
  return newItem;
}

export function getOfflineQueries(): OfflineQueryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(QUERIES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearOfflineQueries() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(QUERIES_KEY);
  }
}

/**
 * Auto-sync all queued offline scans and queries to the server.
 * Call this when network connectivity is restored.
 * Returns the number of successfully synced items.
 */
export async function syncOfflineQueue(): Promise<{
  syncedScans: number;
  syncedQueries: number;
  error?: string;
}> {
  const scans = getOfflineScans();
  const queries = getOfflineQueries();

  if (scans.length === 0 && queries.length === 0) {
    return { syncedScans: 0, syncedQueries: 0 };
  }

  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scans, queries }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return {
        syncedScans: 0,
        syncedQueries: 0,
        error: data.error || "Sync failed",
      };
    }

    const data = await res.json();

    // Clear queues on successful sync
    if (data.success) {
      clearOfflineScans();
      clearOfflineQueries();
    }

    return {
      syncedScans: scans.length,
      syncedQueries: queries.length,
    };
  } catch (err) {
    return {
      syncedScans: 0,
      syncedQueries: 0,
      error: "Network error during sync",
    };
  }
}

/**
 * Register the auto-sync listener on the `online` event.
 * Returns a cleanup function for useEffect teardown.
 */
export function registerAutoSync(
  onSyncComplete?: (result: { syncedScans: number; syncedQueries: number }) => void,
  onSyncError?: (error: string) => void
): () => void {
  if (typeof window === "undefined") return () => {};

  const handleOnline = async () => {
    const result = await syncOfflineQueue();
    if (result.error) {
      onSyncError?.(result.error);
    } else if (result.syncedScans > 0 || result.syncedQueries > 0) {
      onSyncComplete?.(result);
    }
  };

  window.addEventListener("online", handleOnline);
  return () => window.removeEventListener("online", handleOnline);
}
