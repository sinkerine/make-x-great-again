import assert from "node:assert/strict";
import test from "node:test";
import config from "../wxt.config";

test("Firefox manifest declares a separate Android compatibility floor", async () => {
  const manifestConfig = config.manifest;
  assert.equal(typeof manifestConfig, "function");
  if (typeof manifestConfig !== "function") {
    throw new TypeError("WXT manifest config must be a function");
  }

  const manifest = await manifestConfig({
    browser: "firefox",
    command: "build",
    mode: "production",
  } as never);

  const settings = manifest.browser_specific_settings as
    | {
        gecko?: { id?: string; strict_min_version?: string };
        gecko_android?: { strict_min_version?: string };
      }
    | undefined;

  assert.equal(settings?.gecko?.id, "x-spam-sentine@15cm.net");
  assert.equal(settings?.gecko?.strict_min_version, "140.0");
  assert.equal(settings?.gecko_android?.strict_min_version, "142.0");
});
