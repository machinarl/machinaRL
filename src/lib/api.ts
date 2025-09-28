import { LeaderboardResponse, APIResponse } from '@/data/types';

// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// Generic API fetch wrapper with error handling
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  try {
    const url = `${API_BASE_URL}/api${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data };

  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    
    return {
      error: {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        code: 'API_REQUEST_FAILED',
        status: 500
      }
    };
  }
}

// Leaderboard API functions
export async function fetchLeaderboard(params?: {
  model?: string;
  course?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}): Promise<APIResponse<LeaderboardResponse>> {
  const searchParams = new URLSearchParams();
  
  if (params?.model) searchParams.append('model', params.model);
  if (params?.course) searchParams.append('course', params.course);
  if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);
  if (params?.limit) searchParams.append('limit', params.limit.toString());
  if (params?.offset) searchParams.append('offset', params.offset.toString());

  const queryString = searchParams.toString();
  const endpoint = `/leaderboard${queryString ? `?${queryString}` : ''}`;
  
  return apiRequest<LeaderboardResponse>(endpoint);
}

// Health check function
export async function pingAPI(): Promise<APIResponse<{
  status: string;
  timestamp: string;
  version: string;
  uptime: number;
  environment: string;
  services: Record<string, string>;
}>> {
  return apiRequest('/ping');
}

// Client-side data fetching hooks
export function useLeaderboard(params?: Parameters<typeof fetchLeaderboard>[0]) {
  // This would typically use SWR or React Query in a real app
  // For now, we'll provide a simple implementation
  return {
    data: null,
    error: null,
    isLoading: false,
    mutate: () => fetchLeaderboard(params)
  };
}

// Local data access functions (for when we need immediate access)
export async function getLocalLeaderboardData() {
  try {
    const leaderboardData = await import('@/data/leaderboard.json');
    return {
      data: {
        entries: leaderboardData.entries,
        total: leaderboardData.total
      }
    };
  } catch (error) {
    console.error('Failed to load local leaderboard data:', error);
    return {
      error: {
        message: 'Failed to load local leaderboard data',
        code: 'LOCAL_DATA_ERROR',
        status: 500
      }
    };
  }
}

// Data transformation utilities
export function transformLeaderboardData(data: LeaderboardResponse) {
  return {
    ...data,
    entries: data.entries.map(entry => ({
      ...entry,
      formattedTime: formatTime(entry.bestTime),
      formattedDate: formatDate(entry.date),
      abilitiesCount: entry.abilitiesUnlocked.length
    }))
  };
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = (seconds % 60).toFixed(1);
  return `${minutes}:${remainingSeconds.padStart(4, '0')}`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}