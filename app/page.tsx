import StudyForm from "@/components/StudyForm";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          PrepWise AI
        </h1>
        <p className="text-lg text-gray-600">
          Your AI-powered study assistant. Enter your subject, topics, and exam
          date to get a personalized study schedule.
        </p>
      </div>

      <StudyForm />
    </div>
  );
}