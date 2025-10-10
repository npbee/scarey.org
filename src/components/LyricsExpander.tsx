import { createSignal } from "solid-js";

export default function LyricsExpander(props: {
  lyrics: Array<string>;
  trackName: string;
}) {
  const { lyrics, trackName } = props;
  const [expanded, setExpanded] = createSignal(false);

  return (
    <div>
      <button
        class="flex items-center gap-0.5 font-semibold"
        aria-expanded={expanded()}
        onClick={() => setExpanded((expanded) => !expanded)}
      >
        {trackName}
        {expanded() ? <MinusIcon /> : <PlusIcon />}
      </button>
      <div class="content text-sm; my-4 pl-4 italic" hidden={!expanded()}>
        {lyrics.map((line) => (
          <p>{line}</p>
        ))}
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-plus-icon lucide-plus size-4"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-minus-icon lucide-minus size-4"
    >
      <path d="M5 12h14" />
    </svg>
  );
}
