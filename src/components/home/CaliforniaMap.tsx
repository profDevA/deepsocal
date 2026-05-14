export default function CaliforniaMap({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M84 6c2 4 6 6 12 8s8 6 6 12c-2 8 4 12 12 14 8 1 14 6 16 14l8 22c2 6 6 10 12 12 6 1 12 4 16 10 4 8 4 16 0 24-2 6-2 12 0 18l8 22c4 10 4 20-2 30-6 8-8 18-6 28 2 14-2 26-12 36-8 8-12 18-12 30 0 16-6 28-18 36-10 8-22 12-34 14l-12 4c-6 2-10 6-12 12-2 8-8 12-16 14-10 2-18-2-24-10-6-10-10-22-10-34v-26c0-12-4-22-12-30-8-10-12-22-10-34 2-14 8-26 16-36 8-8 14-18 18-28l8-22c4-10 4-20 0-30-4-12-2-22 6-30 6-6 14-10 22-10z"
        stroke="#1f1c06"
        strokeWidth="1.5"
        fill="rgba(217, 221, 209, 0.4)"
      />
      <circle cx="160" cy="280" r="6" fill="#FF8126" />
      <text
        x="170"
        y="285"
        fontFamily="var(--nf-bangers), cursive"
        fontSize="14"
        fill="#1f1c06"
      >
        SoCal
      </text>
    </svg>
  );
}
