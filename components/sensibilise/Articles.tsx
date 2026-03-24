const articles = [
  {
    title: "Sensibilisation à l’IA",
    location: "Lubumbashi",
    date: "10 Février 2026",
    summary: "Session éducative sur l’intelligence artificielle",
    image: "/images/event1.jpg"
  }
];

export function Articles() {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-semibold">
        Sensibilisations passées
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article, i) => (
          <div key={i} className="border rounded-xl overflow-hidden">
            <img src={article.image} className="w-full h-48 object-cover" />

            <div className="p-4 space-y-2">
              <h3 className="font-bold">{article.title}</h3>

              <p className="text-sm text-muted-foreground">
                📍 {article.location} • {article.date}
              </p>

              <p className="text-sm">
                {article.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}