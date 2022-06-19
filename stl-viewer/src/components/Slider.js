import './Slider.css';

const Slider = ({ id, min, max, value, onInput }) => {
    return <input type="range"
        id={id}
        min={min}
        max={max}
        value={value}
        className="slider"
        onInput={onInput}
        />;
}

export default Slider;