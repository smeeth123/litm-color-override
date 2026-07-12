(() => {
  const KEY = "__LITM_COLOR_FIX_STATUS_TAGS_ONLY__";
  if (globalThis[KEY]) return;
  globalThis[KEY] = true;

  const MODULE_ID = "litm-color-override";

const COLOR_SETTINGS = {
  positiveTag: {
    name: "Positive Tags",
    default: "#efd693",
    cssVar: "--litm-positive-tag-bg"
  },
  negativeTag: {
    name: "Negative Tags",
    default: "#ecba85",
    cssVar: "--litm-negative-tag-bg"
  },
  positiveStatus: {
    name: "Positive Statuses",
    default: "#bccdaf",
    cssVar: "--litm-positive-status-bg"
  },
  negativeStatus: {
    name: "Negative Statuses",
    default: "#93b07d",
    cssVar: "--litm-negative-status-bg"
  }
};

function applyColors() {
  for (const [key, cfg] of Object.entries(COLOR_SETTINGS)) {
    document.documentElement.style.setProperty(
      cfg.cssVar,
      game.settings.get(MODULE_ID, key)
    );
  }
}

  const DASH_TIER_RX = /(?:-|–|—)\s*\d+\s*$/;

  const normalize = (s) => (s || "").replace(/\s+/g, " ").trim();

  const isTieredStatusText = (rawText, normalizedText) => {
    if (DASH_TIER_RX.test(normalizedText)) return true;

    // Some UIs split the tier onto its own line; treat trailing numbers as tiers
    // only when the raw text contains a newline.
    if (/\s\d+\s*$/.test(normalizedText) && /\n/.test(rawText)) return true;

    return false;
  };

  const patchTagPill = (pill) => {
    const raw = pill.textContent || "";
    const text = normalize(raw);
    const isStatus = isTieredStatusText(raw, text);

    pill.classList.toggle("is-status", isStatus);
    pill.dataset.modType = isStatus ? "status" : "tag";
  };

  const scan = () => {
    document
      .querySelectorAll(".selected-tags-container .tag, .selected-tags .tag")
      .forEach(patchTagPill);
  };

  let scheduled = false;
  const scheduleScan = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      scan();
    });
  };

  const obs = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const n of m.addedNodes || []) {
        if (n.nodeType !== 1) continue;

        if (
          n.classList?.contains("selected-tags-container") ||
          n.classList?.contains("selected-tags") ||
          n.classList?.contains("tag") ||
          n.querySelector?.(".selected-tags-container .tag, .selected-tags .tag")
        ) {
          scheduleScan();
          return;
        }
      }
    }
  });

Hooks.once("init", () => {
  // Register the four color settings
  for (const [key, cfg] of Object.entries(COLOR_SETTINGS)) {
    game.settings.register(MODULE_ID, key, {
      name: cfg.name,
      hint: `Background color for ${cfg.name.toLowerCase()}.`,
      scope: "world",
      config: true,
      type: new foundry.data.fields.ColorField({
  required: true,
  nullable: false,
  initial: cfg.default
}),
default: cfg.default,
      onChange: applyColors
    });
  }

  // Register a "Reset Colors" checkbox
  game.settings.register(MODULE_ID, "resetDefaults", {
    name: "Reset Colors to Defaults",
    hint: "Enable to restore the default colors. The checkbox will automatically turn back off.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: async (value) => {
      if (!value) return;

      for (const [key, cfg] of Object.entries(COLOR_SETTINGS)) {
        await game.settings.set(MODULE_ID, key, cfg.default);
      }

      await game.settings.set(MODULE_ID, "resetDefaults", false);

      applyColors();
      ui.notifications.info("Legend in the Mist colors reset to defaults.");
    }
  });
});
  
Hooks.on("ready", () => {
  applyColors();

  scan();
  obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(scan, 250);
  setTimeout(scan, 1000);
});

  Hooks.on("renderApplication", () => setTimeout(scan, 0));
  Hooks.on("renderChatMessage", () => setTimeout(scan, 0));
})();
