
const CustomSwitch = () => {

    return (
        <>
            <div className="switch-container">
                <div>
                    <input className="switch" type="checkbox" id="switch" />
                    <label for="switch">Toggle</label>
                </div>
                <label className="switch-label-a">Plan Mensual</label>
                <label className="switch-label-b">Plan Anual</label>
            </div>
        </>
    );
}

export default CustomSwitch;