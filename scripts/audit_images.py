from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
PHOTOS = PUBLIC / "photos"

SOURCE_DIRS = [
    ROOT / "app",
    ROOT / "components",
]

SOURCE_EXTENSIONS = {
    ".tsx", ".ts", ".jsx", ".js", ".css", ".json"
}

IMAGE_EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp",
    ".avif", ".gif", ".svg"
}

# Collect actual image paths with exact capitalization.
actual_images = {
    "/" + path.relative_to(PUBLIC).as_posix()
    for path in PHOTOS.rglob("*")
    if path.is_file()
    and path.suffix.lower() in IMAGE_EXTENSIONS
}

case_insensitive = {}

for path in sorted(actual_images):
    case_insensitive.setdefault(path.lower(), []).append(path)

pattern = re.compile(
    r"""(/photos/[^"'`\n()]+?\.(?:jpe?g|png|webp|avif|gif|svg))""",
    re.IGNORECASE,
)

references = set()
missing = []
case_mismatches = []
ambiguous = []
valid = 0

for directory in SOURCE_DIRS:
    for file in sorted(directory.rglob("*")):
        if not file.is_file():
            continue

        if file.suffix not in SOURCE_EXTENSIONS:
            continue

        content = file.read_text(
            encoding="utf-8",
            errors="replace",
        )

        for match in pattern.finditer(content):
            reference = match.group(1)
            references.add(reference)

            line = content.count("\n", 0, match.start()) + 1
            source = f"{file.relative_to(ROOT)}:{line}"

            if reference in actual_images:
                valid += 1

            elif reference.lower() in case_insensitive:
                candidates = case_insensitive[reference.lower()]

                if len(candidates) == 1:
                    case_mismatches.append(
                        (source, reference, candidates[0])
                    )
                else:
                    ambiguous.append(
                        (source, reference, candidates)
                    )

            else:
                missing.append((source, reference))

referenced_lower = {
    reference.lower() for reference in references
}

potentially_unused = sorted(
    path for path in actual_images
    if path.lower() not in referenced_lower
)

print("\n=== CAPITALIZATION MISMATCHES ===\n")

for source, reference, actual in case_mismatches:
    print(source)
    print(f"  Referenced: {reference}")
    print(f"  Actual:     {actual}\n")

print("\n=== MISSING IMAGES ===\n")

for source, reference in missing:
    print(source)
    print(f"  Missing: {reference}\n")

print("\n=== AMBIGUOUS CASE MATCHES ===\n")

for source, reference, candidates in ambiguous:
    print(source)
    print(f"  Referenced: {reference}")
    print(f"  Candidates: {candidates}\n")

print("\n=== POTENTIALLY UNUSED IMAGES ===\n")

for path in potentially_unused:
    print(path)

print("\n" + "=" * 50)
print("IMAGE AUDIT SUMMARY")
print("=" * 50)

print(f"Total image files: {len(actual_images)}")
print(f"Unique referenced paths: {len(references)}")
print(f"Valid references: {valid}")
print(f"Capitalization mismatches: {len(case_mismatches)}")
print(f"Missing images: {len(missing)}")
print(f"Ambiguous case matches: {len(ambiguous)}")
print(f"Potentially unused images: {len(potentially_unused)}")