 import React from "react";

function Volunteers() {
  const volunteerWorks = [
    {
      title: "Community Music Workshops",
      description: "Teaching music and instruments to underprivileged kids.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRfAYrCUGonOmi-yT79fIB-5hHSJ7PHn3z9Q&s",
    },
    {
      title: "Live Music Events",
      description: "Organizing free live music events for local communities.",
      image: "https://images.stockcake.com/public/3/4/7/3472e2d7-26ce-4247-842d-ee3be3443df8_large/vibrant-music-festival-stockcake.jpg",
    },
    {
      title: "Music Therapy Sessions",
      description: "Helping people through music therapy and sound healing.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRofSfxZfz8cArFlMSlblbNQO0Go35rNxQAcg&s",
    },
    {
      title: "Charity Album Recording",
      description: "Recording albums and distributing proceeds to charity.",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-extrabold text-indigo-700 mb-4">Our Volunteers in Action</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Meet our amazing volunteers and see how they contribute to spreading the joy of music in our community.
        </p>
      </div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {volunteerWorks.map((work, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
            <img src={work.image} alt={work.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-indigo-700">{work.title}</h3>
              <p className="text-gray-600">{work.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Volunteers;
