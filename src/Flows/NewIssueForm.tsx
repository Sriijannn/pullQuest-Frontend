"use client"

import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../context/UserProvider"
import axios from "axios"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

interface CreateResp {
  success: boolean
  number?: number
  message?: string
}

export default function NewIssueForm() {
  const { owner, repo } = useParams<{ owner: string; repo: string }>()
  const { user } = useUser()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!owner || !repo) return <p className="text-red-500">Missing URL params.</p>

  const handleSubmit = async () => {
    if (!title.trim()) return setError("Title is required")
    setSubmitting(true)
    setError(null)

    const url = `${
      import.meta.env.VITE_API_URL || "http://localhost:8012"
    }/api/maintainer/create-issue`

    const jwt = localStorage.getItem("token")
    const cfg = { withCredentials: true, headers: { Authorization: jwt ? `Bearer ${jwt}` : undefined } }

    try {
      const res = await axios.post<CreateResp>(
        url,
        { owner, repo, title, body },
        cfg
      )
      if (res.data.success) {
        navigate(`/maintainer/repo/${owner}/${repo}/issues`)
      } else {
        setError(res.data.message || "Issue creation failed")
      }
    } catch (e: any) {
      setError(e.response?.data?.message || e.message || "Unknown error")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-6">
      <Card className="border">
        <CardContent className="p-8 space-y-6">
          <div className="flex items-center space-x-3">
            <Github className="w-8 h-8 text-gray-500" />
            <h1 className="text-2xl font-bold">
              New Issue for {owner}/{repo}
            </h1>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              disabled={submitting}
            />
            <Textarea
              placeholder="Leave a comment"
              rows={10}
              value={body}
              onChange={e => setBody(e.target.value)}
              disabled={submitting}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? "Creating…" : "Create issue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
