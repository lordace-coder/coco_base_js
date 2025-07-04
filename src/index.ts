import { Cocobase } from "./core/core";
import type { CocobaseConfig, Document, Collection } from "./types/types";
import {
  getFromLocalStorage,
  mergeUserData,
  setToLocalStorage,
} from "./utils/utils";
import { uploadFile } from "./core/file";

export {
  Cocobase,
  getFromLocalStorage,
  mergeUserData,
  setToLocalStorage,
  uploadFile,
};
export type { TokenResponse, AppUser, Query } from "./types/types";
export type { CocobaseConfig, Document, Collection };
