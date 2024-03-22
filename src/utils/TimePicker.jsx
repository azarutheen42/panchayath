

const TimePickerComponent = (props) => {
    const { handleChange, handleDateChange, value, name, disabled, error, report, label } = props

    return (
        <>
            <div className="form-group">
                <label className="form-label">
                    {label} 
                </label>
                <input
                    type="time"
                    className="form-control"
                    name="time"
                    onChange={handleChange}
                    defaultValue={value}
                    disabled={disabled}
                    required
                />
                {error && !value && (
                    <span className="req-text">
                        This field is required
                    </span>
                )}
            </div>



        </>
    );
};

export default TimePickerComponent;
