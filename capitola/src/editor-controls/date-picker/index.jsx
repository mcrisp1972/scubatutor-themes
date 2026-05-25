import {
	BaseControl,
	useBaseControlProps,
	Dropdown,
	Button,
	DatePicker as CoreDatePicker,
} from '@wordpress/components';
import { getSettings, dateI18n } from '@wordpress/date';

const currentTimezone =
	typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 0;

function DatePicker( { value, onChange, onClear, label } ) {
	const settings = getSettings();

	const buttonLabel = 'Select Date';
	const resolvedFormat = settings.formats.date || 'F j, Y';

	const formattedDate = value ? dateI18n( resolvedFormat, value, currentTimezone ) : buttonLabel;
	const { baseControlProps, controlProps } = useBaseControlProps( {
		label,
	} );

	return (
		<BaseControl { ...baseControlProps }>
			<div id={ controlProps.id }>
				<Dropdown
					popoverProps={ {
						placement: 'left-start',
						offset: 36,
						shift: true,
					} }
					renderToggle={ ( { isOpen, onToggle } ) => {
						return (
							<div style={ { display: 'flex' } }>
								<Button
									variant="link"
									aria-expanded={ isOpen }
									onClick={ onToggle }
									style={ {
										paddingTop: '7px',
										paddingBottom: '7px',
										paddingRight: '0',
										paddingLeft: '0',
										textDecoration: 'none',
									} }
								>
									<svg
										style={ {
											width: '20px',
											marginRight: '5px',
										} }
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 0 24 24"
										width="24"
									>
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path d="M7 11h2v2H7v-2zm14-5v14c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2l.01-14c0-1.1.88-2 1.99-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14zm-4-7h2v-2h-2v2zm-4 0h2v-2h-2v2z" />
									</svg>
									{ formattedDate }
								</Button>
								{ onClear !== undefined && value && (
									<Button
										variant="link"
										aria-expanded={ isOpen }
										onClick={ onClear }
										style={ {
											paddingTop: '7px',
											paddingBottom: '7px',
											paddingRight: '0',
											paddingLeft: '0',
											textDecoration: 'none',
										} }
									>
										<svg
											style={ {
												width: '20px',
											} }
											viewBox="0 0 1024 1024"
											version="1.1"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M557.2 512l136.4-136.4c12.4-12.4 12.4-32.8 0-45.2-12.4-12.4-32.8-12.4-45.2 0L512 466.8l-136.4-136.4c-12.4-12.4-32.8-12.4-45.2 0-6.2 6.2-9.4 14.4-9.4 22.6 0 8.2 3.2 16.4 9.4 22.6l136.4 136.4-136.4 136.4c-6.2 6.2-9.4 14.4-9.4 22.6 0 8.2 3.2 16.4 9.4 22.6 12.4 12.4 32.8 12.4 45.2 0l136.4-136.4 136.4 136.4c12.4 12.4 32.8 12.4 45.2 0 12.4-12.4 12.4-32.8 0-45.2L557.2 512z"
												fill=""
											/>
										</svg>
									</Button>
								) }
							</div>
						);
					} }
					renderContent={ () => {
						return (
							<div className="components-datetime" style={ { minWidth: '230px' } }>
								<CoreDatePicker
									currentDate={ value }
									onChange={ onChange }
									onMonthPreviewed={ () => {} }
								/>
							</div>
						);
					} }
				/>
			</div>
		</BaseControl>
	);
}

export default DatePicker;
