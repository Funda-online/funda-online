export function Axes() {
  const axes = [
  {
    title: "Intelligence Artificielle",
    desc: "Comprendre les fondamentaux de l’IA, ses applications concrètes et ses enjeux pour mieux s’approprier ces technologies."
  },
  {
    title: "Cybersécurité",
    desc: "Adopter les bonnes pratiques pour se protéger contre les menaces numériques et sécuriser ses données au quotidien."
  },
  {
    title: "Auto-apprentissage",
    desc: "Apprendre à exploiter les ressources en ligne pour développer ses compétences et devenir acteur de son apprentissage."
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