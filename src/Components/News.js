import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
     country: 'in',
     pageSize: 8,
     category: 'general',
  }
  static PropType = {
    country: PropTypes.string,
    category: PropTypes.string,
   
  }

  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - QuickNews`;
  }

    async updateNews(){
      this.props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({page: this.state.page,
        articles: parsedData.articles,
        loading: false
      })
      this.props.setProgress(100);

  }


  async componentDidMount(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    this.props.setProgress(100);
  }


  handlePreviousClick = async ()=>{
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    this.props.setProgress(100);
  }
  
  handleNextClick = async ()=>{
    this.props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
    this.props.setProgress(100);
  }


  render() {
    return (
      <div className="container  my-3">
        <h1 className="text-center text-decoration-underline" style={{marginTop: '70px'}}>QuickNews-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1> 
        {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{

        return  <div className="col-md-3" key={element.url}>
            <NewsItem
            title={element.title?element.title.slice(0,45):""}
            description={element.description?element.description.slice(0,88):""}
            imageUrl={element.urlToImage}
            newsUrl={element.url}
            author={element.author}
            date={element.publishedAt}
            source={element.source.name}
            />
            </div>
            
        })}
        <div className="container d-flex justify-content-between my-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
         
        </div>
      </div>
    );
  }
}

export default News;
