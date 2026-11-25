
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

layout_path = ROOT / "app/layout.tsx"
privacy_path = ROOT / "app/privacy/page.tsx"

layout = layout_path.read_text(encoding="utf-8")
privacy = privacy_path.read_text(encoding="utf-8")


def replace_once(content, old, new):
    if content.count(old) != 1:
        raise RuntimeError(
            f"Expected exactly one occurrence of:\n{old}"
        )
    return content.replace(old, new, 1)


# --------------------------------------------------
# 1. Install Cloudflare Web Analytics
# --------------------------------------------------

if "static.cloudflareinsights.com/beacon.min.js" in layout:
    raise RuntimeError("Cloudflare analytics already installed.")

layout = replace_once(
    layout,
    'import Link from "next/link";',
    'import Link from "next/link";\n'
    'import Script from "next/script";',
)

layout = replace_once(
    layout,
    "      </body>",
    '''        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          type="module"
          strategy="afterInteractive"
          data-cf-beacon='{"token":"eb443dddcb31452caf1014590a06ac69"}'
        />
      </body>''',
)


# --------------------------------------------------
# 2. Update privacy policy
# --------------------------------------------------

privacy = replace_once(
    privacy,
    "Last updated November 24, 2026",
    "Last updated November 25, 2026",
)

privacy = replace_once(
    privacy,
    '''              This website relies on third-party
              providers to deliver email, host the
              website, and maintain security.''',
    '''              This website relies on third-party
              providers for hosting, email delivery,
              security, and website analytics.''',
)

privacy = replace_once(
    privacy,
    '''            <ul>
              <li>
                <a
                  href="https://resend.com/legal/privacy-policy"''',
    '''            <ul>
              <li>
                <a
                  href="https://www.netlify.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Netlify
                </a>
                {" — "}
                hosts the website and processes
                technical information necessary
                to deliver and operate it.
              </li>

              <li>
                <a
                  href="https://resend.com/legal/privacy-policy"''',
)

privacy = replace_once(
    privacy,
    "helps prevent spam and automated abuse.",
    '''provides Turnstile to help prevent spam
                and automated abuse, as well as
                privacy-focused website analytics.''',
)

privacy = replace_once(
    privacy,
    '''              This website may use privacy-focused
              analytics to understand website traffic
              and performance. These insights help
              improve the website and understand
              which pages visitors find useful.''',
    '''              This website uses Cloudflare Web
              Analytics to understand website traffic
              and performance, including page visits,
              referral sources, browser and device
              information, and approximate geographic
              information.

              These insights help improve the website
              and understand which pages visitors
              find useful.''',
)

privacy = replace_once(
    privacy,
    '''              I do not use advertising trackers or
              analytics designed to build individual
              advertising profiles.''',
    '''              Cloudflare Web Analytics does not
              rely on cookies or local storage to
              track individual visitors.

              I do not use advertising trackers or
              analytics designed to build individual
              advertising profiles.''',
)

privacy = replace_once(
    privacy,
    '''              please reach out through my{" "}
              <Link href="/inquire">
                inquiry page
              </Link>.''',
    '''              please contact me at{" "}
              <a href="mailto:annaarnettphoto@gmail.com">
                annaarnettphoto@gmail.com
              </a>
              {" "}or through my{" "}
              <Link href="/inquire">
                inquiry page
              </Link>.''',
)


# --------------------------------------------------
# 3. Save changes
# --------------------------------------------------

layout_path.write_text(layout, encoding="utf-8")
privacy_path.write_text(privacy, encoding="utf-8")

print("Successfully updated:")
print("  app/layout.tsx")
print("  app/privacy/page.tsx")
print()
print("Cloudflare Web Analytics installed.")
print("Privacy policy updated.")
print()
print("Next: run npm run build")
