"""Generate the OG preview image for the portfolio.

1200x630 navy background with gold accent line, name, role, and stack line.
Matches the live theme: --bg #0a192f, --primary #FFD700, --lightest-slate #ccd6f6.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

# Theme tokens (must match src/scss/_variables.scss)
NAVY = (10, 25, 47)            # #0a192f
NAVY_LIGHT = (17, 34, 64)      # #112240
GOLD = (255, 215, 0)           # #FFD700
LIGHTEST_SLATE = (204, 214, 246)  # #ccd6f6
LIGHT_SLATE = (136, 146, 176)  # #8892b0
GOLD_DIM = (255, 215, 0, 35)   # gold with low alpha

W, H = 1200, 630

# Find a usable font. Latin Modern Roman is installed for the resume, prefer that.
FONT_CANDIDATES = [
    Path.home() / ".local/share/fonts/latin-modern/lmroman10-bold.otf",
    Path.home() / ".local/share/fonts/latin-modern/lmroman10-regular.otf",
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
    Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
]


def find_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = []
    for path in FONT_CANDIDATES:
        if not path.exists():
            continue
        name = path.name.lower()
        is_bold = "bold" in name
        if bold and not is_bold:
            candidates.append((1, path))  # second-choice
        elif not bold and is_bold:
            candidates.append((1, path))
        else:
            candidates.append((0, path))
    candidates.sort()
    if not candidates:
        return ImageFont.load_default()
    return ImageFont.truetype(str(candidates[0][1]), size)


def main():
    # Base canvas — solid navy, no problematic glow overlay
    img = Image.new("RGBA", (W, H), (*NAVY, 255))

    # Decorative gold star outline in upper-right (echoes the hero logo)
    star_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    star_draw = ImageDraw.Draw(star_layer)
    # 5-point star points around (W - 150, 130) at radius 75
    import math
    cx, cy, r_outer, r_inner = W - 160, 130, 90, 38
    pts = []
    for i in range(10):
        angle = -math.pi / 2 + i * math.pi / 5
        r = r_outer if i % 2 == 0 else r_inner
        pts.append((cx + r * math.cos(angle), cy + r * math.sin(angle)))
    star_draw.polygon(pts, outline=(*GOLD, 80), width=3)
    img = Image.alpha_composite(img, star_layer)

    img = img.convert("RGB")
    draw = ImageDraw.Draw(img)

    # Left gold accent bar (vertical)
    draw.rectangle([72, 168, 80, 462], fill=GOLD)

    # Section tag (tiny gold uppercase pre-label, mimics .sectiontag)
    tag_font = find_font(22, bold=True)
    draw.text((110, 168), "PORTFOLIO · 2026", font=tag_font, fill=GOLD)

    # Name — biggest text
    name_font = find_font(96, bold=True)
    draw.text((110, 210), "Thomas Reese", font=name_font, fill=LIGHTEST_SLATE)

    # Role — gold accent
    role_font = find_font(54, bold=True)
    draw.text((110, 332), "Full-Stack AI Engineer", font=role_font, fill=GOLD)

    # Subline — company + stack
    sub_font = find_font(28)
    draw.text(
        (110, 408),
        "Production AI at Envoy — RAG · MCP · Claude Agents",
        font=sub_font,
        fill=LIGHTEST_SLATE,
    )

    # Stack chips line
    chip_font = find_font(22)
    chips = "TypeScript · React 19 · Python · AWS Bedrock · Anthropic Claude"
    draw.text((110, 452), chips, font=chip_font, fill=LIGHT_SLATE)

    # URL line at the bottom
    url_font = find_font(22, bold=True)
    draw.text(
        (110, 540),
        "thomas-2024-portfolio-website-4g9e.vercel.app",
        font=url_font,
        fill=GOLD,
    )

    # Top-right corner — "open to roles" pill with proper sizing
    pill_font = find_font(22, bold=True)
    pill_text = "Open to senior roles"
    # Measure text using getlength (more accurate for vertical metrics)
    bbox = draw.textbbox((0, 0), pill_text, font=pill_font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    dot_d = 12
    dot_gap = 10
    pad_x, pad_y = 22, 14
    pill_w = pad_x * 2 + dot_d + dot_gap + text_w
    pill_h = pad_y * 2 + max(text_h, dot_d)
    px = W - 72 - pill_w
    py = 72
    draw.rounded_rectangle(
        [px, py, px + pill_w, py + pill_h],
        radius=int(pill_h / 2),
        outline=GOLD,
        width=2,
    )
    # Gold dot (vertically centered in pill)
    dot_x = px + pad_x
    dot_y = py + (pill_h - dot_d) // 2
    draw.ellipse([dot_x, dot_y, dot_x + dot_d, dot_y + dot_d], fill=GOLD)
    # Text (baseline-aligned with pill center)
    text_x = dot_x + dot_d + dot_gap
    text_y = py + (pill_h - text_h) // 2 - bbox[1]
    draw.text((text_x, text_y), pill_text, font=pill_font, fill=GOLD)

    out = Path(__file__).resolve().parent.parent / "public" / "og-preview.png"
    img.save(out, "PNG", optimize=True)
    print(f"Wrote {out} ({out.stat().st_size:,} bytes, {W}x{H})")


if __name__ == "__main__":
    main()
