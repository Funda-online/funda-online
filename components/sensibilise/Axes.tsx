export function Axes() {
  const axes = [
    {
      title: "Intelligence Artificielle",
      desc: "Comprendre les bases de l’IA et ses impacts"
    },
    {
      title: "Cybersécurité",
      desc: "Apprendre à se protéger en ligne"
    },
    {
      title: "Auto-apprentissage",
      desc: "Utiliser internet pour apprendre efficacement"
    }
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-semibold">
        Axes d’intervention
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {axes.map((item, i) => (
          <div key={i} className="p-6 border rounded-xl">
            <h3 className="font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}