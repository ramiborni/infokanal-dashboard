export interface Module {
  name: string;
  slang: string;
}

export interface ExtendedModule {
  _id: string;
  name: string;
  slang: string;
  created_at: Date;
  updated_at: null;
  settings: Settings;
  rss_sources: Sources;
}

export interface Settings {
  manual_convert: boolean;
  keywords: string[];
  negative_keywords: string[];
}

export interface Sources {
  sources: Source[];
  created_at: Date;
  updated_at: null;
}

export interface Source {
  source_name: string;
  source_url: string;
  require_login: boolean;
  summarize_from_rss_feed: boolean;
  require_keywords_verification: boolean;
}
