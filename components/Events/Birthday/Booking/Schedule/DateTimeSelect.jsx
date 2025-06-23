'use client';

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { CalendarDays, Clock4 } from 'lucide-react';

const getNextThreeMonths = () => {
	const months = [];
	const today = dayjs();
	for (let i = 0; i < 4; i++) {
		months.push(today.add(i, 'month'));
	}
	return months;
};

// You can replace this with dynamic availability fetched from server
const unavailableDates = [
	'2025-06-27',
	'2025-06-29',
	'2025-07-03',
	'2025-07-04',
	'2025-07-06',
	'2025-07-10',
	'2025-07-17',
	'2025-07-22',
	'2025-07-29',
	'2025-08-05',
	'2025-08-20',
];

export default function BookingCalendar() {
	const months = getNextThreeMonths();
	const [ selectedMonth, setSelectedMonth ] = useState(months[ 0 ]);
	const [ selectedDate, setSelectedDate ] = useState(null);

	const startOfMonth = selectedMonth.startOf('month');
	const endOfMonth = selectedMonth.endOf('month');
	const daysInMonth = endOfMonth.date();
	const startDay = startOfMonth.day();

	const [ hour, setHour ] = useState('');
	const [ minute, setMinute ] = useState('');
	const [ ampm, setAmpm ] = useState('');

	const today = dayjs();
	const tomorrow = today.add(1, 'day');

	const days = [];
	for (let i = 0; i < startDay; i++) days.push(null);
	for (let d = 1; d <= daysInMonth; d++) days.push(selectedMonth.date(d));


	const generateOptions = (start, end) => {
		return Array.from({ length: end - start + 1 }, (_, i) => (start + i).toString());
	};

	useEffect(() => {
		if (hour && minute && ampm) {
			console.log(`${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${ampm}`);
		}
	}, [ hour, minute, ampm ]);

	return (
		<section className='shadow rounded-lg bg-card'>
			<div className="mx-auto py-6 px-8 space-y-4 ">
				<p className='font-semibold text-lg flex gap-2 items-center'><CalendarDays className="h-6 w-6 text-purple-500" /> Select Date :</p>
				<div className='flex justify-end'>
					<Select onValueChange={(value) => setSelectedMonth(dayjs(value + '-01'))} defaultValue={selectedMonth.format('YYYY-MM')}>
						<SelectTrigger className="">
							<SelectValue placeholder="Select a month" />
						</SelectTrigger>
						<SelectContent>
							{months.map((month) => (
								<SelectItem key={month.format('YYYY-MM')} value={month.format('YYYY-MM')}>
									{month.format('MMMM YYYY')}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				<Card className="p-4">
					<div className="grid grid-cols-7 gap-2 text-center">
						{[ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ].map((day) => (
							<div key={day} className="text-sm font-semibold text-muted-foreground">
								{day}
							</div>
						))}

						{days.map((date, i) => {
							if (!date) return <div key={i}></div>;

							const dateStr = date.format('YYYY-MM-DD');
							const isUnavailable = unavailableDates.includes(dateStr);
							const isPast = date.isBefore(tomorrow, 'day');
							const isDisabled = isPast || isUnavailable;
							const isSelected = selectedDate === dateStr;

							return (
								<button
									key={i}
									disabled={isDisabled}
									onClick={() => {
										if (!isUnavailable) {
											setSelectedDate(dateStr);
											console.log('Selected Date:', dateStr);
										}
									}}
									className={clsx(
										'h-10 w-full rounded-md text-sm font-medium transition',
										isPast && 'bg-gray-200 dark:bg-gray-200/80 text-gray-400 dark:text-gray-600 cursor-not-allowed',
										!isPast && isUnavailable && 'bg-red-200 dark:bg-red-200/70 text-gray-700 dark:text-gray-900 cursor-not-allowed',
										!isPast && !isUnavailable && 'bg-green-200 dark:bg-green-200/70 text-gray-700 dark:text-gray-900 hover:brightness-110',
										isSelected && 'ring-2 ring-purple-500 ring-offset-0'
									)}
								>
									{date.date()}
								</button>
							);
						})}
					</div>
				</Card>
			</div>

			{/* time select */}
			<div className="space-y-4 mx-auto py-6 px-8 ">
				<p className='font-semibold text-lg flex gap-2 items-center'><Clock4 className="h-6 w-6 text-purple-500" /> Select Time :</p>
				<Card className="grid grid-cols-3 gap-4 items-end p-3">
					<div>
						<Label>Hour</Label>
						<Select value={hour} onValueChange={setHour}>
							<SelectTrigger>
								<SelectValue placeholder="Hour" />
							</SelectTrigger>
							<SelectContent>
								{generateOptions(1, 12).map((h) => (
									<SelectItem key={h} value={h}>{h}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>Minute</Label>
						<Select value={minute} onValueChange={setMinute}>
							<SelectTrigger>
								<SelectValue placeholder="Minute" />
							</SelectTrigger>
							<SelectContent>
								{generateOptions(1, 60).map((m) => (
									<SelectItem key={m} value={m}>{m.padStart(2, '0')}</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					<div>
						<Label>AM/PM</Label>
						<Select value={ampm} onValueChange={setAmpm}>
							<SelectTrigger>
								<SelectValue placeholder="Select" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="AM">AM</SelectItem>
								<SelectItem value="PM">PM</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</Card>
			</div>
		</section>
	);
}