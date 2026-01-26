/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	BaseControl,
	useBaseControlProps,
	Dropdown,
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	DatePicker as CoreDatePicker,
} from '@wordpress/components';
import { dateI18n, format } from '@wordpress/date';

const currentTimezone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 0;

function DateTimePicker( { value, onChange, onClear, label } ) {
	const buttonLabel = 'Select Date';
	const resolvedFormat = 'F j Y, g:ia';
	const hour = value ? format( 'H', value ) : '00';
	const minute = value ? format( 'i', value ) : '00';
	const date = format( 'Y-m-d', value ? value : new Date() );

	const formattedDate = value ? dateI18n( resolvedFormat, value, currentTimezone ) : buttonLabel;

	const { baseControlProps, controlProps } = useBaseControlProps( { label, __nextHasNoMarginBottom: true } );

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
									onChange={ ( value ) => {
										onChange( format( 'Y-m-d', value ) + 'T' + hour + ':' + minute + ':00' );
									} }
									onMonthPreviewed={ () => {} }
								/>
								<div style={ { display: 'flex', alignItems: 'center', marginTop: '16px' } }>
									<select
										value={ hour }
										onChange={ ( event ) => {
											onChange( date + 'T' + event.target.value + ':' + minute + ':00' );
										} }
									>
										{ format( 'a', value ) !== 'pm' && (
											<>
												<option value="00">12</option>
												<option value="01">1</option>
												<option value="02">2</option>
												<option value="03">3</option>
												<option value="04">4</option>
												<option value="05">5</option>
												<option value="06">6</option>
												<option value="07">7</option>
												<option value="08">8</option>
												<option value="09">9</option>
												<option value="10">10</option>
												<option value="11">11</option>
											</>
										) }
										{ format( 'a', value ) === 'pm' && (
											<>
												<option value="12">12</option>
												<option value="13">1</option>
												<option value="14">2</option>
												<option value="15">3</option>
												<option value="16">4</option>
												<option value="17">5</option>
												<option value="18">6</option>
												<option value="19">7</option>
												<option value="20">8</option>
												<option value="21">9</option>
												<option value="22">10</option>
												<option value="23">11</option>
											</>
										) }
									</select>
									<select
										value={ format( 'i', value ) }
										onChange={ ( event ) => {
											onChange( date + 'T' + hour + ':' + event.target.value + ':00' );
										} }
									>
										<option value="00">00</option>
										<option value="05">05</option>
										<option value="10">10</option>
										<option value="15">15</option>
										<option value="20">20</option>
										<option value="25">25</option>
										<option value="30">30</option>
										<option value="35">35</option>
										<option value="40">40</option>
										<option value="45">45</option>
										<option value="50">50</option>
										<option value="55">55</option>
									</select>
									<div style={ { marginLeft: 'auto' } }>
										<ToggleGroupControl
											label={ false }
											value={ parseInt( hour ) < 12 ? 'AM' : 'PM' }
											onChange={ ( value ) => {
												if ( value === 'AM' && parseInt( hour ) >= 12 ) {
													const newHour = parseInt( hour ) - 12;
													onChange(
														`${ date }T${ newHour
															.toString()
															.padStart( 2, '0' ) }:${ minute }:00`
													);
												} else if ( value === 'PM' && parseInt( hour ) < 12 ) {
													const newHour = parseInt( hour ) + 12;
													onChange(
														`${ date }T${ newHour
															.toString()
															.padStart( 2, '0' ) }:${ minute }:00`
													);
												}
											} }
										>
											<ToggleGroupControlOption value="AM" label="AM" />
											<ToggleGroupControlOption value="PM" label="PM" />
										</ToggleGroupControl>
									</div>
								</div>
							</div>
						);
					} }
				/>
			</div>
		</BaseControl>
	);
}

export default DateTimePicker;
