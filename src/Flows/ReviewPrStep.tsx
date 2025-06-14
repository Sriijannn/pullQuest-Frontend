"use client"

import PrCard from "@/components/PrCard"
import { Github } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

/* --- 10 dummy pull requests (replace with real API data later) --- */
const dummyPRs = [
    {
      number: 11380,
      title: "docs: single-line Helm descriptions",
      author: "artberger",
      created: "43 minutes ago",
      comments: 3,
      labels: [
        { name: "kind/documentation", color: "c5def5" },
        { name: "release-note-none", color: "ededed" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11378,
      title: "an EP for a reusable Deployer",
      author: "dmitri-d",
      created: "18 hours ago",
      comments: 7,
      labels: [
        { name: "kind/documentation", color: "c5def5" },
        { name: "release-note-none", color: "ededed" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11377,
      title: "[wip] Make it possible to reuse Deployer",
      author: "dmitri-d",
      created: "19 hours ago",
      comments: 1,
      labels: [{ name: "kind/cleanup", color: "d4c5f9" }],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11374,
      title: "Adding docs link to Inference Extension",
      author: "hptvu",
      created: "1 day ago",
      comments: 1,
      labels: [
        { name: "do-not-merge/kind-invalid", color: "d73a4a" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11372,
      title: "ep: AI Extensions OpenTelemetry Tracing Support",
      author: "zhengkezhou1",
      created: "2 days ago",
      comments: 0,
      labels: [
        { name: "kind/documentation", color: "c5def5" },
        { name: "release-note-none", color: "ededed" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11371,
      title: "EP-11173 : Telemetry Access Log + Tracing",
      author: "davidjwujinami",
      created: "2 days ago",
      comments: 7,
      labels: [
        { name: "kind/design", color: "0052cc" },
        { name: "release-note-none", color: "ededed" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11365,
      title: "backendconfigpolicy: add load-balancer config",
      author: "puerwotmont",
      created: "3 days ago",
      comments: 29,
      labels: [{ name: "kind/feature", color: "0e8a16" }],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11364,
      title: "[WIP] Use all target refs in backendTLSPolicy",
      author: "bogdan-deac",
      created: "3 days ago",
      comments: 2,
      labels: [
        { name: "kind/fix", color: "d73a4a" },
        { name: "release-note-none", color: "ededed" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11363,
      title: "[wip]: add load-testing framework for kgateway",
      author: "MayorFaj",
      created: "5 days ago",
      comments: 11,
      labels: [
        { name: "kind/feature", color: "0e8a16" },
        { name: "do-not-merge/release-note-invalid", color: "d73a4a" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
    {
      number: 11360,
      title: "feat: Add tracing configuration to ai-extension",
      author: "zhengkezhou1",
      created: "1 week ago",
      comments: 9,
      labels: [
        { name: "kind/feature", color: "0e8a16" },
        { name: "release-note-none", color: "ededed" },
      ],
      repoUrl: "https://github.com/kgateway-dev/kgateway",
    },
  ];
  
export default function ReviewPrStep() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-4xl font-bold text-center">Review Pull Requests</h1>

      {/* Intro card remains */}
      <Card className="border">
        <CardContent className="p-8 text-center">
          <Github className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Pull-request review list</h3>
          <p className="text-gray-600">
            Ten recent PRs displayed as cards below. Replace with live GitHub data later.
          </p>
        </CardContent>
      </Card>

      {/* PR list */}
      <div className="space-y-3">
        {dummyPRs.map((pr) => (
          <PrCard key={pr.number} {...pr} />
        ))}
      </div>
    </div>
  )
}
