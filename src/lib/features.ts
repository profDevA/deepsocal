// Site sections that can be switched off without deleting their code.

// The shop is hidden while DeepSoCal focuses on client work. Fas, Nov 19 2026:
// "it's a distraction for now with the clothing stuff… let's just hide it
// because I think we will need it." The pages and product data stay in the
// code. While this is false, the header, mobile menu and sitemap leave the shop
// out, and /shop and /shop/<product> redirect home (a temporary 307, so nothing
// caches it). Set it to true to bring the shop back.
export const SHOP_ENABLED = false;
