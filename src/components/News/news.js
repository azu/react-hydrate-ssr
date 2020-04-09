import React, { Component } from "react";
import NewsList from "./NewsList";
import "isomorphic-fetch";
import orderBy from "lodash.orderBy";
import ie18labels from "../../ie18labels/ie18labels"

const API = 'https://hn.algolia.com/api/v1/search?hitsPerPage=100&query=';
const DEFAULT_QUERY = 'redux';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
        hits: [],
        isLoading: false,
        sortOrder: "points",
        currentPage: 1,
        nbPages:''
    }
  }
  setOrder(order) {
    this.setState({ sortOrder: order });
  }
  pagination (page) {
    if(this.state.currentPage < this.state.nbPages) {
        fetch(API + DEFAULT_QUERY + '&page=' + this.state.currentPage)
        .then(response => response.json())
        .then(data => this.setState({ hits: data.hits, nbPages: data.nbPages, currentPage: this.state.currentPage +1 }));
    }
    
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    fetch(API + DEFAULT_QUERY)
      .then(response => response.json())
      .then(data => {
        this.setState({ hits: data.hits,isLoading: false, nbPages: data.nbPages})
      });
  }

  render() { 
    const hits = orderBy(this.state.hits, this.state.sortOrder, "desc");
    const {isLoading } = this.state;

    if (isLoading) {
        return <p>{ie18labels.loadingPlaceHolderTxt}</p>;
    }
     return (
        <div className="newslist">
            <div className="header-title">
                <div className="logo"><h1 title={ie18labels.websiteURL}>Y</h1></div>
                <div className="sort-by">
                <a
                href="/#" title="top"
                onClick={(event)=>{this.setOrder('points', event)}} className={this.state.sortOrder ==='points' ? 'active' : ''}>
                {ie18labels.topTxt}
                </a> |
                <a
                href="/#"
                title="new"
                onClick={(event)=>{this.setOrder('created_at', event)}}  className={this.state.sortOrder ==='created_at' ? 'active' : ''}>
                {ie18labels.newTxt}
                </a>
                </div>
            </div>
            <NewsList news={hits} />
            <div className={this.state.nbPages > this.state.currentPage ? "load-more" : "hidden"}>
                <a href="/#"  onClick={(event)=>{this.pagination(event)}}> {ie18labels.loadMoreTxt}</a>
            </div>
        </div>
     )
  }
}

export default News;