import React from 'react';
import { GitHubUser, GitHubStats } from '../types/github';
import { Users, GitFork, Code, Star, Eye, Calendar, MapPin, Building, Link, Twitter } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import { LanguageStats } from './LanguageStats';

interface ProfileCardProps {
  user: GitHubUser;
  stats: GitHubStats;
}

export function ProfileCard({ user, stats }: ProfileCardProps) {
  return (
    <div className="w-full max-w-4xl bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* User Profile Section */}
          <div className="flex-shrink-0">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-32 h-32 rounded-full border-2 border-blue-500"
            />
          </div>
          
          <div className="flex-grow">
            <div className="mb-4">
              <h2 className="text-3xl font-bold text-white">{user.name}</h2>
              <p className="text-gray-400">@{user.login}</p>
              {user.bio && <p className="text-gray-300 mt-2">{user.bio}</p>}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {user.location && (
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{user.location}</span>
                </div>
              )}
              {user.company && (
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">{user.company}</span>
                </div>
              )}
              {user.blog && (
                <div className="flex items-center space-x-2">
                  <Link className="w-4 h-4 text-gray-400" />
                  <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    Website
                  </a>
                </div>
              )}
              {user.twitter_username && (
                <div className="flex items-center space-x-2">
                  <Twitter className="w-4 h-4 text-gray-400" />
                  <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                    @{user.twitter_username}
                  </a>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300">Joined {formatDate(user.created_at)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={Code} label="Repositories" value={user.public_repos} />
              <StatCard icon={Users} label="Followers" value={user.followers} />
              <StatCard icon={GitFork} label="Forked" value={stats.forkedRepos} />
              <StatCard icon={Star} label="Total Stars" value={stats.totalStars} />
            </div>
          </div>
        </div>

        {/* Language Stats Section */}
        <LanguageStats languageBreakdown={stats.languageBreakdown} />

        {/* Repository Stats Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Top Repositories</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.topRepositories.map(repo => (
              <div key={repo.name} className="bg-white/5 p-4 rounded-lg">
                <h4 className="text-lg font-medium text-white">{repo.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{repo.description}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-gray-300">{repo.stargazers_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <GitFork className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-300">{repo.forks_count}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">{repo.watchers_count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Stats */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">Year Contributions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={Code}
              label="Total Commits"
              value={stats.contributionStats.totalCommits}
            />
            <StatCard
              icon={GitFork}
              label="Pull Requests"
              value={stats.contributionStats.pullRequests}
            />
            <StatCard
              icon={Eye}
              label="Issues Opened"
              value={stats.contributionStats.issuesOpened}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: number;
}

function StatCard({ icon: Icon, label, value }: StatCardProps) {
  return (
    <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg">
      <Icon className="w-5 h-5 text-blue-400" />
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-bold text-white">{value.toLocaleString()}</p>
      </div>
    </div>
  );
}