import supabase from "@/lib/supabase";
import PlanCard from "@/components/PlanCard";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PlansPage() {
  const { data: plans, error } = await supabase
    .from("study_plans")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Saved Plans
          </h1>
          <p className="text-gray-600 mt-2">
            All your AI-generated study plans in one place.
          </p>
        </div>
        <Link
          href="/"
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-md"
        >
          + Generate New
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">
          Failed to load plans. Please check your Supabase connection.
        </div>
      )}

      {plans && plans.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            No plans yet
          </h2>
          <p className="text-gray-500 mb-6">
            Generate your first AI-powered study plan to get started.
          </p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition shadow-md"
          >
            Generate Your First Plan
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {plans?.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}