"use client";

import {
	CategoryScale,
	Chart as ChartJS,
	LineElement,
	LinearScale,
	PointElement,
} from "chart.js";
import { DateTime } from "luxon";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

type Props = {
	data: { date: string; value: number }[];
};

const Chart = ({ data }: Props) => {
	const labels = data.map(({ date }) =>
		DateTime.fromFormat(date, "yyyyMMddhhmmss").toFormat("yyyy-MM-dd"),
	);

	return (
		<Line
			options={{
				animation: false,
				scales: {
					x: {
						title: {
							display: true,
							text: "日付",
							color: "white",
						},
						ticks: {
							color: "white",
							maxRotation: 45,
							minRotation: 45,
							callback: (index) => {
								if (typeof index !== "number") {
									return undefined;
								}

								const label = labels[index];
								if (label === undefined) {
									return undefined;
								}

								const date = DateTime.fromFormat(label, "yyyy-MM-dd");
								if (date.day !== 1) {
									return undefined;
								}

								return date.toFormat("yyyy/MM");
							},
						},
						grid: {
							display: false,
						},
					},
					y: {
						title: {
							display: true,
							text: "評価額",
							color: "white",
						},
						ticks: {
							color: "white",
						},
						grid: {
							color: "gray",
							lineWidth: 0.25,
						},
					},
				},
			}}
			data={{
				labels,
				datasets: [
					{
						data: data.map(({ value }) => value),
						pointStyle: false,
						borderColor: "#3c74f5",
						borderWidth: 2,
					},
				],
			}}
		/>
	);
};

export default Chart;
