type LocationBeltProps = {
  locations: readonly string[];
};

function Group({
  locations,
  hidden = false,
}: {
  locations: readonly string[];
  hidden?: boolean;
}) {
  return (
    <div className="location-belt__group" aria-hidden={hidden || undefined}>
      {locations.map((place, index) => (
        <span key={`${hidden ? "b" : "a"}-${index}`} className="contents">
          <span className="location-belt__name">{place}</span>
          <span className="location-belt__dot" />
        </span>
      ))}
    </div>
  );
}

export default function LocationBelt({ locations }: LocationBeltProps) {
  const loop = [...locations, ...locations];

  return (
    <div
      className="location-belt [margin-inline:calc(50%-50vw)] w-screen"
      aria-label="Other locations played in"
    >
      <div className="location-belt__track">
        <Group locations={loop} />
        <Group locations={loop} hidden />
      </div>
    </div>
  );
}
