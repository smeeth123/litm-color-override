(() => {
  "use strict";

  const MODULE_ID = "litm-color-override";
  const INITIALIZED_KEY = "__LITM_COLOR_OVERRIDE_INITIALIZED__";

  if (globalThis[INITIALIZED_KEY]) return;
  globalThis[INITIALIZED_KEY] = true;

  const COLOR_SETTINGS = {
    positiveTag: {
      name: "Positive Tags",
      hint: "Background color used for positive tags.",
      default: "#efd693",
      cssVar: "--litm-positive-tag-bg"
    },
    negativeTag: {
      name: "Negative Tags and Weakness Tags",
      hint: "Background color used for negative tags and weakness tags.",
      default: "#ecba85",
      cssVar: "--litm-negative-tag-bg"
    },
    positiveStatus: {
      name: "Positive Statuses",
      hint: "Background color used for positive statuses.",
      default: "#bccdaf",
      cssVar: "--litm-positive-status-bg"
    },
    negativeStatus: {
      name: "Negative Statuses",
      hint: "Background color used for negative statuses.",
      default: "#93b07d",
      cssVar: "--litm-negative-status-bg"
    },
    limit: {
      name: "Limits",
      hint: "Background color used for limits.",
      default: "#d0a08d",
      cssVar: "--litm-limit-bg"
    }
  };

  function applyColors() {
    if (!globalThis.game?.settings) return;

    const root = document.documentElement;

    for (const [key, config] of Object.entries(COLOR_SETTINGS)) {
      let color = config.default;

      try {
        color = game.settings.get(MODULE_ID, key) || config.default;
      } catch (error) {
        console.warn(`${MODULE_ID} | Could not read setting ${key}; using its default.`, error);
      }

      root.style.setProperty(config.cssVar, color);
    }
  }

  Hooks.once("init", () => {
    const { ColorField } = foundry.data.fields;

    for (const [key, config] of Object.entries(COLOR_SETTINGS)) {
      game.settings.register(MODULE_ID, key, {
        name: config.name,
        hint: config.hint,
        scope: "world",
        config: true,
        type: new ColorField({
          required: true,
          nullable: false,
          initial: config.default
        }),
        default: config.default,
        onChange: applyColors
      });
    }

    game.settings.register(MODULE_ID, "resetDefaults", {
      name: "Reset Colors to Defaults",
      hint: "Enable this setting to restore all five default colors. It automatically turns itself off after resetting.",
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      onChange: async (resetRequested) => {
        if (!resetRequested) return;

        try {
          for (const [key, config] of Object.entries(COLOR_SETTINGS)) {
            await game.settings.set(MODULE_ID, key, config.default);
          }

          await game.settings.set(MODULE_ID, "resetDefaults", false);
          applyColors();
          ui.notifications.info("Legend in the Mist colors reset to defaults.");
        } catch (error) {
          console.error(`${MODULE_ID} | Failed to reset colors.`, error);
          ui.notifications.error("Unable to reset the Legend in the Mist colors.");
        }
      }
    });
  });

  // Some selected statuses are rendered with the system's generic .tag class.
  // Mark those pills with .is-status so the stylesheet can color them correctly.
  const TIER_SUFFIX = /(?:-|\u2013|\u2014)\s*\d+\s*$/;
  const SELECTED_PILL_SELECTOR = [
    ".selected-tags-container .tag",
    ".selected-tags .tag"
  ].join(", ");

  function hasTieredStatusText(element) {
    const rawText = element.textContent || "";
    const normalizedText = rawText.replace(/\s+/g, " ").trim();

    if (TIER_SUFFIX.test(normalizedText)) return true;

    // Handle templates that put the tier number on a separate line.
    return /\n/.test(rawText) && /\s\d+\s*$/.test(normalizedText);
  }

  function patchSelectedPill(element) {
    const isStatus =
      element.dataset.modType === "status" ||
      element.classList.contains("status") ||
      hasTieredStatusText(element);

    element.classList.toggle("is-status", isStatus);
  }

  function scanForSelectedStatuses(root = document) {
    if (root instanceof Element && root.matches(SELECTED_PILL_SELECTOR)) {
      patchSelectedPill(root);
    }

    root.querySelectorAll?.(SELECTED_PILL_SELECTOR).forEach(patchSelectedPill);
  }

  let scanScheduled = false;

  function scheduleScan() {
    if (scanScheduled) return;
    scanScheduled = true;

    requestAnimationFrame(() => {
      scanScheduled = false;
      scanForSelectedStatuses();
    });
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof Element)) continue;

        if (
          node.matches(SELECTED_PILL_SELECTOR) ||
          node.querySelector(SELECTED_PILL_SELECTOR)
        ) {
          scheduleScan();
          return;
        }
      }
    }
  });

  Hooks.once("ready", () => {
    applyColors();
    scanForSelectedStatuses();

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Catch applications that finish rendering just after the ready hook.
    setTimeout(scanForSelectedStatuses, 250);
    setTimeout(scanForSelectedStatuses, 1000);
  });

  Hooks.on("renderApplication", scheduleScan);
  Hooks.on("renderChatMessage", scheduleScan);
})();
