import React from "react";
import { MessageSquare, User, Clock } from "lucide-react";

async function fetchFeedbacks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch feedbacks");
  return res.json();
}

export default async function AdminFeedbackPage() {
  const feedbacks = await fetchFeedbacks();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Feedback Dashboard</h1>
          </div>
          <p className="text-gray-600">View and manage all user feedback</p>
        </div>

        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{feedbacks.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Feedback List */}
        {feedbacks.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
            <p className="text-gray-500">Feedback submissions will appear here when available.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((fb, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {fb.name || "Anonymous"}
                      </h3>
                      {fb.email && (
                        <span className="text-sm text-gray-500">({fb.email})</span>
                      )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {fb.feedback}
                      </p>
                    </div>
                    {fb.createdAt && (
                      <div className="flex items-center gap-1 mt-3 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(fb.createdAt).toLocaleDateString()} at {new Date(fb.createdAt).toLocaleTimeString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
