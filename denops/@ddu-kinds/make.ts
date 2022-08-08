import type { ActionArguments } from "https://deno.land/x/ddu_vim@v1.8.8/base/kind.ts";
import {
  ActionFlags,
  BaseKind,
} from "https://deno.land/x/ddu_vim@v1.8.8/types.ts";

export interface ActionData {
  path: string;
}

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  actions: Record<
    string,
    (args: ActionArguments<Params>) => Promise<ActionFlags>
  > = {
    run: async (args: ActionArguments<Params>) => {
      for (const item of args.items) {
        const action = item?.action as ActionData;
        Deno.run({ cmd: ["make", item.word], cwd: action.path });
      }

      return Promise.resolve(ActionFlags.None);
    },
  };

  params(): Params {
    return {};
  }
}
