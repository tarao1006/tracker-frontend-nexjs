import { DateTime } from "luxon";
import { z } from "zod";

const ValuationSchema = z.object({
	valuation: z.array(z.tuple([z.string(), z.number()])),
});

export const getValuation = async () => {
	const url = process.env.VALUATION_URL;
	if (url === undefined) {
		return [];
	}

	try {
		// const data = await readFile("./data/master.json", { encoding: "utf8" });
		// const parsed = ValuationSchema.parse(JSON.parse(data));

		const response = await fetch(url);
		const data = await response.json();
		const parsed = ValuationSchema.parse(data);

		return parsed.valuation.map(([date, value]) => ({ date, value }));
	} catch (error) {
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
	} catch (error) {
		return [];
	}
};
