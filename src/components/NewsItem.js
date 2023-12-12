import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    
    let {title,description,imageUrl,newsUrl,author,date}=this.props;

    return (
      <div className="my-3">
            <div className="card" >
            <img src={!imageUrl?"https://cdn.wionews.com/sites/default/files/2023/11/09/392227-untitled-design-2023-11-09t210542982.png":imageUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-danger">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More...</a>
                </div>
            </div>
      </div>
    )
  }
}

export default NewsItem

//props acts as a parameter which is passed in a component and then the value 
//of props is used later in the code according the requirement
//and props value comes from -where the component is used and value is given to a prop which act as an attribute there
