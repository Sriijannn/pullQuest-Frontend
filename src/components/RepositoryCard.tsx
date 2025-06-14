
// src/components/RepositoryCard.tsx
import React from "react"
import { Github, Star, GitBranch, Calendar, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export interface RepositoryCardProps {
  name: string
  description: string
  htmlUrl: string
  language: string
  stars: number
  lastCommit: string
  openIssues: number
  hasActiveBounties?: boolean
}

export function RepositoryCard({
  name,
  description,
  htmlUrl,
  language,
  stars,
  lastCommit,
  openIssues,
  hasActiveBounties = false,
}: RepositoryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            {hasActiveBounties && <Badge variant="default">Bounties</Badge>}
          </div>
          <p className="text-gray-600 mb-4 leading-relaxed">{description}</p>
          <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span>{language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{stars.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Updated {lastCommit}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitBranch className="w-4 h-4" />
              <span>{openIssues} open issues</span>
            </div>
          </div>
          {hasActiveBounties && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-green-900">Active Bounty Program</h4>
                  <p className="text-xs text-green-700">3 issues • 450 coins</p>
                </div>
                <Button variant="outline" size="sm">Manage Bounties</Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => window.open(htmlUrl, "_blank")}>  
            <Github className="w-4 h-4 mr-1" /> View on GitHub <ExternalLink className="w-3 h-3 ml-1" />
          </Button>
          <Button size="sm" className="bg-gray-900 text-white">Review PRs</Button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>Last activity:</span>
          <span className="font-medium">{lastCommit}</span>
        </div>
      </div>
    </div>
  )
}
