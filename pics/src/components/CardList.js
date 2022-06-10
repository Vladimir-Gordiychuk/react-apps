import React from 'react';

export default class CardList extends React.Component {

    renderItem(item) {
        return (
            <div key={item.id} className="ui card">
                <div className="image">
                    <img src={item.urls.regular} />
                </div>
                <div className="content">
                    <a className="header">
                        {item.alt_description}
                    </a>
                    <div className="meta">
                        <span className="date">
                            Created at {item.created_at}
                        </span>
                    </div>
                    <div className="description">
                        {item.alt_description}
                    </div>
                </div>
            </div>
        );
    }

    renderItems() {
        return this.props.items.map(
            item => this.renderItem(item)
        );
    }

    render() {
        return (
            <div className="ui cards">
                {this.renderItems()}
            </div>
            );
    }

}