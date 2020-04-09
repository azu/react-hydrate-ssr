// news.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import News from "./news";


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});
// it("Renders an h1", async () => {
//     // Use the asynchronous version of act to apply resolved promises
//     await act(async () => {
//       render(<News  />, container);
//     });
//     expect(container.querySelector('h1').lenght).toBe(1);
//   });
  
it("Before Fetching the news feed", async () => {
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<News  />, container);
    });
    expect(container.textContent).toContain("Loading...");
  });

it("renders news feed", async () => {
  const news = {
        "hits": [
          {
            "created_at": "2017-05-05T14:14:17.000Z",
            "title": "Build Yourself a Redux",
            "url": "https://zapier.com/engineering/how-to-build-redux/",
            "author": "jdeal",
            "points": 395,
            "story_text": null,
            "comment_text": null,
            "num_comments": 155,
            "story_id": null,
            "story_title": null,
            "story_url": null,
            "parent_id": null,
            "created_at_i": 1493993657,
            "relevancy_score": 7406,
            "_tags": [
              "story",
              "author_jdeal",
              "story_14273549"
            ],
            "objectID": "14273549",
            "_highlightResult": {
              "title": {
                "value": "Build Yourself a \u003cem\u003eRedux\u003c/em\u003e",
                "matchLevel": "full",
                "fullyHighlighted": false,
                "matchedWords": [
                  "redux"
                ]
              },
              "url": {
                "value": "https://zapier.com/engineering/how-to-build-\u003cem\u003eredux\u003c/em\u003e/",
                "matchLevel": "full",
                "fullyHighlighted": false,
                "matchedWords": [
                  "redux"
                ]
              },
              "author": {
                "value": "jdeal",
                "matchLevel": "none",
                "matchedWords": [
                  
                ]
              }
            }
          }
        ],
        nbHits : 13068,
        page : 0,
        nbPages : 10,
        hitsPerPage : 100,
        exhaustiveNbHits : false,
        query : "redux",
        params : "advancedSyntax=true&analytics=true&analyticsTags=backend&hitsPerPage=100&query=redux",
        processingTimeMS : 5
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(news)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<News  />, container);
  });

  expect(container.querySelector(".post-title").textContent).toContain(news.hits[0].title);
  expect(container.querySelector(".news-position").textContent).toContain(news.hits[0].num_comments);
  expect(container.querySelector(".upvote").textContent).toContain(news.hits[0].points);
  expect(container.textContent).toContain(news.hits[0].author);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});
it("should render link domain", async () => {
     // Use the asynchronous version of act to apply resolved promises
     await act(async () => {
        render(<News  />, container);
      });
      expect(container.textContent).toContain("Loading...");
    });
  
  it("renders news feed", async () => {
    const news = {
          "hits": [
            {
              "created_at": "2017-05-05T14:14:17.000Z",
              "title": "Build Yourself a Redux",
              "url": "https://zapier.com/engineering/how-to-build-redux/",
              "author": "jdeal",
              "points": 395,
              "story_text": null,
              "comment_text": null,
              "num_comments": 155,
              "story_id": null,
              "story_title": null,
              "story_url": null,
              "parent_id": null,
              "created_at_i": 1493993657,
              "relevancy_score": 7406,
              "_tags": [
                "story",
                "author_jdeal",
                "story_14273549"
              ],
              "objectID": "14273549",
              "_highlightResult": {
                "title": {
                  "value": "Build Yourself a \u003cem\u003eRedux\u003c/em\u003e",
                  "matchLevel": "full",
                  "fullyHighlighted": false,
                  "matchedWords": [
                    "redux"
                  ]
                },
                "url": {
                  "value": "https://zapier.com/engineering/how-to-build-\u003cem\u003eredux\u003c/em\u003e/",
                  "matchLevel": "full",
                  "fullyHighlighted": false,
                  "matchedWords": [
                    "redux"
                  ]
                },
                "author": {
                  "value": "jdeal",
                  "matchLevel": "none",
                  "matchedWords": [
                    
                  ]
                }
              }
            }
          ],
          nbHits : 13068,
          page : 0,
          nbPages : 10,
          hitsPerPage : 100,
          exhaustiveNbHits : false,
          query : "redux",
          params : "advancedSyntax=true&analytics=true&analyticsTags=backend&hitsPerPage=100&query=redux",
          processingTimeMS : 5
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(news)
      })
    );
  
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<News  />, container);
    });
  
    expect(container.querySelector(".domain").getAttribute("href")).toEqual(news.hits[0].url);
    
  });