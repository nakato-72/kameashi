type Light = "soft" | "side" | "back";

type SceneProps = {
  photoId: string;
};

function Defs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#F6F1EA" />
        <stop offset="100%" stopColor="#E8DCCF" />
      </linearGradient>
      <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#D9CBBA" />
        <stop offset="55%" stopColor="#F3EBE2" />
        <stop offset="100%" stopColor="#FFF9F3" />
      </linearGradient>
      <linearGradient id={`${id}-back`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFF8F0" />
        <stop offset="70%" stopColor="#E6D5C4" />
        <stop offset="100%" stopColor="#D4C2B0" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="38%" cy="28%" r="70%">
        <stop offset="0%" stopColor="#FFFDF8" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#FFFDF8" stopOpacity="0" />
      </radialGradient>
      <radialGradient id={`${id}-skin`} cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#F0D0BE" />
        <stop offset="100%" stopColor="#D9A890" />
      </radialGradient>
      <radialGradient id={`${id}-adult`} cx="35%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#D7B197" />
        <stop offset="100%" stopColor="#B8886C" />
      </radialGradient>
      <filter id={`${id}-soft`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.2" />
      </filter>
    </defs>
  );
}

function Backdrop({
  id,
  light,
}: {
  id: string;
  light: Light;
}) {
  const fill =
    light === "side"
      ? `url(#${id}-side)`
      : light === "back"
        ? `url(#${id}-back)`
        : `url(#${id}-bg)`;

  return (
    <g>
      <rect width="1200" height="800" fill={fill} />
      <ellipse cx="220" cy="140" rx="380" ry="260" fill={`url(#${id}-glow)`} />
      <ellipse
        cx="980"
        cy="720"
        rx="340"
        ry="180"
        fill="#D8C8B6"
        opacity="0.28"
      />
    </g>
  );
}

function ClosedEyes({
  cx,
  cy,
  scale = 1,
  profile = false,
}: {
  cx: number;
  cy: number;
  scale?: number;
  profile?: boolean;
}) {
  if (profile) {
    return (
      <path
        d={`M ${cx - 10 * scale} ${cy} Q ${cx} ${cy + 5 * scale} ${cx + 12 * scale} ${cy - 1 * scale}`}
        stroke="#8A6A5A"
        strokeWidth={1.6 * scale}
        fill="none"
        strokeLinecap="round"
      />
    );
  }
  return (
    <g stroke="#8A6A5A" strokeWidth={1.6 * scale} fill="none" strokeLinecap="round">
      <path
        d={`M ${cx - 28 * scale} ${cy} Q ${cx - 16 * scale} ${cy + 6 * scale} ${cx - 4 * scale} ${cy}`}
      />
      <path
        d={`M ${cx + 4 * scale} ${cy} Q ${cx + 16 * scale} ${cy + 6 * scale} ${cx + 28 * scale} ${cy}`}
      />
    </g>
  );
}

function BabyFace({
  id,
  cx,
  cy,
  scale = 1,
  rotate = 0,
  profile = false,
}: {
  id: string;
  cx: number;
  cy: number;
  scale?: number;
  rotate?: number;
  profile?: boolean;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <ellipse cx="0" cy="8" rx="78" ry="88" fill={`url(#${id}-skin)`} />
      <ellipse cx="-48" cy="10" rx="16" ry="22" fill="#D4A894" />
      {!profile && <ellipse cx="48" cy="10" rx="16" ry="22" fill="#D4A894" />}
      <ClosedEyes cx={profile ? 18 : 0} cy={-6} profile={profile} />
      <ellipse
        cx={profile ? 22 : 0}
        cy="18"
        rx={profile ? 7 : 9}
        ry="6"
        fill="#C99282"
        opacity="0.55"
      />
      <ellipse cx="-22" cy="28" rx="14" ry="8" fill="#E8B4A8" opacity="0.45" />
      {!profile && (
        <ellipse cx="22" cy="28" rx="14" ry="8" fill="#E8B4A8" opacity="0.45" />
      )}
    </g>
  );
}

function Swaddle({
  cx,
  cy,
  scale = 1,
  rotate = 0,
  color = "#EFE4D6",
  shade = "#D9C3B0",
}: {
  cx: number;
  cy: number;
  scale?: number;
  rotate?: number;
  color?: string;
  shade?: string;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <ellipse cx="0" cy="40" rx="120" ry="150" fill={color} />
      <ellipse cx="18" cy="70" rx="70" ry="100" fill={shade} opacity="0.45" />
      <path
        d="M -70 -20 Q 0 30 80 -10"
        stroke={shade}
        strokeWidth="8"
        fill="none"
        opacity="0.5"
      />
    </g>
  );
}

function TinyHand({
  id,
  cx,
  cy,
  scale = 1,
  rotate = 0,
}: {
  id: string;
  cx: number;
  cy: number;
  scale?: number;
  rotate?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <ellipse cx="0" cy="8" rx="28" ry="34" fill={`url(#${id}-skin)`} />
      <ellipse cx="-18" cy="-10" rx="8" ry="16" fill="#E0B8A4" />
      <ellipse cx="-4" cy="-18" rx="8" ry="18" fill="#E6C1AD" />
      <ellipse cx="10" cy="-16" rx="8" ry="17" fill="#E0B8A4" />
      <ellipse cx="22" cy="-6" rx="7" ry="14" fill="#D4A894" />
    </g>
  );
}

function TinyFeet({
  id,
  cx,
  cy,
  scale = 1,
}: {
  id: string;
  cx: number;
  cy: number;
  scale?: number;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <ellipse cx="-28" cy="8" rx="26" ry="38" fill={`url(#${id}-skin)`} />
      <ellipse cx="28" cy="8" rx="26" ry="38" fill={`url(#${id}-skin)`} />
      <ellipse cx="-28" cy="-22" rx="12" ry="10" fill="#E6C1AD" />
      <ellipse cx="28" cy="-22" rx="12" ry="10" fill="#E6C1AD" />
    </g>
  );
}

function AdultHand({
  id,
  cx,
  cy,
  scale = 1,
  rotate = 0,
  flip = false,
}: {
  id: string;
  cx: number;
  cy: number;
  scale?: number;
  rotate?: number;
  flip?: boolean;
}) {
  return (
    <g
      transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${flip ? -scale : scale} ${scale})`}
    >
      <ellipse cx="0" cy="20" rx="70" ry="90" fill={`url(#${id}-adult)`} />
      <ellipse cx="-40" cy="-40" rx="16" ry="40" fill="#C9957A" />
      <ellipse cx="-14" cy="-52" rx="16" ry="46" fill="#D7B197" />
      <ellipse cx="12" cy="-50" rx="16" ry="44" fill="#C9957A" />
      <ellipse cx="36" cy="-36" rx="15" ry="38" fill="#B8886C" />
    </g>
  );
}

function Teddy({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <circle cx="-28" cy="-30" r="16" fill="#C4A484" />
      <circle cx="28" cy="-30" r="16" fill="#C4A484" />
      <ellipse cx="0" cy="8" rx="42" ry="48" fill="#D2B48C" />
      <circle cx="-14" cy="0" r="5" fill="#6B4E3D" />
      <circle cx="14" cy="0" r="5" fill="#6B4E3D" />
      <ellipse cx="0" cy="16" rx="8" ry="6" fill="#8A6754" />
    </g>
  );
}

function Basket({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
      <ellipse cx="0" cy="40" rx="210" ry="70" fill="#C8A078" />
      <ellipse cx="0" cy="10" rx="190" ry="120" fill="#E2C49A" />
      <ellipse cx="0" cy="18" rx="160" ry="90" fill="#F3E6D4" />
      {[...Array(7)].map((_, i) => (
        <path
          key={i}
          d={`M ${-180 + i * 50} 10 Q ${-160 + i * 50} 80 ${-140 + i * 50} 110`}
          stroke="#B8895C"
          strokeWidth="6"
          fill="none"
          opacity="0.35"
        />
      ))}
    </g>
  );
}

function CurledBaby({
  id,
  cx,
  cy,
  scale = 1,
  rotate = 0,
  wrap = "#EFE4D6",
}: {
  id: string;
  cx: number;
  cy: number;
  scale?: number;
  rotate?: number;
  wrap?: string;
}) {
  return (
    <g transform={`translate(${cx} ${cy}) rotate(${rotate}) scale(${scale})`}>
      <ellipse cx="10" cy="50" rx="110" ry="80" fill={wrap} />
      <ellipse cx="70" cy="70" rx="50" ry="38" fill={`url(#${id}-skin)`} />
      <ellipse cx="95" cy="55" rx="22" ry="16" fill="#E0B8A4" />
      <BabyFace id={id} cx={-40} cy={-10} scale={0.72} rotate={-18} />
    </g>
  );
}

function SceneContent({ id, photoId }: { id: string; photoId: string }) {
  switch (photoId) {
    case "01":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <Swaddle cx={600} cy={470} scale={1.15} />
          <BabyFace id={id} cx={600} cy={380} scale={1.35} />
        </>
      );
    case "02":
      return (
        <>
          <Backdrop id={id} light="side" />
          <CurledBaby id={id} cx={820} cy={540} scale={0.78} rotate={12} />
        </>
      );
    case "03":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <ellipse cx={600} cy={430} rx={280} ry={220} fill="#EFE4D6" />
          <BabyFace id={id} cx={600} cy={400} scale={2.05} />
        </>
      );
    case "04":
      return (
        <>
          <Backdrop id={id} light="side" />
          <CurledBaby id={id} cx={380} cy={430} scale={1.05} rotate={-8} wrap="#E8D5C4" />
        </>
      );
    case "05":
      return (
        <>
          <Backdrop id={id} light="side" />
          <Swaddle cx={380} cy={470} scale={1.05} rotate={-12} color="#EAD9C8" />
          <BabyFace id={id} cx={400} cy={360} scale={1.2} rotate={-8} profile />
        </>
      );
    case "06":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <Swaddle cx={560} cy={500} />
          <BabyFace id={id} cx={520} cy={340} scale={1.15} />
          <TinyHand id={id} cx={680} cy={430} scale={1.1} rotate={-25} />
        </>
      );
    case "07":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <CurledBaby id={id} cx={520} cy={400} scale={1.15} rotate={-20} />
          <TinyFeet id={id} cx={760} cy={520} scale={0.9} />
        </>
      );
    case "08":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <TinyHand id={id} cx={600} cy={410} scale={2.4} rotate={-12} />
        </>
      );
    case "09":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <TinyFeet id={id} cx={600} cy={410} scale={2.2} />
        </>
      );
    case "10":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <Swaddle cx={600} cy={430} scale={1.35} color="#F3E6D8" shade="#C9A090" />
          <BabyFace id={id} cx={600} cy={300} scale={0.85} />
        </>
      );
    case "11":
      return (
        <>
          <Backdrop id={id} light="side" />
          <Basket cx={600} cy={430} />
          <CurledBaby id={id} cx={590} cy={380} scale={0.72} />
        </>
      );
    case "12":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <CurledBaby id={id} cx={400} cy={400} scale={1} />
          <g transform="translate(800 560)">
            <ellipse cx="0" cy="0" rx="70" ry="28" fill="#C9A090" />
            <ellipse cx="0" cy="-12" rx="48" ry="20" fill="#E8D5C4" />
          </g>
        </>
      );
    case "13":
      return (
        <>
          <Backdrop id={id} light="side" />
          <Swaddle cx={240} cy={430} scale={0.95} rotate={-16} color="#EAD9C8" />
          <BabyFace id={id} cx={250} cy={340} scale={1.05} rotate={-10} profile />
        </>
      );
    case "14":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <CurledBaby id={id} cx={400} cy={300} scale={0.9} rotate={-12} />
          <Teddy cx={820} cy={540} scale={1.35} />
        </>
      );
    case "15":
      return (
        <>
          <Backdrop id={id} light="back" />
          <CurledBaby id={id} cx={220} cy={520} scale={0.7} rotate={18} wrap="#E6D0BE" />
        </>
      );
    case "16":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <CurledBaby id={id} cx={430} cy={390} scale={0.95} />
          <AdultHand id={id} cx={820} cy={430} scale={1.15} rotate={20} />
        </>
      );
    case "17":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <AdultHand id={id} cx={640} cy={430} scale={1.35} rotate={18} />
          <TinyHand id={id} cx={500} cy={390} scale={1.7} rotate={-30} />
        </>
      );
    case "18":
      return (
        <>
          <Backdrop id={id} light="side" />
          <AdultHand id={id} cx={430} cy={430} scale={1.2} rotate={-25} flip />
          <AdultHand id={id} cx={770} cy={430} scale={1.2} rotate={25} />
          <Swaddle cx={600} cy={400} scale={0.72} />
          <BabyFace id={id} cx={600} cy={330} scale={0.7} />
        </>
      );
    case "19":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <ellipse cx={220} cy={520} rx={180} ry={260} fill="#D7B197" opacity="0.85" />
          <ellipse cx={980} cy={500} rx={200} ry={280} fill="#C9957A" opacity="0.8" />
          <Swaddle cx={600} cy={430} scale={0.95} />
          <BabyFace id={id} cx={600} cy={330} scale={0.95} />
        </>
      );
    case "20":
      return (
        <>
          <Backdrop id={id} light="soft" />
          <Swaddle cx={600} cy={560} scale={1.25} />
          <BabyFace id={id} cx={600} cy={360} scale={1.55} />
        </>
      );
    default:
      return <Backdrop id={id} light="soft" />;
  }
}

export function PhotoScene({ photoId }: SceneProps) {
  const uid = `s${photoId}`;
  return (
    <svg
      viewBox="0 0 1200 800"
      role="img"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <Defs id={uid} />
      <SceneContent id={uid} photoId={photoId} />
    </svg>
  );
}
