"use client";

import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function ReleaseCounter({numberHeight}: {numberHeight: number}) {
	let [count, setCount] = useState(0);
	const [userDevice, setUserDevice] = useState("desktop"); // ["phone", "tablet", "desktop"]

	useEffect(() => {
		// Get current date and time
		let currentDate = new Date();

		// Get October 1st 2023 as a date
		let releaseDate = new Date(2023, 9, 1);  // Month is zero based, so 9 is October
		
		// Caluclate minutes
		let minutes = ((releaseDate.getTime() - currentDate.getTime()) / 1000) / 60;
		// Calculate hours
		let hours = minutes / 60;
		// Calculate days
		let days = hours / 24;

		// Log all 
		console.log("Minutes: ", minutes);
		console.log("Hours: ", hours);
		console.log("Days: ", days);

		
		
		
		let seconds = ((releaseDate.getTime() - currentDate.getTime())) / 1000;
		setCount(seconds);
		console.log("Seconds: ", seconds);

		// Determine if device is phone, tablet, or desktop
		let device = "desktop";
		if (window.innerWidth <= 768) {
			device = "phone";
		} else if (window.innerWidth <= 1024) {
			device = "tablet";
		}
		setUserDevice(device);
		
		

		const interval = setInterval(() => {
			setCount((prev) => prev - 1);
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="release-container-wrapper">
			<div className="release-container-input ">
				<div className="count-input">
					<p>Release Date: </p>
					{/* <div>
						<input
							type="number"
							value={count}
							min={0}
							onChange={(e) => setCount(+e.target.value)}
						/>
					</div> */}
				</div>
			</div>
			<div className="counter">
				<Counter value={count} numberHeight={(userDevice === "phone") ? numberHeight : (userDevice === "tablet") ? numberHeight * 1.5 : numberHeight * 3.6} />
			</div>
			<div className="after-text">
				<p>seconds</p>
			</div>
		</div>
	);
}

function Counter({ value, numberHeight }: { value: number; numberHeight: number }) {
	let animatedValue = useSpring(value);

	useEffect(() => {
		animatedValue.set(value);
	}, [animatedValue, value]);

  return (
		<div className="counter-item-wrapper">
			<div className="counter-item">
				{/* @ts-ignore */}
				{[...Array(10).keys()].map((i) => (
					<Number place={1000000} mv={animatedValue} number={i} key={i} numHeight={numberHeight}/>
				))}
			</div>
			<div className="counter-item">
				{/* @ts-ignore */}
				{[...Array(10).keys()].map((i) => (
					<Number place={100000} mv={animatedValue} number={i} key={i} numHeight={numberHeight}/>
				))}
			</div>
			<div className="counter-item">
				{/* @ts-ignore */}
				{[...Array(10).keys()].map((i) => (
					<Number place={10000} mv={animatedValue} number={i} key={i} numHeight={numberHeight}/>
				))}
			</div>
			<div className="counter-item">
				{/* @ts-ignore */}
				{[...Array(10).keys()].map((i) => (
					<Number place={1000} mv={animatedValue} number={i} key={i} numHeight={numberHeight}/>
				))}
			</div>
			<div className="counter-item">
				{/* @ts-ignore */}
				{[...Array(10).keys()].map((i) => (
					<Number place={100} mv={animatedValue} number={i} key={i} numHeight={numberHeight}/>
				))}
			</div>
			<div className="counter-item">
				{/* @ts-ignore */}
				{[...Array(10).keys()].map((i) => (
					<Number place={10} mv={animatedValue} number={i} key={i} numHeight={numberHeight}/>
				))}
			</div>
			<div className="counter-item">
				{/* @ts-ignore */}
				{[...Array(10).keys()].map((i) => (
					<Number place={1} mv={animatedValue} number={i} key={i} numHeight={numberHeight}/>
				))}
			</div>
		</div>
	);
}

function Number({ place, mv, number, numHeight }: { place: number; mv: MotionValue; number: number; numHeight: number;}) {
	let y = useTransform(mv, (latest) => {
	let height = numHeight;
	let placeValue = (latest / place) % 10;
	let offset = (10 + number - placeValue) % 10;

	let memo = offset * height;

	if (offset > 5) {
	memo -= 10 * height;
	}

	return memo;
});

	return (
		<motion.span style={{ y }} className="count-number">
		{number}
		</motion.span>
	);
}
