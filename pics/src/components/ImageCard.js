import React from 'react';

export default class ImageCard extends React.Component {

    constructor(props) {
        super(props);

        this.imageRef = React.createRef();

        this.state = {
            height : null
        };
    }

    componentDidMount() {
        this.imageRef.current.addEventListener(
            'load',
            this.updateSpan
        );
    }

    updateSpan = (event) => {
        this.setState({
            height: this.imageRef.current.clientHeight
        });
    }

    getSpan() {
        const row = 20;
        const gap = 10;
        if (this.state.height) {
            const base = Math.ceil(this.state.height / (row + gap));
            return (base * (row + gap) - gap < this.state.height) ? base + 1 : base;
        }
        return 1;
    }

    render() {
        const { alt_description, urls } = this.props.item;

        const style = {
            gridRowEnd: 'span ' + this.getSpan()
        };

        return (
            <img ref={this.imageRef}
                src={urls.regular}
                alt={alt_description}
                style={style}
            />
        );
    }
}