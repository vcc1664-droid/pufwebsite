/**
 * Page gutter shared by the header and every section, so content lines up with
 * the logo on the left and "Start Your Quote" on the right.
 * Figma frame is 1920px with the logo at x=163; narrower screens step down.
 */
export const CONTAINER = "mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-10 xl:px-20 2xl:px-[163px]";

/**
 * Vertical padding every section uses, plain or coloured band, so the gap from one
 * section's content to the next is always the same (2 × this value).
 */
export const SECTION_Y = "py-16 lg:py-24";

/** Bottom-only half of SECTION_Y, for blocks that continue straight on from the page intro. */
export const SECTION_BOTTOM = "pb-16 lg:pb-24";

/** Gap on both sides of a section's divider rule: heading → rule and rule → copy. */
export const RULE_GAP = "mt-8 lg:mt-[3.4cqw]";

/** Gap from a section's copy to its main visual (photo, map, grid or slider), and below it. */
export const BLOCK_GAP = "mt-12 lg:mt-[6cqw]";

/** Gap between stacked pieces inside one component (title, photo, copy, specs, button). */
export const STACK_GAP = "mt-6 lg:mt-[2.2cqw]";
