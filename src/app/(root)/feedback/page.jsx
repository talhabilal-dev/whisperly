import { redirect } from "next/navigation"

export default function FeedbackRedirect() {
  // Redirect to homepage if someone visits /feedback without a username
  redirect("/")
}
