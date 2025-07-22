// LogHours And Time Tacker Api Data Types

export type LogHoursAndTimeTrackerApiType = {
  id: number;
  engagement: number;
  date_time: string;
  description: { id: number; name: string };
  hours: number;
  minutes: number;
  user: { id: number; full_name: string };
  weekly_available?: number;
};

export type sidebarFilterObjType = {
  name: string;
  engagement: string;
  hours: number;
  minutes: number;
  dateFrom: number;
  dateTo: number;
};

// Engagements==========>

export type engagementsApiDataType = {
  created_by: string;
  description: string;
  expert: number;
  hours: number;
  id: number;
  is_active: boolean;
  name: string;
  ongoing: boolean;
  rate: number;
  start_date: string;
  total_billed: number;
  weekly_commitment: number;
};
