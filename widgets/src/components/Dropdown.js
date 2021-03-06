import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selection, onSelect, children }) => {

    const [selected, setSelected] = useState(selection || options[0]);
    const [expanded, setExpanded] = useState(false);

    const ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (ref.current.contains(event.target))
                return;

            setExpanded(false);
        };

        document.body.addEventListener(
            'click',
            handler,
            { capture: false }
        );

        return () => {
            document.body.removeEventListener('click', handler);
        }
    }, []);

    const renderedOptions = expanded ? options
        .filter(option => option !== selected)
        .map(option =>
        {
            return (
                <div key={option.value}
                    className="item"
                    onClick={() => {
                        setSelected(option);
                        onSelect(option);
                    }}>
                    {option.label}
                </div>
            );
        }) : null;

    const expandedHeaderClass = expanded ? 'visible active' : '';
    const expandedOptionsClass = expanded ? 'visible transition' : '';

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">{children || 'Select item.'}</label>
                <div className={`ui selection dropdown ${expandedHeaderClass}`}
                    onClick={() => setExpanded(!expanded)}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selected.label}</div>
                    <div className={`menu ${expandedOptionsClass}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
        );
};

export default Dropdown;