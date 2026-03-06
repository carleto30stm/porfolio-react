import { useState, useEffect } from 'react';
import axios from 'axios';
import type { GitHubStats } from '../types';

const GITHUB_GRAPHQL = 'https://api.github.com/graphql';

export const useGitHubStats = (username: string) => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(false);
      try {
        const token = (import.meta.env as { VITE_GITHUB_TOKEN?: string }).VITE_GITHUB_TOKEN;

        // REST call for basic public data (works without token)
        const headers: { Authorization?: string } = token ? { Authorization: `Bearer ${token}` } : {};
        const { data } = await axios.get(`https://api.github.com/users/${username}`, { headers });

        const base: GitHubStats = {
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
        };

        // If token provided, fetch contribution calendar via GraphQL (includes private contributions for your token)
        if (token) {
          const query = `query($login:String!) {\n  user(login: $login) {\n    contributionsCollection {\n      totalCommitContributions\n      contributionCalendar {\n        weeks {\n          contributionDays {\n            date\n            contributionCount\n            color\n          }\n        }\n      }\n    }\n  }\n}`;

          const resp = await axios.post(
            GITHUB_GRAPHQL,
            { query, variables: { login: username } },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          const coll = resp.data?.data?.user?.contributionsCollection;
          if (coll) {
            base.total_commits = coll.totalCommitContributions;
            base.contributionCalendar = coll.contributionCalendar;
          }
        }

        setStats(base);
      } catch (err) {
        setError(true);
        console.error('Error fetching GitHub stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [username]);

  return { stats, loading, error };
};
