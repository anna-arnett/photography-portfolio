from pathlib import Path
import re
import argparse

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

parser = argparse.ArgumentParser()

parser.add_argument(
    "--apply",
    action="store_true",
    help="Apply corrections to source files.",
)

args = parser.parse_args()

actual_images = {
    "/" + path.relative_to(PUBLIC).as_posix()
    for path in PHOTOS.rglob("*")
    if path.is_file()
    and path.suffix.lower() in IMAGE_EXTENSIONS
}

case_insensitive = {}

for path in sorted(actual_images):
    case_insensitive.setdefault(
        path.lower(), []
    ).append(path)

pattern = re.compile(
    r"""(/photos/[^"'`\n()]+?\.(?:jpe?g|png|webp|avif|gif|svg))""",
    re.IGNORECASE,
)

corrections = []
missing = []
ambiguous = []
modified_files = []

print(
    "APPLY MODE: Correcting image paths."
    if args.apply
    else "DRY RUN: No files will be modified."
)

for directory in SOURCE_DIRS:
    for file in sorted(directory.rglob("*")):
        if not file.is_file():
            continue

        if file.suffix not in SOURCE_EXTENSIONS:
            continue

        content = file.read_text(encoding="utf-8")

        def fix_reference(match):
            reference = match.group(1)

            line = content.count(
                "\n", 0, match.start()
            ) + 1

            source = (
                f"{file.relative_to(ROOT)}:{line}"
            )

            if reference in actual_images:
                return reference

            candidates = case_insensitive.get(
                reference.lower(), []
            )

            if len(candidates) == 1:
                corrected = candidates[0]

                corrections.append(
                    (source, reference, corrected)
                )

                return corrected

            if len(candidates) > 1:
                ambiguous.append(
                    (source, reference, candidates)
                )
            else:
                missing.append((source, reference))

            return reference

        updated_content = pattern.sub(
            fix_reference, content
        )

        if updated_content != content:
            modified_files.append(
                file.relative_to(ROOT)
            )

            if args.apply:
                file.write_text(
                    updated_content,
                    encoding="utf-8",
                )

print("\n=== CAPITALIZATION CORRECTIONS ===\n")

for source, old, new in corrections:
    print(source)
    print(f"  Before: {old}")
    print(f"  After:  {new}\n")

print("\n=== MISSING IMAGES ===\n")

for source, reference in missing:
    print(source)
    print(f"  Missing: {reference}\n")

print("\n=== AMBIGUOUS MATCHES ===\n")

for source, reference, candidates in ambiguous:
    print(source)
    print(f"  Reference: {reference}")
    print(f"  Candidates: {candidates}\n")

print("\n=== AFFECTED FILES ===\n")

for file in modified_files:
    print(file)

print("\n" + "=" * 50)
print("CORRECTION SUMMARY")
print("=" * 50)

print(f"Path corrections: {len(corrections)}")
print(f"Affected source files: {len(modified_files)}")
print(f"Missing images: {len(missing)}")
print(f"Ambiguous matches: {len(ambiguous)}")

if not args.apply:
    print("\nNo files were modified.")
    print("Run with --apply to make corrections.")
else:
    print("\nCorrections applied.")