import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ProfileCard } from './components/ProfileCard';
import { GitHubUser, Repository, GitHubStats } from './types/github';
import { Github } from 'lucide-react';

function App() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubData = async (username: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch user data and repositories in parallel
      const [userResponse, reposResponse, eventsResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
        fetch(`https://api.github.com/users/${username}/events?per_page=100`)
      ]);

      if (!userResponse.ok || !reposResponse.ok) {
        throw new Error('User not found or rate limit exceeded');
      }

      const userData: GitHubUser = await userResponse.json();
      const reposData: Repository[] = await reposResponse.json();
      const eventsData = await eventsResponse.json();

      // Calculate language statistics
      const languageCount: { [key: string]: number } = {};
      reposData.forEach(repo => {
        if (repo.language) {
          languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
        }
      });

      // Calculate total statistics
      const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
      const totalWatchers = reposData.reduce((sum, repo) => sum + repo.watchers_count, 0);

      // Get top repositories by stars
      const topRepositories = [...reposData]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 4);

      // Get recent activity
      const recentActivity = [...reposData]
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 5);

      // Calculate contribution statistics from events
      const contributionStats = {
        totalCommits: eventsData.filter((event: { type: string; }) => event.type === 'PushEvent').length,
        issuesOpened: eventsData.filter((event: { type: string; }) => event.type === 'IssuesEvent').length,
        pullRequests: eventsData.filter((event: { type: string; }) => event.type === 'PullRequestEvent').length
      };

      setUser(userData);
      setStats({
        totalRepos: userData.public_repos,
        forkedRepos: reposData.filter(repo => repo.fork).length,
        mostUsedLanguage: Object.entries(languageCount)
          .sort(([,a], [,b]) => b - a)[0]?.[0] || 'None',
        followers: userData.followers,
        languageBreakdown: languageCount,
        totalStars,
        totalForks,
        totalWatchers,
        topRepositories,
        recentActivity,
        contributionStats
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Github className="w-10 h-10 text-white" />
              <h1 className="text-4xl font-bold text-white">GitHub Wrap</h1>
            </div>
            <p className="text-gray-300 max-w-md mx-auto">
              Generate your personalized GitHub year-end summary and discover your coding journey.
            </p>
          </div>

          <SearchBar onSearch={fetchGitHubData} />

          {loading && (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span className="text-white">Fetching data...</span>
            </div>
          )}

          {error && (
            <div className="text-red-400 bg-red-900/20 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {user && stats && (
            <ProfileCard user={user} stats={stats} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;