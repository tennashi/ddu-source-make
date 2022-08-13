import type { GatherArguments } from "https://deno.land/x/ddu_vim@v1.8.8/base/source.ts";
import type { Item } from "https://deno.land/x/ddu_vim@v1.8.8/types.ts";
import { BaseSource } from "https://deno.land/x/ddu_vim@v1.8.8/types.ts";
import { TextLineStream } from "https://deno.land/std@0.151.0/streams/mod.ts";
import * as fn from "https://deno.land/x/denops_std@v3.8.1/function/mod.ts";
import { ensureString } from "https://deno.land/x/unknownutil@v2.0.0/mod.ts";
import { dirname } from "https://deno.land/std@0.151.0/path/mod.ts";

import type { ActionData } from "../@ddu-kinds/make.ts";

type Params = Record<never, never>;

export class Source extends BaseSource<Params, ActionData> {
  kind = "extcmd";

  gather(args: GatherArguments<Params>): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      async start(controller) {
        const makefilePath = ensureString(
          await fn.findfile(args.denops, "Makefile", ".;"),
        );
        const makefile = await Deno.open(makefilePath);
        const lines = makefile.readable
          .pipeThrough(new TextDecoderStream())
          .pipeThrough(new TextLineStream());

        for await (const line of lines) {
          if (!line.startsWith(".PHONY:")) {
            continue;
          }

          const targets = line.substring(".PHONY:".length).trim().split(" ");
          targets.map((target) => {
            controller.enqueue([{
              word: target,
              action: { cmd: ["make", target], cwd: dirname(makefilePath) },
            }]);
          });
        }
        controller.close();
      },
    });
  }

  params(): Params {
    return {};
  }
}
