// src/components/PrCard.tsx
"use client"

import { MessageCircle, GitBranch, Coins } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export interface PrCardProps {
  number: number
  title: string
  author: string
  created: string
  comments: number
  labels: { name: string; color?: string }[]
  repoUrl: string
}

export default function PrCard(props: PrCardProps) {
  const navigate = useNavigate()

  return (
    <Card className="border hover:border-gray-300 transition-colors">
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-between">
          <div>
            <a
              href={`${props.repoUrl}/pull/${props.number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              #{props.number} {props.title}
            </a>
            <div className="text-xs text-gray-500">
              opened {props.created} by <strong>{props.author}</strong>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {props.labels.map((l) => (
                <Badge
                  key={l.name}
                  style={{ backgroundColor: `#${l.color || "e1e4e8"}` }}
                  className="text-xs"
                >
                  {l.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center text-xs text-gray-500 space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{props.comments}</span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center space-x-1"
              onClick={() =>
                navigate(`/maintainer/open-issue/${props.number}`, {
                  state: props,
                })
              }
            >
              <Coins className="w-4 h-4" />
              <span>Open Issue with Coins</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
