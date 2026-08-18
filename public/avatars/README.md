# Persona avatars (Problem / Solution cards)

Save the 6 memoji images here with these exact names:

**Problem cards**
- `problem-user-1.png` — Priya Nair (cap)
- `problem-user-2.png` — Meera Joshi (glasses, thumbs-down)
- `problem-user-3.png` — Arjun Rao (man, glasses, thumbs-down)

**Solution cards**
- `solution-user-1.png` — Sara Lee (thumbs-up)
- `solution-user-2.png` — Emma Cole (winking)
- `solution-user-3.png` — Lily Brooks (peace sign)

They're referenced from `src/pages/ProjectDetail.jsx` as `/avatars/<name>.png`.
Square images (e.g. 200×200) look best in the round avatar. Until a file
exists the card shows a neutral grey circle (the name still appears).
