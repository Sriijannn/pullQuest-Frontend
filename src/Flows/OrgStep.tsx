"use client"

import { OrgCard } from "@/components/OrgCard"

const dummyOrgs = [
  {
    login: "aitoss",
    description: "AI and Open Source Software - Building the future of intelligent development tools",
    avatarUrl: "https://github.com/aitoss.png",
    htmlUrl: "https://github.com/aitoss",
    membershipText: "Outside collaborator",
    repoCount: 3,
    members: 12,
  },
  {
    login: "FSOC-OSS",
    description: "Free Software and Open Source Community - Promoting open source adoption",
    avatarUrl: "https://github.com/FSOC-OSS.png",
    htmlUrl: "https://github.com/FSOC-OSS",
    membershipText: "Owner",
    repoCount: 8,
    members: 25,
  },
  {
    login: "I-E-Cell",
    description: "Innovation and Entrepreneurship Cell - Fostering startup culture and innovation",
    avatarUrl: "https://github.com/I-E-Cell.png",
    htmlUrl: "https://github.com/I-E-Cell",
    membershipText: "Outside collaborator",
    repoCount: 1,
    members: 45,
  },
  {
    login: "layer5io",
    description: "Cloud native management - Service mesh and cloud native infrastructure",
    avatarUrl: "https://github.com/layer5io.png",
    htmlUrl: "https://github.com/layer5io",
    membershipText: "Member",
    repoCount: 15,
    members: 180,
  },
  {
    login: "myAlmate-ait",
    description: "Academic collaboration platform - Connecting students and researchers",
    avatarUrl: "https://github.com/myAlmate-ait.png",
    htmlUrl: "https://github.com/myAlmate-ait",
    membershipText: "Member",
    repoCount: 6,
    members: 8,
  },
  {
    login: "ravenotes",
    description: "Note-taking and knowledge management - Building better learning tools",
    avatarUrl: "https://github.com/ravenotes.png",
    htmlUrl: "https://github.com/ravenotes",
    membershipText: "Member & collaborator",
    repoCount: 4,
    members: 15,
  },
]

interface OrgStepProps {
  onSelect: (login: string) => void
}

export default function OrgStep({ onSelect }: OrgStepProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-center">Select an Organization</h1>
      <p className="text-center text-gray-600">
        Choose from your GitHub organizations to proceed.
      </p>
      <div className="grid gap-4 max-w-4xl mx-auto">
        {dummyOrgs.map((o) => (
          <OrgCard key={o.login} {...o} onClick={() => onSelect(o.login)} />
        ))}
      </div>
    </div>
  )
}
