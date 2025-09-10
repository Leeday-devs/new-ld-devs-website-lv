import { useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const cache = new Map<string, CacheEntry<any>>();

export const useApiOptimization = () => {
  const requestsInFlight = useRef(new Map<string, Promise<any>>());

  const getCachedData = useCallback(function<T>(key: string): T | null {
    const entry = cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      cache.delete(key);
      return null;
    }

    return entry.data;
  }, []);

  const setCachedData = useCallback(function<T>(key: string, data: T, ttl = 300000): void {
    cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }, []);

  const dedupedRequest = useCallback(async function<T>(
    key: string,
    requestFn: () => Promise<T>,
    ttl = 300000
  ): Promise<T> {
    // Check cache first
    const cached = getCachedData<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Check if request is already in flight
    const existingRequest = requestsInFlight.current.get(key);
    if (existingRequest) {
      return existingRequest;
    }

    // Make new request
    const request = requestFn().then(data => {
      setCachedData(key, data, ttl);
      requestsInFlight.current.delete(key);
      return data;
    }).catch(error => {
      requestsInFlight.current.delete(key);
      throw error;
    });

    requestsInFlight.current.set(key, request);
    return request;
  }, [getCachedData, setCachedData]);

  const clearCache = useCallback((keyPattern?: string) => {
    if (!keyPattern) {
      cache.clear();
      return;
    }

    for (const key of cache.keys()) {
      if (key.includes(keyPattern)) {
        cache.delete(key);
      }
    }
  }, []);

  return {
    dedupedRequest,
    getCachedData,
    setCachedData,
    clearCache
  };
};

export default useApiOptimization;