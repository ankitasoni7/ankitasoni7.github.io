// Minimal black-and-white line-art character (inspired by, not copied from, the
// reference). Pupils (.hv2-pupil) and head/breath groups are animated by the parent.
export default function Character({ className = '' }) {
  return (
    <svg className={`hv2-svg ${className}`} viewBox="0 0 400 470" fill="none" aria-hidden="true">
      <g className="hv2-breath" style={{ transformOrigin: '200px 460px' }}>
        {/* oversized shoulders */}
        <path d="M22 470 C22 352 108 300 200 300 C292 300 378 352 378 470" fill="#fff" stroke="#111" strokeWidth="5" strokeLinejoin="round" />

        {/* black neck */}
        <path d="M172 246 L172 306 Q200 322 228 306 L228 246 Z" fill="#111" />

        <g className="hv2-head" style={{ transformOrigin: '200px 200px' }}>
          {/* ears */}
          <path d="M133 176 C118 172 116 198 132 204 Z" fill="#fff" stroke="#111" strokeWidth="5" strokeLinejoin="round" />
          <path d="M267 176 C282 172 284 198 268 204 Z" fill="#fff" stroke="#111" strokeWidth="5" strokeLinejoin="round" />

          {/* head */}
          <path d="M131 182 C131 120 160 96 200 96 C240 96 269 120 269 182 C269 240 243 270 200 270 C157 270 131 240 131 182 Z" fill="#fff" stroke="#111" strokeWidth="5" />

          {/* hair */}
          <path d="M137 172 C134 118 165 88 200 88 C235 88 266 118 263 172 C256 154 245 152 237 142 C230 133 222 142 213 136 C205 131 199 141 189 136 C177 130 164 133 157 147 C151 158 141 156 137 172 Z" fill="#111" />

          {/* worried eyebrows — inner ends raised */}
          <path d="M150 157 Q169 150 188 148" stroke="#111" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M212 148 Q231 150 250 157" stroke="#111" strokeWidth="6" fill="none" strokeLinecap="round" />

          {/* glasses */}
          <circle cx="168" cy="186" r="30" fill="#fff" stroke="#111" strokeWidth="5" />
          <circle cx="232" cy="186" r="30" fill="#fff" stroke="#111" strokeWidth="5" />
          <path d="M197 182 C199 176 201 176 203 182" stroke="#111" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M138 182 L127 179" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M262 182 L273 179" stroke="#111" strokeWidth="4.5" strokeLinecap="round" />

          {/* pupils (animated) */}
          <circle className="hv2-pupil" cx="168" cy="188" r="6.5" fill="#111" />
          <circle className="hv2-pupil" cx="232" cy="188" r="6.5" fill="#111" />

          {/* nose + small worried mouth (slight frown) */}
          <path d="M201 190 C199 202 195 208 204 211" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M188 234 Q200 229 212 234" stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* a hand holding a smartphone, up at the chest */}
        <g transform="rotate(-11 210 392)">
          <rect x="188" y="352" width="46" height="76" rx="11" fill="#fff" stroke="#111" strokeWidth="4.5" />
          <rect x="194" y="360" width="34" height="54" rx="5" fill="#eaeef4" />
          {/* hand cupping the bottom */}
          <path d="M176 410 C174 400 186 398 194 404 C200 400 214 400 220 406 C228 402 240 410 236 424 C233 438 217 444 202 444 C186 444 172 434 170 423 C169 417 172 412 176 410 Z" fill="#fff" stroke="#111" strokeWidth="4.5" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
