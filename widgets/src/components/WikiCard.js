import { useState, useRef } from 'react';

// References:
// 1. https://stackoverflow.com/questions/1145850/how-to-get-height-of-entire-document-with-javascript
// 2. https://www.dyn-web.com/tutorials/iframes/height/
const getDocHeight = (doc) => {
    doc = doc || document;
    
    var body = doc.body, html = doc.documentElement;
    var height = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);
    return height;
}

const WikiCard = ({ page }) => {

    const [height, setHeight] = useState(80);

    var frameRef = useRef();

    const updateHeight = () => {
        const frame = frameRef.current;
        var doc = frame.contentDocument ? frame.contentDocument :
            frame.contentWindow.document;
        setHeight(getDocHeight(doc));
    };

    return (
        <div className="item">
            <div className="content">
                <div className="header">
                    <a href={`https://en.wikipedia.org?curid=${page.id}`}>
                        {page.title}
                    </a>
                </div>
                <iframe ref={frameRef}
                    onLoad={updateHeight}
                    id={'frame' + page.id}
                    srcDoc={page.content}
                    width="100%"
                    height={height + 'px'}
                    frameBorder="0"
                />
            </div>
        </div>
    );
};

export default WikiCard;