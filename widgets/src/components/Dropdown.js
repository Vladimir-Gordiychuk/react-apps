import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, selection, placeholder, onSelect }) => {

    const [selected, setSelected] = useState(selection);
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
        .filter(option => option != selected)
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

    const selectedLabel = selected ?
        selected.label :
        (placeholder || 'Select option.');

    const expandedHeaderClass = expanded ? 'visible active' : '';
    const expandedOptionsClass = expanded ? 'visible transition' : '';

    return (
        <div ref={ref} className="ui form">
            <div className="field">
                <label className="label">Select a Color</label>
                <div className={`ui selection dropdown ${expandedHeaderClass}`}
                    onClick={() => setExpanded(!expanded)}>
                    <i className="dropdown icon"></i>
                    <div className="text">{selectedLabel}</div>
                    <div className={`menu ${expandedOptionsClass}`}>
                        {renderedOptions}
                    </div>
                </div>
            </div>
        </div>
        );
};

export default Dropdown;