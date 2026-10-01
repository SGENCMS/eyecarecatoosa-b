# PROVENANCE

This tree is a **redesign** of `https://www.eyecarecatoosa.com/` (design B, "Aperture"), which was
then modified for public hosting. Because it was modified, **this tree is not the handoff
deliverable** and must not be cited as one. Machine-readable counts are in `PROVENANCE.json`. Every
deviation is listed below.

## Capture

| | |
| --- | --- |
| Content source | `https://www.eyecarecatoosa.com/`: 163 pages, found through the sitemap and a same-origin BFS crawl. robots.txt was honoured, no host refused a page, and the crawl was not truncated. 16 further URLs, linked from its pages (none of them in its sitemap), answer 404 on the live site. |
| Structure source | `https://eyetrendsclearlake.com/`: **navigation model and page anatomy only**, crawled in full (43 pages). No content, image, asset or word from that site appears here. |
| Captured | 2026-09-30 |
| Method | The `site-reforge` pipeline (crawl → extract → assets → capture → tokens → motion → plan → build → SEO → rebase), plus a zero-dependency Chrome DevTools Protocol bridge for the browser stages, image generation on fal.ai and Higgsfield, and ffmpeg for the video loops |
| Platform of origin | WordPress with the EyeCarePro theme, Beaver Builder and Gravity Forms. All of it has been removed. |
| Design baseline | Computed style measured in a real browser at 390 / 768 / 1024 / 1440 px, not read from source CSS |

## What the redesign changed, and what it preserved

| | |
| --- | --- |
| **Preserved** | Every rebuilt page's text (99.53% mean; 155 of 156 pages at 100%; the other one, an archive listing, is below the floor and explained in the handoff documentation; floor 95%). URLs are unchanged. Titles, meta descriptions and canonicals are unchanged too, with 2 untitled source pages given a title (`/category/our-doctors/` and `/slideshow/1802-2/`); one archive renamed “What’s New” (title and heading), its posts’ own label for it, in place of WordPress’s default category name “Uncategorized”; 1 title with a dangling separator repaired (`/website-accessibility-policy/`: “Website Accessibility Policy \|” → “Website Accessibility Policy”); 1 empty meta description filled (`/`); and 3 missing canonicals filled with the page's own address. So are all five forms (every field, label and option) and the contact details. The hours are unchanged, except that every hours table (and the home page's hours card) shows the Monday–Thursday lunch closure, which the live site states only on `/hours-location/`. The one-line hours in the top bar and the appointment band, and the location page's contact-details list, still give the hours without it (see the README's *Known limits*). |
| **Written** | No page copy. All body text comes from the live site. The only new text is interface text: menu-group labels, section labels ("Related eye care", "Office Hours", "On this page"), button labels ("Get directions") and alt text for the logo, the practice's sign, the doctor portraits and the frame-brand collages. Any fact a label touches is from the live site. |
| **Added** | 13 sections and pages, by change-control decision: Site search page; Host 404 page; home: eye care services grid; home: optical band; home: insurance band; home: testimonial; Doctor band; Related care cards; Request-an-appointment band before the footer; Page tools panel; home: children’s vision band; Generated imagery and video loops; Get directions link. The redesign also adds the live site's map to `/hours-location/` (recorded as an IMPROVE of that page's visit section). |
| **Removed** | The 509 change-control rows are 420 PRESERVE, 62 IMPROVE, 14 REMOVE, 13 ADD. Every REMOVE row belongs to the 7 source URLs that are not rebuilt (each is listed with its reason in the handoff documentation); no other section was removed or replaced. Platform plumbing is gone: the EyeCarePro / WordPress runtimes, the voice-search widget, the seasonal snow effect, the "Powered by eyecarepro" credit and the WordPress login link. |
| **Generated** | 28 still pictures and 4 silent video loops (see *Generated media* below), plus the favicon and touch icon, which the build cut from the logo's eye mark. Every other image was published on the practice's site. |

## Generated media

28 still pictures (each shipped as responsive WebP) and 4 silent loops (H.264 MP4 renditions; each loop's poster is its source still). Models: stills fal.ai · `fal-ai/nano-banana-pro` (23), Higgsfield · `xai/grok-imagine-image-2.0` (4) and Higgsfield · `higgsfield-ai/soul/v2/standard` (1); loops Higgsfield · `kling-video/v2.5-turbo/pro/image-to-video` (2), fal.ai · `blackforestlabs/flux-3/first-last-frame-to-video` (1) and Higgsfield · `minimax/hailuo-2.3/standard/image-to-video` (1).

| Still | Model | After generation |
| --- | --- | --- |
| `bokeh` | Higgsfield · `higgsfield-ai/soul/v2/standard` | nothing |
| `computer-clean` | fal.ai · `fal-ai/nano-banana-pro` | a logo-like emblem on the closed laptop lid removed from `computer` (`harmonic inpaint`, a 232 × 94 px box), because generated pictures must carry no brand marks |
| `contacts` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `eye-model` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `frames-display` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `frames-flatlay` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `glossary` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `healthy-sight` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `hero-glasses` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `insurance-forms` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `kids-band` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `lens-treatments` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `library` | Higgsfield · `xai/grok-imagine-image-2.0` | nothing |
| `photochromic` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `photochromic-2` | Higgsfield · `xai/grok-imagine-image-2.0` | nothing |
| `protect` | Higgsfield · `xai/grok-imagine-image-2.0` | nothing |
| `specialty-clean` | fal.ai · `fal-ai/nano-banana-pro` | a small logo-like emblem removed from `specialty` (`ffmpeg delogo`, a 70 × 52 px box), because generated pictures must carry no brand marks |
| `sunglasses` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `surgery` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-astig` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-disease` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-dryeye` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-emergency` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-exams` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-kids` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-presby` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `svc-tech` | fal.ai · `fal-ai/nano-banana-pro` | nothing |
| `vision-60` | Higgsfield · `xai/grok-imagine-image-2.0` | nothing |

| Loop | Made from | Model | After generation |
| --- | --- | --- | --- |
| `bokeh` | the `bokeh` still | fal.ai · `blackforestlabs/flux-3/first-last-frame-to-video` | the 8.04 s clip as generated, looping seamlessly, compressed to 1080 px and 720 px |
| `droplet` | the `svc-dryeye` still | Higgsfield · `minimax/hailuo-2.3/standard/image-to-video` | the 5.88 s clip played forward then backward (11.71 s), compressed to 720 px |
| `hero` | the `hero-glasses` still | Higgsfield · `kling-video/v2.5-turbo/pro/image-to-video` | the 5.04 s clip played forward then backward (10.04 s), compressed to 1080 px and 720 px |
| `optical` | the `frames-display` still | Higgsfield · `kling-video/v2.5-turbo/pro/image-to-video` | the 5.04 s clip played forward then backward (10.04 s), compressed to 1080 px and 720 px |

Nothing else was retouched (the 2 edits are in the table); the loops were only trimmed, looped and compressed. Each file's full prompt and request id (and its seed, where the model returns one) are recorded in its JSON record in the handoff package (`assets/generated/<name>.json`), and `docs/GENERATED-MEDIA.md` there summarises them (model, where each file is used, the first sentence of each prompt). Neither is published here.

## Deviations applied for public hosting

The "Rendered?" column says whether the change can affect what is painted on the page.

| # | Change | Pages | Rendered? |
| --- | --- | --- | --- |
| 1 | `robots` set to `noindex, nofollow, noarchive, nosnippet`. **This is the effective index control**; see #9. | 158 | No |
| 2 | `<meta name="referrer" content="no-referrer">` inserted | 158 | No |
| 3 | `<title>` **not** prefixed, by the org's standing rule. `og:description`, `noindex` and the form notices carry the disclosure instead. | — | — |
| 4 | `og:url` repointed at this preview; `og:description` and `twitter:description` replaced with the disclosure. `og:image` / `twitter:image` removed, and so is the old theme's non-standard `og:featured_image` (3 pages), so no image-bearing meta remains. | 158 | No |
| 5 | `schema.org` JSON-LD removed (470 blocks). It asserted the practice's identity, address, telephone and opening hours. | 158 | No |
| 6 | Every `<form>` marked `data-preview="inert"` (301 forms, most of them the site-search boxes, which still work). The five practice forms also get `action=""` and `onsubmit="return false"`, and each **submit button becomes a disabled `type="button"`**, so they cannot post with JavaScript off either. The handoff build's `data-js-enable` marker on those buttons (5 removed), which tells its script to enable them on load, is dropped, so they stay disabled with JavaScript on. | 301 forms | **Yes** (button shown disabled) |
| 7 | A visible notice at the top of each practice form's card — "This form is disabled in this preview", then the practice's phone number from the build's sourced config — in place of the handoff build's "Online submission is not available yet" line. Each form's empty status line under its disabled button says that the button does nothing (5 forms), and the disabled button no longer reacts to the pointer. | 5 | **Yes** |
| 8 | **No rendered disclosure banner** (the org's standing rule since 2026-09-24). The verifier fails any page that carries a banner element or its wording. The preview stylesheet, `styles/preview.css`, is linked on every page for the form notices and disabled buttons (#6, #7). | 158 | No |
| 9 | `robots.txt` replaced with `Disallow: /`. **It has no effect here**, because crawlers read only `https://sgencms.github.io/robots.txt` (the host root) and never a project subpath. GitHub Pages cannot send `X-Robots-Tag`, so non-HTML files (PDF, images, video, JSON, the markdown) have no index control. The file is kept only in case this tree is ever served from a domain root. | — | No |
| 10 | `sitemap.xml` and `llms.txt` not shipped, because both advertise the practice's real URLs. `_headers` and `_redirects` are Netlify-only and GitHub Pages ignores them. | — | No |
| 11 | `404.html` references made absolute under `/eyecarecatoosa-b/`. GitHub Pages answers a missing path at any depth with it, so it is the one page that cannot use relative references. Its video-loop sources are left as they are: the site script resolves them against its own (now absolute) address, not the page's. | 1 | Yes |
| 12 | `.nojekyll` added | — | No |
| 13 | The map embed on `/hours-location/`, `/` and `/location/practice-location-1/` switched from the Maps Embed API (which carries a Google API key) to Google's keyless embed of the same sourced address, with `referrerpolicy="no-referrer"`. See *The map key*. | 3 | **Yes** |
| 14 | Line endings normalised to LF (0 pages needed it). The repository's `.gitattributes` would make git do this on commit anyway, and an HTML parser treats both forms the same. Doing it here means the bytes verified are the bytes published. | 0 | No |

### The map key

The live site embeds its map as `maps/embed/v1/place?key=AIza…&q=place_id:…`. The key is public on
the live site, and Maps Embed keys are designed to be shipped to browsers. It is still left out of
this repository: a Google API key pushed to a public GitHub repository is picked up by GitHub secret
scanning and reported to Google, which notifies the key's owner, and publishing this preview should
not raise a credential-leak alert against a third party.

The keyless embed shows "Eyecare of Catoosa Hills, 650 S. Cherokee St., Suite A, Catoosa, OK 74015". Screenshotted next to the keyed embed (2026-09-30), both drop the pin labelled *Eyecare of Catoosa* at the same spot. Every part of that address string comes from
the sourced `PRACTICE` config. The handoff build keeps the live site's keyed embed URL on every map page, including any the redesign added.

## Deliberately NOT changed

| | Why |
| --- | --- |
| `<link rel="canonical">` → the practice's own URL, on every page | Correct for a duplicate, and deliberately different from `og:url`, which drives unfurl cards. The two pages the build makes itself (`/404.html` and `/search/`) have no live counterpart, so their canonicals name addresses the live site does not have; like every page here they are `noindex`. |
| The live site's other internal contradictions (the name's four spellings, a placeholder in the privacy notice) | These are the practice's own words, so choosing between them is the practice's call. All of them, and the lunch closure the rebuild adds to every hours table (see *Preserved*), are listed in the handoff `CHANGE-LOG.md`. |
| `site.css`, `tokens.css`, `motion.css`, `scripts/site.js`, the video loops and every other non-HTML file except the named preview additions | Byte-identical to the handoff build; `preview-verify.mjs` compares them. The notice and disabled-button styles live only in `preview.css`. The loops therefore behave exactly as in the handoff build, with no pause control (see the README's *Known limits*). |

## Not published here

These are **not** in this repository:

- The `audit/` tree: the raw capture of the practice's site, computed-style captures,
  screenshots and reports. It is bulky, it carries absolute build paths from the capture machine,
  and a preview has no use for a full raw copy of the practice's site.
- `src/`, the generator and tools, and `docs/`, the handoff documentation (including
  `GENERATED-MEDIA.md`, the summary of the generated media).
- `assets/source/`, the original downloads, and `assets/generated/`: the full-size generated
  originals, each with its JSON record (full prompt, request id, and seed where the model returns
  one), and the model comparisons.

All of them belong to the handoff package.

## Verification after modification

Every figure below was re-read by `src/tools/preview-verify.mjs` (in the handoff project) from this
tree and from a browser rendering of it. None was taken from the tool that wrote them.

- **Hardening**: 158/158 pages carry exactly one robots meta reading `noindex, nofollow, noarchive, nosnippet`. On every page:
  - the referrer is set;
  - there is no JSON-LD;
  - there is no disclosure banner (its element and its wording are both absent), and the preview stylesheet is linked;
  - the canonical is still the practice's own;
  - `og:url` is this preview and `og:description` is the disclosure;
  - there is no image-bearing meta (`og:image`, `twitter:image`, `og:featured_image`, `image_src`);
  - there are no CR bytes;
  - there is exactly one `<h1>`.

  Other hardening results:
  - 3 iframes carry the permitted referrer policy.
  - 301/301 forms are inert.
  - All 5 practice forms have `action=""`, `onsubmit="return false"`, an empty `data-endpoint` and **no submit control** (5/5), each with its notice (5), and none keeps the handoff build's offline notice ("Online submission is not available yet", `data-form-offline`) or a `data-js-enable` control (5/5 clean). Each has the preview's status line under its disabled button (5/5).
  - No title carries a prefix, and none of the 316 `og:title` / `twitter:title` values is empty.
- **Pages not rebuilt**: every shipped text file was searched for the addresses and titles of the 7 source URLs that were not rebuilt (13 markers). There were 0 hits.
- **Byte identity**: 214 non-HTML files are byte-identical to the handoff build. The only others are the named preview additions: `.gitattributes`, `.gitignore`, `.nojekyll`, `PROVENANCE.json`, `PROVENANCE.md`, `README.md`, `robots.txt`, `styles/preview.css`.
- **Secrets**: 171 text files, this one included, were scanned for credential-shaped strings (Google API keys, GitHub, OpenAI, Slack and AWS tokens, private keys) and for build-machine paths and local server addresses. There were 0 hits.
  - The 209 binary files (1 PDF, 195 WEBP, 2 PNG, 7 MP4, 4 WOFF2) were opened too. Their container metadata was checked against an allowlist: no EXIF, XMP, C2PA or text chunks in the images, no `uuid` boxes or metadata items beyond the encoder tag in the videos, no metadata blocks in the fonts, no active content in the PDF. Their printable strings, decompressed streams included, went through the same patterns. 0 problems, 0 hits. The video files name their encoder (ffmpeg / x264 and its settings), and the PDF names the software that made it; nothing identifies a person or a machine.
- **Reference audit**: 30,514 local references (22,539 href, 2,834 src, 296 action, 4,520 srcset, 321 data-loop, 4 css url()) were resolved against the file that carries each one, except the video-loop sources, which the site script resolves against the site root and were checked from there.
  - 0 escape the site root, 0 point at a missing file, and 0 are root-relative.
  - The exception is `404.html`, whose 172 references are all absolute under `/eyecarecatoosa-b/` by design.
- **Rendering at the preview's subpath** (served exactly as GitHub Pages serves a project site: only under /eyecarecatoosa-b/, a missing path answered by 404.html):
  - Every page except `404.html` (tested at depth below) was loaded in headless Chrome at 1440 and 390 px (314 loads), with lazy images forced to load.
  - The result was 0 responses ≥ 400, 0 broken images, 0 console errors, 0 same-site requests outside the prefix, 0 horizontal overflow at 390, and no banner on any load (each page rendered at least 200 characters of text for that absence to be read from).
  - Third parties: every child target (the map frames included) was attached and its network watched. Off-site requests came only from inside the map frame on the 3 map pages, to `fonts.googleapis.com`, `fonts.gstatic.com`, `maps.google.com`, `maps.googleapis.com`, `maps.gstatic.com`, `places.googleapis.com` and `www.google.com` (21 of them POST). The page itself contacted no third party, and no other page contacted any.
  - Chrome cancelled no request.
- **404 at depth**: `no-such-page/`, `a/b/c/d/no-such-page`, `eye-care-services/nope/` each returned 404 and rendered the styled page with no banner, 0 failed subresources and 0 broken images.
- **Search**: `/search/?q=dry eye` returned 10 results at the subpath, all inside `/eyecarecatoosa-b/`. The first one opens (HTTP 200).
- **Video loops**: every distinct loop was played in the browser: on the home page (HTTP 200), `hero`, `optical` and `bokeh`; on `/your-eye-health/eye-conditions/` (HTTP 200), `droplet` and `bokeh`; on a 404 served at depth (`/a/b/c/no-such-loop-page`) (HTTP 404), `bokeh`. Each loop was scrolled into view; the video the site script builds for it (inside a shadow root) loaded from inside `/eyecarecatoosa-b/`, its playback time advanced, and it had no controls.
- **Practice forms, JavaScript on**: on the appointment and registration forms a submit was cancelled, the page did not navigate, 0 requests were sent, the notice was present, and the disabled button was still disabled after the site script had run. With the pointer over it, the button's fill, border and arrow did not change (rgb(242, 179, 61) → rgb(242, 179, 61); rgb(242, 179, 61) → rgb(242, 179, 61)).
- **Practice forms, JavaScript off**: on the same two forms, Enter in a text field and a click that landed on the button (hit-tested) produced 0 and 0 non-GET requests, and the page stayed put.
  - Positive control: the same button was re-armed through the DevTools protocol, with no page script, and clicked again. Each form's click was **caught** submitting (POST /eyecarecatoosa-b/contact-us/appointment-request-form/; POST /eyecarecatoosa-b/contact-us/patient-registration-form/), which proves the test can see a submission.
  - Every non-GET request was failed locally, so none left the machine. The other three forms carry the same neutralisation (empty action, `onsubmit`, empty `data-endpoint`, no submit control, a disabled button), checked on each form's shipped markup above.
- **Nothing covers a control**: hit-tested at each control's centre, the focused skip link is topmost at 390 px and 1440 px, and the open mobile drawer's close button is topmost at 390 px.
- **Tree**: `sitemap.xml`, `llms.txt`, `_headers`, `_redirects`, `audit/` and `src/` are absent. `.nojekyll` is present. `robots.txt` reads `Disallow: /`, which has no effect at this subpath (deviation #9).
- **After this file was written**, `preview-docs.mjs` re-ran the static checks (tree, byte identity, secrets, hardening, references) over the finished tree, including README.md, PROVENANCE.md and PROVENANCE.json. It would have refused to finish unless they passed.
