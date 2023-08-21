"use client";

import axios from "axios";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";

interface subscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({
  isPro = false
}: subscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: "destructive",
        description: "something went wrong.",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button onClick={onClick} disabled={loading} size="sm" variant={isPro ? "default" : "premium"}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {!isPro && <Sparkles className="h-4 w-4 ml-2 fil-white" />}
    </Button>
  )
}