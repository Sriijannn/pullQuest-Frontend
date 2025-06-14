"use client"

import { RepositoryCard } from "@/components/RepositoryCard"


const dummyRepos = [
  {
    name: "ai-code-reviewer",
    description: "Automated code review system using machine learning to detect bugs and suggest improvements",
    htmlUrl: "https://github.com/aitoss/ai-code-reviewer",
    language: "Python",
    stars: 1240,
    lastCommit: "2 hours ago",
    openIssues: 12,
    hasActiveBounties: true,
  },
  {
    name: "open-source-metrics",
    description: "Analytics dashboard for tracking open source project health and contributor engagement",
    htmlUrl: "https://github.com/aitoss/open-source-metrics",
    language: "TypeScript",
    stars: 856,
    lastCommit: "1 day ago",
    openIssues: 8,
    hasActiveBounties: false,
  },
  {
    name: "community-bot",
    description: "Discord and Slack bot for managing open source communities and automating workflows",
    htmlUrl: "https://github.com/aitoss/community-bot",
    language: "JavaScript",
    stars: 432,
    lastCommit: "3 days ago",
    openIssues: 5,
    hasActiveBounties: true,
  },
]


interface RepoStepProps {
  orgLogin: string | null
}

export default function RepoStep({ orgLogin }: RepoStepProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center">Repository Dashboard</h1>
      {orgLogin && (
        <p className="text-center text-gray-600 mb-6">
          Managing repositories for <strong>{orgLogin}</strong>
        </p>
      )}
      <div className="grid gap-6 max-w-5xl mx-auto">
        {dummyRepos.map((r) => (
          <RepositoryCard key={r.name} {...r} />
        ))}
      </div>
    </div>
  )
}
