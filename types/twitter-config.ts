export interface TwitterScrapperConfig {
  within_time:      string;
  show_items:       number;
  categories:       Category[];
  twitter_accounts: TwitterAccount[];
}

export interface Category {
  category_name:         string;
  page_title:            string;
  page_title_horizontal: string;
  keywords:              string[];
  negative_keywords:     string[];
}

export interface TwitterAccount {
  username: string;
  prefix:   string;
  suffix:   string;
}
