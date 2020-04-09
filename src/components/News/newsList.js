import React from "react";
import timeAgo from "node-time-ago";
import ie18labels from "../../ie18labels/ie18labels"


function NewsList(props){
    const news = props.news;
    return (
        <>
          {news &&
            news.map((hit, index) =>
              <div 
              key={hit.objectID} 
              className= {(index!==-1 && index%2===0) ? "even news-item" : "odd news-item"}>
                  <p>
                      <span className="news-position">{hit.num_comments}</span> 
                      <span className="upvote">{hit.points}</span> <a href={hit.objectID} className="upvote" title={ie18labels.upvote}> ▲ </a><span className="post-title">{hit.title} 
                      <small> <a className="domain" href={hit.url} title={hit.url}>{hit.url}</a> 
                      by {hit.author} {timeAgo(hit.created_at)} </small> 
                      </span></p>
              </div>
            )}
            
        </>
      );
}
export default NewsList;    