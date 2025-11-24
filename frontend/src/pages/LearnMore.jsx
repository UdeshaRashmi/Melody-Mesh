import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LearnMore() {
  const [activeTab, setActiveTab] = useState("features");
  const navigate = useNavigate();

  const features = [
    {
      title: "Event Management",
      description: "Create, organize, and manage music festivals with our comprehensive event management tools.",
      icon: "📅"
    },
    {
      title: "Community Building",
      description: "Connect with fellow music lovers, artists, and organizers through our community platform.",
      icon: "👥"
    },
    {
      title: "Real-time Updates",
      description: "Stay informed with live updates, schedule changes, and announcements during events.",
      icon: "🔔"
    },
    {
      title: "Ticket Integration",
      description: "Seamless ticket purchasing and management integrated directly into the platform.",
      icon: "🎟️"
    },
    {
      title: "Interactive Maps",
      description: "Navigate festival grounds with interactive maps and location-based services.",
      icon: "🗺️"
    },
    {
      title: "Social Sharing",
      description: "Share your festival experiences with friends and on social media platforms.",
      icon: "📸"
    }
  ];

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Simply click on the 'Sign Up' button and fill in your details. You'll receive a confirmation email to verify your account."
    },
    {
      question: "Is there a mobile app available?",
      answer: "Yes, our mobile app is available for both iOS and Android devices. Download it from your device's app store."
    },
    {
      question: "How can I organize a festival using Melody Mesh?",
      answer: "After creating an account, you can access our event management tools from your dashboard. Contact our support team for organizer-specific features."
    },
    {
      question: "Can I get refunds for tickets purchased through the platform?",
      answer: "Refund policies vary by event. Please check the specific event's refund policy or contact the event organizer directly."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our support team through the contact form on our website or by emailing support@melodymesh.com."
    }
  ];

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Festival Organizer",
      content: "Melody Mesh has transformed how we manage our events. The platform is intuitive and has significantly improved our attendee engagement.",
      rating: 5
    },
    {
      name: "Sarah Williams",
      role: "Music Enthusiast",
      content: "I've discovered so many amazing festivals through this platform. The personalized recommendations are spot on!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Event Coordinator",
      content: "The real-time updates and communication tools have made coordinating large events so much easier. Highly recommended!",
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Melody Mesh</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Everything you need to know about our platform and how it can enhance your music festival experience.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-5xl mx-auto mb-16">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab("features")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "features"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:text-blue-600 shadow"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab("how-it-works")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "how-it-works"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:text-blue-600 shadow"
            }`}
          >
            How It Works
          </button>
          <button
            onClick={() => setActiveTab("testimonials")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "testimonials"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:text-blue-600 shadow"
            }`}
          >
            Testimonials
          </button>
          <button
            onClick={() => setActiveTab("faq")}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === "faq"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:text-blue-600 shadow"
            }`}
          >
            FAQ
          </button>
        </div>

        {/* Features Section */}
        {activeTab === "features" && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How It Works Section */}
        {activeTab === "how-it-works" && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How Melody Mesh Works</h2>
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Create Your Account</h3>
                  <p className="text-gray-600 text-lg">
                    Sign up for a free account to access all our features. Whether you're an organizer or attendee, 
                    we have tools tailored for your needs.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Explore Events</h3>
                  <p className="text-gray-600 text-lg">
                    Browse our extensive collection of music festivals. Use our filters to find events by location, 
                    genre, date, or popularity.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Connect & Engage</h3>
                  <p className="text-gray-600 text-lg">
                    Join communities, connect with other attendees, and engage with organizers before, during, 
                    and after events.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                  4
                  </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Enjoy the Experience</h3>
                  <p className="text-gray-600 text-lg">
                    Use our platform during events for real-time updates, navigation, social sharing, and more to 
                    make your festival experience unforgettable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        {activeTab === "testimonials" && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100"
                >
                  <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-xl">★</span>
            ))}
          </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-blue-600">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {activeTab === "faq" && (
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-100">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-blue-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-10 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Festival Experience?
          </h3>
          <p className="text-blue-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of festival organizers and attendees using Melody Mesh to create unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate("/register")}
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              Get Started Today
            </button>
            <button 
              onClick={() => navigate("/contact")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-200"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnMore;