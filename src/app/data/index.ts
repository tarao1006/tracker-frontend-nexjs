import { DateTime } from "luxon";
import * as R from "remeda";
import { z } from "zod";

export const getValuation = async () => {
  const url = process.env.VALUATION_URL;
  if (url === undefined) {
    return [];
  }

  try {
    // const data = await readFile("./data/master.jsonl", { encoding: "utf8" });

    const response = await fetch(url);
    const data = await response.text();

    return R.pipe(
      data.trim(),
      (value) => value.split("\n"),
      R.map((line) => JSON.parse(line.trim())),
      R.map((line) =>
        z.object({ date: z.number(), value: z.number() }).parse(line),
      ),
      R.map((value) => ({
        date: DateTime.fromMillis(value.date).toFormat("yyyy-MM-dd"),
        value: value.value,
      })),
    );
  } catch {
    return [];
  }
};

const DetailsSchema = z.object({
  history: z.array(
    z.object({
      date: z.string(),
      type: z.enum(["deposit", "withdrawal"]),
      amount: z.number(),
    }),
  ),
});

export const getDetails = async () => {
  const url = process.env.DETAILS_URL;
  if (url === undefined) {
    return [];
  }

  try {
    // const data = await readFile("./data/details.json", { encoding: "utf8" });
    // const parsed = DetailsSchema.parse(JSON.parse(data));

    const response = await fetch(url);
    const data = await response.json();
    const parsed = DetailsSchema.parse(data);

    const accumulated = parsed.history.reduce(
      (acc, { date, type, amount }) => {
        const last = acc[acc.length - 1];
        acc.push({
          date,
          value: (last?.value ?? 0) + (type === "deposit" ? amount : -amount),
        });

        return acc;
      },
      [] as { date: string; value: number }[],
    );
    const latest = accumulated[accumulated.length - 1];
    if (latest !== undefined) {
      accumulated.push({
        date: DateTime.now().toFormat("yyyy-MM-dd"),
        value: latest.value,
      });
    }
    return accumulated;
  } catch {
    return [];
  }
};
