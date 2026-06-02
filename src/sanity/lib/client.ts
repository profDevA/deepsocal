import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Live API (not the cached CDN) so published edits appear right away.
  // The page-level `revalidate: 30` in fetch.ts still provides Next caching.
  useCdn: false,
});
