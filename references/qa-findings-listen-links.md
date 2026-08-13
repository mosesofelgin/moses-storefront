# QA Findings — Listen Gate and Link Tree

**Reviewed routes:** `/listen`, `/links` on the active dev preview  
**Review date:** 2026-08-13

## Listen
The Listen route shows a full-screen email gate before the player and tracklist. The gate copy is clear, the email field is visible, and the primary action is prominent. The underlying page markdown confirms the player content is present in the route but the gate is visually covering it before submission. This preserves the requested listen-only email barrier.

## Links
The Links route remains email-free. It has a branded profile header, a primary THE VAULT card, three video cards with the correct YouTube titles and links, and the social handles supplied by the artist: Instagram `@moses_sog`, YouTube `@MosesSOG`, TikTok `@mosessog`, Twitter/X `sogmoses`, and Twitch `@mosessog`.

The link tree is compact on mobile, tap targets are large enough for event use, and no extra newsletter form is present. The current global navigation is still visible above the compact link-tree content; this may be an intentional site-wide shell, but a final review should consider whether `/links` should use an even more focused no-nav presentation for social bio traffic.
