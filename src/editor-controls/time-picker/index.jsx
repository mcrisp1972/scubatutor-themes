/* eslint-disable @wordpress/no-unsafe-wp-apis */
import {
	BaseControl,
	Dropdown,
	Button,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	useBaseControlProps,
} from '@wordpress/components';
import { format } from '@wordpress/date';

function TimePicker( { value, onChange, onClear, label, yearPlaceholder } ) {
	const { baseControlProps } = useBaseControlProps( { label, __nextHasNoMarginBottom: true } );
	const year = yearPlaceholder ? yearPlaceholder : '1972-01-01';
	const hour = value ? format( 'H', value ) : '00';
	const minute = value ? format( 'i', value ) : '00';

	return (
		<BaseControl { ...baseControlProps }>
			<div>
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
										textDecoration: 'none',
										paddingTop: '7px',
										paddingBottom: '7px',
										paddingRight: '0',
										paddingLeft: '0',
									} }
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										enableBackground="new 0 0 24 24"
										height="24"
										viewBox="0 0 24 24"
										width="24"
										style={ { width: '20px', marginRight: '5px' } }
									>
										<g>
											<rect fill="none" height="24" width="24" x="0" />
										</g>
										<g>
											<g>
												<path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12.5,7H11v6l5.2,3.2l0.8-1.3l-4.5-2.7V7z" />
											</g>
										</g>
									</svg>
									{ value ? format( 'g:i a', value ) : 'Select Time' }
								</Button>
								{ onClear !== undefined && value && (
									<Button
										variant="link"
										aria-expanded={ isOpen }
										onClick={ onClear }
										style={ {
											textDecoration: 'none',
											paddingTop: '7px',
											paddingBottom: '7px',
											paddingRight: '0',
											paddingLeft: '0',
										} }
									>
										<svg
											style={ { width: '20px' } }
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
							<div className="components-datetime" style={ { minWidth: '200px' } }>
								<div style={ { display: 'flex', alignItems: 'center' } }>
									<select
										value={ hour }
										onChange={ ( event ) => {
											onChange(
												year +
													'T' +
													event.target.value +
													':' +
													minute +
													':00'
											);
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
											onChange(
												year + 'T' + hour + ':' + event.target.value + ':00'
											);
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
											onChange={ ( newValue ) => {
												if ( newValue === 'AM' && parseInt( hour ) >= 12 ) {
													const currentHour = hour;
													onChange(
														year +
															'T' +
															( currentHour - 12 )
																.toString()
																.padStart( 2, '0' ) +
															':' +
															minute +
															':00'
													);
												} else if (
													newValue === 'PM' &&
													parseInt( hour ) < 12
												) {
													const newHour = parseInt( hour ) + 12;
													onChange(
														year + 'T' + newHour + ':' + minute + ':00'
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

export default TimePicker;
