import { $string, Serializer } from "../../serial/mod.ts";
import { Id } from "../utils/mod.ts";

export const $id: Serializer<Id<string, any, string>> = $string as never;
