import React, { useState } from 'react';

const Dropdown = ({ options, selection, placeholder, onSelect }) => {

    const [selected, setSelected] = useState(selection);
    const [expanded, setExpanded] = useState(false);

    const renderedOptions = expanded ? options
        .filter(option => option != selected)
        .map(option => {

        const onOptionSelected = () => {
            setSelected(option);
            setExpanded(false);
            onSelect(option);
        }

        return (
            <div key={option.value}
                className="item"
                onClick={onOptionSelected}>
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
        <div className="ui form">
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