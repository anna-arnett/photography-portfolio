from pathlib import Path
from PIL import Image, ImageOps, ImageCms
import argparse
import io
import os

PHOTO_DIR = (
    Path(__file__).resolve().parents[1]
    / "public"
    / "photos"
)

MAX_DIMENSION = 2400
QUALITY = 85
MIN_FILE_SIZE = 500 * 1024

SUPPORTED_EXTENSIONS = {".jpg", ".jpeg"}


def optimize_image(path, dry_run=False):
    original_size = path.stat().st_size
    temp_path = path.with_name(path.name + ".tmp")

    try:
        with Image.open(path) as source:
            image = ImageOps.exif_transpose(source)
            original_dimensions = image.size

            if (
                max(image.size) <= MAX_DIMENSION
                and original_size <= MIN_FILE_SIZE
            ):
                return original_size, original_size, "skipped"

            # Convert embedded color profiles to sRGB.
            icc_profile = image.info.get("icc_profile")
            srgb = ImageCms.ImageCmsProfile(
                ImageCms.createProfile("sRGB")
            )

            if icc_profile:
                image = ImageCms.profileToProfile(
                    image,
                    io.BytesIO(icc_profile),
                    srgb,
                    outputMode="RGB",
                )
            else:
                image = image.convert("RGB")

            # Preserve aspect ratio without upscaling.
            image.thumbnail(
                (MAX_DIMENSION, MAX_DIMENSION),
                Image.Resampling.LANCZOS,
            )

            buffer = io.BytesIO()

            image.save(
                buffer,
                format="JPEG",
                quality=QUALITY,
                optimize=True,
                progressive=True,
                icc_profile=srgb.tobytes(),
            )

            optimized_size = buffer.tell()
            optimized_dimensions = image.size

        # Never replace an image with a larger file.
        if optimized_size >= original_size:
            return original_size, original_size, "skipped"

        if not dry_run:
            temp_path.write_bytes(buffer.getvalue())
            os.replace(temp_path, path)

        print(
            f"{path.relative_to(PHOTO_DIR)} | "
            f"{original_dimensions} -> "
            f"{optimized_dimensions} | "
            f"{original_size / 1024:.0f} KB -> "
            f"{optimized_size / 1024:.0f} KB"
        )

        return original_size, optimized_size, "optimized"

    except Exception as error:
        print(f"ERROR: {path.name}: {error}")
        return original_size, original_size, "failed"

    finally:
        if temp_path.exists():
            temp_path.unlink()


def main():
    parser = argparse.ArgumentParser()

    parser.add_argument(
        "--apply",
        action="store_true",
        help="Write optimized images to disk.",
    )

    args = parser.parse_args()
    dry_run = not args.apply

    if not PHOTO_DIR.is_dir():
        raise SystemExit(f"Missing directory: {PHOTO_DIR}")

    total_before = 0
    total_after = 0
    counts = {
        "optimized": 0,
        "skipped": 0,
        "failed": 0,
    }

    print(
        "DRY RUN: No files will be modified."
        if dry_run
        else "Optimizing images..."
    )
    print()

    for path in sorted(PHOTO_DIR.rglob("*")):
        if not path.is_file():
            continue

        if path.suffix.lower() not in SUPPORTED_EXTENSIONS:
            continue

        before, after, status = optimize_image(
            path,
            dry_run=dry_run,
        )

        total_before += before
        total_after += after
        counts[status] += 1

    savings = total_before - total_after

    print()
    print("=" * 50)
    print("IMAGE OPTIMIZATION SUMMARY")
    print("=" * 50)

    for status, count in counts.items():
        print(f"{status.capitalize()}: {count}")

    print(f"Before: {total_before / 1024**2:.1f} MB")
    print(f"After: {total_after / 1024**2:.1f} MB")
    print(f"Saved: {savings / 1024**2:.1f} MB")

    if total_before:
        print(
            f"Reduction: "
            f"{savings / total_before * 100:.1f}%"
        )


if __name__ == "__main__":
    main()