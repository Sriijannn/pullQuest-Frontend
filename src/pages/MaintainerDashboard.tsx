import React, { useEffect, useState } from "react"
import { useUser } from "../context/UserProvider"
import MaintainerFlow from "@/Flows/MaintainerFlow"
interface Organization {
  id: number
  login: string
  name: string | null
  description: string | null
  htmlUrl: string
}

export default function MaintainerDashboard() {
  const { user } = useUser()
 
  return (
    <div>
      <MaintainerFlow />
    </div>
  )
}