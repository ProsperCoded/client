export function getExtension(filename: string) {
  const index = filename.lastIndexOf(".");
  if (!index) return "";
  return filename.substring(index + 1).toLowerCase();
}
export function FileSvg({ fill, stroke }: { fill: string; stroke: string }) {
  return (
    <svg
      width="100%"
      style={{ fill: fill, stroke: stroke }}
      viewBox="0 0 166.139 203.79"
    >
      <path
        id="Path_1"
        data-name="Path 1"
        d="M775.817,267.836H665.763v202.79H830.9V316.965Z"
        transform="translate(-665.263 -267.336)"
        strokeWidth="2"
      />
    </svg>
  );
}
export function FileSvgIcon({
  fill,
  stroke,
  extension,
  className,
}: {
  fill: string;
  stroke: string;
  extension: string;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 16 16"
      className={`file-svg ${className}`}
    >
      <path
        id="Path_1"
        data-name="Path 1"
        d="M14,4.5V14a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V2A2,2,0,0,1,4,0H9.5Zm-3,0A1.5,1.5,0,0,1,9.5,3V1H4A1,1,0,0,0,3,2V14a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V4.5Z"
        transform="translate(2)"
        fill={stroke}
      />
      <g
        id="Rectangle_1"
        data-name="Rectangle 1"
        transform="translate(0 6)"
        fill={fill}
        stroke={stroke}
        strokeWidth="1"
      >
        <rect width="13" height="10" rx="2" stroke="none" />
        <rect x="0.5" y="0.5" width="12" height="9" rx="1.5" fill="none" />
      </g>
      <text
        id="PNG"
        transform="translate(1 13)"
        fontSize="5"
        fontFamily="SegoeUI-Bold, Segoe UI"
        fontWeight="700"
        fill={stroke}
      >
        <tspan x="0" y="0">
          {extension}
        </tspan>
      </text>
    </svg>
  );
}
