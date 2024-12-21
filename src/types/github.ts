export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
  blog: string;
  company: string;
  twitter_username: string;
  public_gists: number;
  email: string;
}

export interface Repository {
  name: string;
  fork: boolean;
  language: string;
  created_at: string;
  stargazers_count: number;
  description: string;
  html_url: string;
  topics: string[];
  updated_at: string;
  size: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
}

export interface GitHubStats {
  totalRepos: number;
  forkedRepos: number;
  mostUsedLanguage: string;
  followers: number;
  languageBreakdown: { [key: string]: number };
  totalStars: number;
  totalForks: number;
  totalWatchers: number;
  topRepositories: Repository[];
  recentActivity: Repository[];
  contributionStats: {
    totalCommits: number;
    issuesOpened: number;
    pullRequests: number;
  };
}