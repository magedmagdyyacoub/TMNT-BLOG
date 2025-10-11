import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Episodes.css";

const episodesData = [
  {
    title: "Rise of the Foot Clan",
    description: "المعركة الأولى بين السلاحف و شريدر وسط الأنفاق المظلمة!",
    embedId: "lxOq3uzR2-M",
  },
  {
    title: "Donatello's Big Hack",
    description: "دوني يخترق نظام المدينة لإنقاذ الفريق من فخ رقمي.",
    embedId: "bYuEBT1ssuU",
  },
  {
    title: "Pizza Panic!",
    description: "مايكي يطلب بيتزا في وسط المهمة… وما الذي قد يحدث؟",
    embedId: "3nt0fH9gJJo",
  },
];

const Episodes = () => {
  return (
    <>
      <Header />
      <section className="episodes-section">
        <h1 className="episodes-title">📺 TMNT Episodes Highlights</h1>
        <div className="episodes-grid">
          {episodesData.map((episode, index) => (
            <div key={index} className="episode-card">
              <iframe
                src={`https://www.youtube.com/embed/${episode.embedId}`}
                title={episode.title}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Episodes;
