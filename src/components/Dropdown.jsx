

export default function SelectDropdown(props) {

    const { list, onchange, selected, name, showname, disabled, error } = props
    return (
        <>
            <select name={name} className="custom-dropdown" required value={selected} onChange={onchange} disabled={disabled}>

                <option > -------------  </option>
                {list?.map((e) => (
                    <option value={e?.id}>{e[showname]} </option>
                ))}
            </select>

            {(!selected && error) && (
                <span className="req-text">This field is required</span>
            )}


        </>
    )
}