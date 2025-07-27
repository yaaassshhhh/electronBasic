import path from 'path';
import { app } from 'electron';
import { isDev } from "./utils.ts"
export function getPreloadPath() {
    return path.join(
        app.getAppPath(),
        isDev() ? "." : "..",
        "/dist-electron/preload.cjs"
    )
}
