import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
         <div className="card">
          <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0'
           }
          }>
          <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
        <img src={!imageUrl?"https://www.quicknews.co.za/wp-content/uploads/2023/04/png_quick-news1200x450-pixels.gif":imageUrl} className="card-img-top col-lg-1" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} target="_blank" className="btn btm-sm btn-dark mb-2" rel="noreferrer">Read More</a>
            <div className="card-footer">
            <small className="text-body-secondary">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small>
           </div>
        </div>
        </div> 
      </div>
    ) 
  }
}

export default NewsItem
