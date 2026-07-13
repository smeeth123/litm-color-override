/* Legend in the Mist - Color Override

   Configurable colors:
   - Positive Tags
   - Negative Tags and Weakness Tags
   - Positive Statuses
   - Negative Statuses
   - Limits

   Configure colors in Foundry's Module Settings.
*/

:root {
  --litm-positive-tag-bg: #efd693;
  --litm-negative-tag-bg: #ecba85;
  --litm-positive-status-bg: #bccdaf;
  --litm-negative-status-bg: #93b07d;
  --litm-limit-bg: #d0a08d;
}

/* Keep the system's own default color variables aligned with this module. */
body {
  --litm-color-tag-bg: var(--litm-positive-tag-bg);
  --litm-color-status-bg: var(--litm-positive-status-bg);
}

/* Positive and otherwise unclassified tags. */
.tag.positive:not(.status):not(.is-status),
.mist-engine .tag.positive:not(.status):not(.is-status),
.journal-entry-content .tag.positive:not(.status):not(.is-status),
.message-content .selected-tags .tag.positive:not(.status):not(.is-status),
.roll-dialog-container .selected-tags-container .tag.positive:not(.status):not(.is-status),
.character-container .selected-tags-container .tag.positive:not(.status):not(.is-status),
.mist-engine .fts-input-name.tag.positive:not(.status),
.mist-engine .npc-tag:not(.negative):not(.weakness),
.mist-engine [class*="challenge"] .tag:not(.negative):not(.weakness):not(.status):not(.is-status),
.mist-engine [data-document-name*="Challenge"] .tag:not(.negative):not(.weakness):not(.status):not(.is-status),
.mist-engine [data-type*="challenge"] .tag:not(.negative):not(.weakness):not(.status):not(.is-status) {
  background: var(--litm-positive-tag-bg) !important;
  background-image: none !important;
}

/* Negative tags and weakness tags intentionally share one setting. */
.tag.negative:not(.status):not(.is-status),
.mist-engine .tag.negative:not(.status):not(.is-status),
.journal-entry-content .tag.negative:not(.status):not(.is-status),
.message-content .selected-tags .tag.negative:not(.status):not(.is-status),
.roll-dialog-container .selected-tags-container .tag.negative:not(.status):not(.is-status),
.character-container .selected-tags-container .tag.negative:not(.status):not(.is-status),
.mist-engine .fts-input-name.tag.negative:not(.status),
.tag.weakness,
mark.tag.weakness,
.mist-engine .tag.weakness,
.scene-weakness-tag {
  background: var(--litm-negative-tag-bg) !important;
  background-image: none !important;
}

/* Positive statuses, including status pills with no explicit valence. */
.status.positive,
.status:not(.negative),
.mist-engine .status.positive,
.mist-engine .status:not(.negative),
.journal-entry-content .status.positive,
.journal-entry-content .status:not(.negative),
.mist-engine .fts-input-name.status.positive,
.mist-engine .fts-input-name.status:not(.negative),
.mist-engine .npc-tag-status-value:not(.negative),
.mist-engine mark.green:not(.negative),
.selected-tags-container .tag.is-status:not(.negative),
.selected-tags-container .tag[data-mod-type="status"]:not(.negative),
.message-content .selected-tags .tag.is-status:not(.negative),
.message-content .selected-tags .tag[data-mod-type="status"]:not(.negative) {
  background: var(--litm-positive-status-bg) !important;
  background-image: none !important;
}

/* Negative statuses in sheets, chat cards, roll dialogs, and Scene Tags. */
.status.negative,
.mist-engine .status.negative,
.journal-entry-content .status.negative,
.mist-engine .fts-input-name.status.negative,
.selected-tags-container .tag.is-status.negative,
.selected-tags-container .tag[data-mod-type="status"].negative,
.message-content .selected-tags .tag.is-status.negative,
.message-content .selected-tags .tag[data-mod-type="status"].negative,
.roll-dialog-container .selected-tags-container .selected-tag.tag.is-status.negative,
.roll-dialog-container .selected-tags-container .selected-tag.tag[data-mod-type="status"].negative,
.character-container .selected-tags-container .tag.is-status.negative,
.character-container .selected-tags-container .tag[data-mod-type="status"].negative {
  background: var(--litm-negative-status-bg) !important;
  background-image: none !important;
}

/* Limits. */
.limit,
mark.limit,
.mist-engine .limit,
.mist-engine mark.limit {
  background: var(--litm-limit-bg) !important;
  background-image: none !important;
}

/* NPC descriptions. */
.mist-engine .npc-limit-description .tag:not(.negative):not(.weakness):not(.status):not(.is-status) {
  background: var(--litm-positive-tag-bg) !important;
  background-image: none !important;
}

.mist-engine .npc-limit-description .tag.negative,
.mist-engine .npc-limit-description .tag.weakness {
  background: var(--litm-negative-tag-bg) !important;
  background-image: none !important;
}

.mist-engine .npc-limit-description .status:not(.negative) {
  background: var(--litm-positive-status-bg) !important;
  background-image: none !important;
}

.mist-engine .npc-limit-description .status.negative {
  background: var(--litm-negative-status-bg) !important;
  background-image: none !important;
}

/* Dark tooltips inherit white text, so only their inline pills need a text fix. */
aside[role="tooltip"].theme-dark mark.tag,
aside[role="tooltip"].theme-dark mark.status,
aside[role="tooltip"].theme-dark mark.limit {
  color: #000 !important;
}

aside[role="tooltip"].theme-dark mark.tag:not(.negative):not(.weakness):not(.status) {
  background: var(--litm-positive-tag-bg) !important;
  background-image: none !important;
}

aside[role="tooltip"].theme-dark mark.tag.negative,
aside[role="tooltip"].theme-dark mark.tag.weakness {
  background: var(--litm-negative-tag-bg) !important;
  background-image: none !important;
}

aside[role="tooltip"].theme-dark mark.status:not(.negative) {
  background: var(--litm-positive-status-bg) !important;
  background-image: none !important;
}

aside[role="tooltip"].theme-dark mark.status.negative {
  background: var(--litm-negative-status-bg) !important;
  background-image: none !important;
}

aside[role="tooltip"].theme-dark mark.limit {
  background: var(--litm-limit-bg) !important;
  background-image: none !important;
}

/* Selection dialogs: black text and a single solid configured background. */
.tag-container mark.tag,
.tag-container mark.status,
.tag-container mark.limit {
  color: #000 !important;
}

.tag-container mark.tag:not(.negative):not(.weakness):not(.status):not(.is-status) {
  background: var(--litm-positive-tag-bg) !important;
  background-image: none !important;
}

.tag-container mark.tag.negative:not(.status):not(.is-status),
.tag-container mark.tag.weakness {
  background: var(--litm-negative-tag-bg) !important;
  background-image: none !important;
}

.tag-container mark.status:not(.negative),
.tag-container mark.tag.is-status:not(.negative),
.tag-container mark.tag[data-mod-type="status"]:not(.negative) {
  background: var(--litm-positive-status-bg) !important;
  background-image: none !important;
}

.tag-container mark.status.negative,
.tag-container mark.tag.is-status.negative,
.tag-container mark.tag[data-mod-type="status"].negative {
  background: var(--litm-negative-status-bg) !important;
  background-image: none !important;
}

.tag-container mark.limit {
  background: var(--litm-limit-bg) !important;
  background-image: none !important;
}
