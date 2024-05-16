export interface RssNews {
  feed_id: string
  feed_item_url: string
  feed_title: string
  image_url: string
  feed_content: string
  pub_date: string
  allowed_to_summarize: boolean
  rss_feed_source: RssFeedSource
}

export interface RssFeedSource {
  _id: string
  source_url: string
  require_login: boolean
  summarize_from_rss_feed: boolean
  source_name: string
}