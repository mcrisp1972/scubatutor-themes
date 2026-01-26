import { format } from '@wordpress/date';

export function dateTimeRange( start, end, allDay = null ) {
	if ( ! start || ! end ) {
		return '';
	}
	const currentYear = format( 'Y', Date.now() );
	const startTimestamp = start;
	const endTimestamp = end ? end : startTimestamp;
	const startDate = start.substring( 0, 10 );
	const endDate = end ? end.substring( 0, 10 ) : startDate;
	const startYear = format( 'Y', startTimestamp );
	const endYear = end ? format( 'Y', endTimestamp ) : startYear;
	const startMonth = format( 'M', startTimestamp );
	const endMonth = end ? format( 'M', endTimestamp ) : startMonth;
	const startDay = format( 'j', startTimestamp );
	const endDay = end ? format( 'j', endTimestamp ) : startDay;
	const startMinute = format( 'i', startTimestamp );
	const endMinute = end ? format( 'i', endTimestamp ) : startMinute;
	const startMeridiem = format( 'a', startTimestamp );
	const endMeridiem = end ? format( 'a', endTimestamp ) : startMeridiem;

	// start and end are the same, or no end date, or dates are the same and it's all day
	if ( ! end || end === start || ( startDate === endDate && allDay ) ) {
		let string = startMonth + ' ' + startDay;
		if ( currentYear !== endYear ) {
			string += ' ' + endYear;
		}
		if ( ! allDay ) {
			string += format( ', g' + ( startMinute !== '00' ? ':i' : '' ) + 'a', startTimestamp );
		}
		return string;
	}

	// dates match, but times different
	else if ( startDate === endDate ) {
		let string = startMonth + ' ' + startDay;
		if ( currentYear !== endYear ) {
			string += ' ' + endYear;
		}
		if ( ! allDay ) {
			const startTimeFormat =
				'g' + ( startMinute !== '00' ? ':i' : '' ) + ( startMeridiem !== endMeridiem ? 'a' : '' );
			const endTimeFormat = 'g' + ( startMinute !== '00' ? ':i' : '' ) + 'a';
			string += ', ' + format( startTimeFormat, startTimestamp ) + '-' + format( endTimeFormat, endTimestamp );
		}
		return string;
	}
	let string = startMonth + ' ' + startDay;
	if ( currentYear !== startYear ) {
		string += ' ' + startYear;
	}
	if ( ! allDay ) {
		const startTimeFormat = ', g' + ( startMinute !== '00' ? ':i' : '' ) + 'a';
		string += format( startTimeFormat, startTimestamp );
	}
	string += ' - ' + endMonth + ' ' + endDay;
	if ( ! allDay ) {
		const endTimeFormat = ', g' + ( endMinute !== '00' ? ':i' : '' ) + 'a';
		string += format( endTimeFormat, endTimestamp );
	}
	return string;
}

export function classStartEndDates( postMeta ) {
	if ( postMeta?.classSchedule.length ) {
		return {
			start: postMeta.classSchedule.reduce( ( prev, current ) => {
				return prev.start < current.start ? prev : current;
			} ).start,
			end: postMeta.classSchedule.reduce( ( prev, current ) => {
				return prev.end > current.end ? prev : current;
			} ).end,
		};
	}
	return false;
}
