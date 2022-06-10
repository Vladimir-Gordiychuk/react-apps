import React, { useState } from 'react';

export default ({ items }) => {

    const [activeIndex, setActiveIndex] =
        useState(null);

    const onTitleClick = (index) => {
        setActiveIndex(index);
    };

    const renderedItems = items.map(
        (item, index) => {
            const active = activeIndex === index ? 'active' : '';

            const content = item.isHtml ?
                (<iframe
                    className={`content ${active}`}
                    src={"data:text/html;charset=utf-8," + item.content}
                    width="100%"
                />) :
                (<div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>);


            return (
                <React.Fragment key={item.id}>
                    <div className={`title ${active}`}
                        onClick={() => onTitleClick(index)}
                    >
                        <i className="dropdown icon"></i>
                        {item.title}
                    </div>
                    {content}
                </React.Fragment>
            );

        }
    );

    return <div className="ui styled accordion">
        {renderedItems}
    </div>;
};