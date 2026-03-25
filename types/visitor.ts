// 방문자 추적 관련 타입 정의

export interface VisitorData {
  id: string;
  created_at: string;
  ip_address: string | null;
  carrier: string | null;
  session_count: number;
  page_url: string | null;
  traffic_source: string | null;
  referrer: string | null;
  search_keyword: string | null;
  search_engine: string | null;
  device_type: string | null;
  browser: string | null;
  os: string | null;
  device_model: string | null;
  counsel_type_id: number | null;
  phone: string | null;
  name: string | null;
  counsel_type?: { name: string };
}

export interface StatsData {
  dateRange: { startDate: string; endDate: string };
  totalVisitors: number;
  uniqueVisitors: number;
  dailyVisitors: Record<string, number>;
  counselTypeStats: Record<string, number>;
  trafficSourceStats: Record<string, number>;
  deviceStats: Record<string, number>;
  browserStats: Record<string, number>;
  osStats: Record<string, number>;
  carrierStats: Record<string, number>;
  searchEngineStats: Record<string, number>;
  deviceModelStats: Record<string, number>;
  sessionCountStats: Record<string, number>;
  referrerStats: Record<string, number>;
  searchKeywordStats: Record<string, number>;
}

export interface VisitorFilters {
  counsel_type_id: string;
  date_from: string;
  date_to: string;
  traffic_source: string;
  device_type: string;
  search_engine: string;
  device_model: string;
  search_keyword: string;
}
