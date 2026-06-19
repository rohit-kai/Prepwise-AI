"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Plan {
  id: number;
  subject: string;
  topics: string;
  exam_date: string;
  plan: string;
  created_at: string;
}

export default function PlanCard({ plan }: { plan: Plan }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  async function deletePlan() {
    if (!confirm("Are you sure you want to delete this study plan?")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/plans?id=${plan.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete plan.");
      }

      router.refresh();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete plan. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  const createdDate = new Date(plan.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{plan.subject}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Created on {createdDate}
            </p>
          </div>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {plan.topics.split(",").length} topics
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Topics:</span> {plan.topics}
        </p>

        {plan.exam_date && (
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-medium">Exam Date:</span>{" "}
            {new Date(plan.exam_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        <div
          className={`bg-gray-50 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap transition-all ${
            expanded ? "" : "max-h-32 overflow-hidden"
          }`}
        >
          {plan.plan}
        </div>

        {plan.plan.length > 300 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-blue-600 text-sm font-medium mt-2 hover:text-blue-800 transition"
          >
            {expanded ? "Show less ▲" : "Show more ▼"}
          </button>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={deletePlan}
            disabled={deleting}
            className="bg-red-50 text-red-600 border border-red-200 font-medium py-2 px-4 rounded-lg hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition text-sm"
          >
            {deleting ? "Deleting..." : "🗑 Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}