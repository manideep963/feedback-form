"use client";
import React, { useState } from "react";
import { MessageSquare, Send, CheckCircle, AlertCircle, User, Mail } from "lucide-react";

const DashboardPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', feedback: '' });
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Share Your Feedback</h1>
          </div>
          <p className="text-gray-600 text-lg">
            We'd love to hear your thoughts and suggestions to help us improve
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Feedback submitted successfully!</p>
              <p className="text-green-700 text-sm">Thank you for your valuable input.</p>
            </div>
          </div>
        )}

       
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Failed to submit feedback</p>
              <p className="text-red-700 text-sm">Please try again later.</p>
            </div>
          </div>
        )}

        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="space-y-6">
            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="h-4 w-4" />
                Name (Optional)
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your name"
              />
            </div>

           
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4" />
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter your email"
              />
            </div>

            
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4" />
                Your Feedback *
              </label>
              <textarea
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                required
                rows="6"
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                placeholder="Share your thoughts, suggestions, or any feedback you have..."
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">
                Please be as detailed as possible to help us understand your feedback better.
              </p>
            </div>

            
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.feedback.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit Feedback
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

       
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Your feedback helps us create a better experience for everyone. Thank you for taking the time to share your thoughts!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;