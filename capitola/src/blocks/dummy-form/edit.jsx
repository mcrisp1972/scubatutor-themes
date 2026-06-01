//import { useBlockProps } from '@wordpress/block-editor';

export function Edit() {
	return (
		<div className="wpforms-container wpforms-block">
			<div className="wpforms-validate wpforms-form wpforms-ajax-form">
				<div className="wpforms-field-container">
					<div className="wpforms-field wpforms-field-name" data-field-id="1">
						<label className="wpforms-field-label" htmlFor="wpforms-74483-field_1">
							Name <span className="wpforms-required-label">*</span>
						</label>
						<div className="wpforms-field-row wpforms-field-medium">
							<div className="wpforms-field-row-block wpforms-first wpforms-one-half">
								<input
									type="text"
									id="wpforms-74483-field_1"
									className="wpforms-field-name-first wpforms-field-required"
									name="wpforms[fields][1][first]"
									required=""
								/>
								<label
									htmlFor="wpforms-74483-field_1"
									className="wpforms-field-sublabel after "
								>
									First
								</label>
							</div>
							<div className="wpforms-field-row-block wpforms-one-half">
								<input
									type="text"
									id="wpforms-74483-field_1-last"
									className="wpforms-field-name-last wpforms-field-required"
									name="wpforms[fields][1][last]"
									required=""
								/>
								<label
									htmlFor="wpforms-74483-field_1-last"
									className="wpforms-field-sublabel after "
								>
									Last
								</label>
							</div>
						</div>
					</div>
					<div
						id="wpforms-74483-field_2-container"
						className="wpforms-field wpforms-field-email"
						data-field-id="2"
					>
						<label className="wpforms-field-label" htmlFor="wpforms-74483-field_2">
							Email <span className="wpforms-required-label">*</span>
						</label>
						<input
							type="email"
							id="wpforms-74483-field_2"
							className="wpforms-field-medium wpforms-field-required"
							name="wpforms[fields][2]"
							required=""
						/>
					</div>
				</div>
				<div className="wpforms-submit-container">
					<button
						type="submit"
						name="wpforms[submit]"
						id="wpforms-submit-74483"
						className="wpforms-submit"
						data-alt-text="Sending..."
						data-submit-text="Submit"
						aria-live="assertive"
						value="wpforms-submit"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
