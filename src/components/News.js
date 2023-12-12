import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps={
        country:"in",
        pageSize:5,
        category:"general"
    }

    static propTypes={
        country: PropTypes.string,
        pageSize:PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1
        }
        document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
    }

    // async updateNews(){
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6452bdb62147408dbb6120ca197e90a8&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true});
    //     let data = await fetch(url);
    //     let parsedData= await data.json(); 
    //     this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading : false});
    // }

    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6452bdb62147408dbb6120ca197e90a8&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData= await data.json(); 
        this.setState({articles:parsedData.articles, totalResults:parsedData.totalResults, loading : false});
        // this.updateNews();

    }

    handlePrevClick=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6452bdb62147408dbb6120ca197e90a8&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data = await fetch(url);
        let parsedData= await data.json(); 

        this.setState({
            page:this.state.page-1,
            articles:parsedData.articles,
            loading : false
        })

        // this.setState({page: this.state.page-1});
        // this.updateNews();
    }

    
    handleNextClick=async ()=>{

        if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6452bdb62147408dbb6120ca197e90a8&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
            let data = await fetch(url);
            let parsedData= await data.json(); 

            this.setState({
                page:this.state.page+1,
                articles:parsedData.articles,
                loading : false
            })
    }
    // this.setState({page: this.state.page+1});
    // this.updateNews();
    }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
           {
            !this.state.loading && this.state.articles.map((element)=>{
                return  <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div> 
            })
           }
        </div>
        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">&larr; Previous</button>
        <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" onClick={this.handleNextClick} className="btn btn-dark">Next &rarr;</button>
        </div>

      </div>
    )
  }
}

export default News
