import "./SpaceEventsScene.css";

const stars = Array.from({ length: 90 }, (_, i) => ({
  id: i,
  left: `${(i * 37) % 100}%`,
  top: `${(i * 61) % 100}%`,
  delay: `${(i % 12) * 0.5}s`,
  duration: `${3 + (i % 5)}s`,
}));

export default function SpaceEventsScene() {
  return (
    <div className="space-scene">

      <div className="nebula nebula-1" />
      <div className="nebula nebula-2" />

      <div className="planet">
        <div className="planet-core" />
        <div className="planet-glow" />

        <div className="ring ring-1" />
        <div className="ring ring-2" />
        <div className="ring ring-3" />

        <div className="radar" />
        <div className="pulse" />
      </div>

      <div className="drone orbit-a"><div className="drone-body" /></div>
      <div className="drone orbit-b"><div className="drone-body" /></div>
      <div className="drone orbit-c"><div className="drone-body" /></div>

      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}

      <div className="meteor meteor-1" />
      <div className="meteor meteor-2" />
      <div className="meteor meteor-3" />

    </div>
  );
}
