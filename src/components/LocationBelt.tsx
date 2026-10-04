type BeltItem = {
  label: string;
  bold?: boolean;
};

type LocationBeltProps = {
  locations?: readonly string[];
  items?: readonly BeltItem[];
  reverse?: boolean;
  label?: string;
};

function Group({
  items,
  hidden = false,
  bright = false,
}: {
  items: readonly BeltItem[];
  hidden?: boolean;
  bright?: boolean;
}) {
  return (
    <div className="location-belt__group" aria-hidden={hidden || undefined}>
      {items.map((item, index) => (
        <span key={`${hidden ? "b" : "a"}-${index}`} className="contents">
          <span
            className={item.bold ? "location-belt__name location-belt__name--bold" : "location-belt__name"}
            style={bright ? { color: "#ffffff" } : undefined}
          >
            {item.label}
          </span>
          <span className="location-belt__dot" />
        </span>
      ))}
    </div>
  );
}

export default function LocationBelt({
  locations,
  items,
  reverse = false,
  label = "Other locations played in",
}: LocationBeltProps) {
  const entries: BeltItem[] = items
    ? [...items]
    : (locations ?? []).map((place) => ({ label: place }));
  const loop = [...entries, ...entries];

  return (
    <div
      className={`location-belt [margin-inline:calc(50%-50vw)] w-screen${reverse ? " location-belt--reverse" : ""}`}
      style={reverse ? { paddingTop: 14, paddingBottom: 14 } : undefined}
      aria-label={label}
    >
      <div className="location-belt__track">
        <Group items={loop} bright={reverse} />
        <Group items={loop} hidden bright={reverse} />
      </div>
    </div>
  );
}
