import { useState } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const [activeTab, setActiveTab] = useState("mission");
  const navigate = useNavigate();

  const teamMembers = [
    {
      name: "A. Sharma",
      role: "Founder & CEO",
      description: "Visionary leader with 10+ years in event management and technology innovation.",
      gradient: "from-blue-500 to-green-500",
      icon: "🚀"
    },
    {
      name: "R. Singh",
      role: "Lead Developer",
      description: "Full-stack wizard passionate about creating seamless user experiences.",
      gradient: "from-blue-500 to-green-500",
      icon: "💻"
    },
    {
      name: "S. Patel",
      role: "Community Manager",
      description: "Connects people and builds vibrant festival communities worldwide.",
      gradient: "from-blue-500 to-green-500",
      icon: "🌟"
    }
  ];

  const stats = [
    { number: "50+", label: "Festivals Managed" },
    { number: "100K+", label: "Happy Attendees" },
    { number: "15+", label: "Countries" },
    { number: "24/7", label: "Support" }
  ];

  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology solutions",
      icon: "⚡"
    },
    {
      title: "Community",
      description: "Building connections that last beyond the festival grounds",
      icon: "👥"
    },
    {
      title: "Excellence",
      description: "Delivering exceptional experiences at every touchpoint",
      icon: "🎯"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Founded with a vision to revolutionize music festival experiences through technology"
    },
    {
      year: "2021",
      title: "First Major Release",
      description: "Launched our platform with 10 partner festivals across 3 countries"
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to 12 countries with over 100K active users"
    },
    {
      year: "2023",
      title: "Innovation Awards",
      description: "Recognized with 3 industry awards for technological excellence"
    },
    {
      year: "2024",
      title: "Community Growth",
      description: "Reached 500K+ users and 100+ festival partnerships worldwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-20">
        <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6">
          About Us
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Unforgettable</span> Experiences
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
          We're on a mission to transform how music festivals are organized, experienced, and remembered through innovative technology and community-driven solutions.
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate("/register")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Join Our Community
          </button>
          <button 
            onClick={() => navigate("/learn-more")}
            className="bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-5xl mx-auto mb-20">
        <div className="flex justify-center mb-10">
          <div className="bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setActiveTab("mission")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "mission"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Our Mission
            </button>
            <button
              onClick={() => setActiveTab("story")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "story"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Our Story
            </button>
            <button
              onClick={() => setActiveTab("values")}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeTab === "values"
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Our Values
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-indigo-100">
          {activeTab === "mission" && (
            <div className="text-center">
              <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-2xl mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                To empower music festival communities with technology that enhances creativity, 
                fosters collaboration, and creates magical experiences that resonate long after 
                the music stops. We believe in connecting people through the universal language of music.
              </p>
            </div>
          )}

          {activeTab === "story" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500 transform md:translate-x-[-1px]"></div>
                
                {timeline.map((item, index) => (
                  <div 
                    key={index} 
                    className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  >
                    <div className="md:w-1/2 mb-4 md:mb-0">
                      <div className={`ml-10 md:ml-0 md:mr-10 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                        <div className="inline-block bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-semibold mb-2">
                          {item.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex justify-center md:justify-start">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white z-10">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "values" && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto mb-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            The passionate people behind Melody Mesh who make it all possible
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="text-center">
                <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-r ${member.gradient} flex items-center justify-center text-3xl text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {member.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 font-semibold text-lg mb-4">
                  {member.role}
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Festival Experience?
          </h3>
          <p className="text-indigo-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of festival organizers and attendees using Melody Mesh to create unforgettable moments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate("/register")}
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform duration-200 shadow-lg"
            >
              Get Started Today
            </button>
            <button 
              onClick={() => navigate("/contact")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all duration-200"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;