import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";
const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalart, setTotalart] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
 
    const updatec = async () => {
        props.setprogress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b361606f21874591983c1913f4cbd6d1&page=${page}&pageSize=${props.pageSize}`;
       
        setLoading(true)
        props.setprogress(30);
        let res = await fetch(url);
        let data = await res.json();
        props.setprogress(70);
        
        setArticles(data.articles)
        setTotalart(data.totalResults)
        setLoading(false)
        
        props.setprogress(100);

    }
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsDaily`;

        updatec()
        // eslint-disable-next-line
    }, [])
 
    const fetchMoreData = async () => {
        
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b361606f21874591983c1913f4cbd6d1&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        
        let res = await fetch(url);
        let data = await res.json();
       
        setArticles(articles.concat(data.articles))
        setTotalart(data.totalResults)
        
    };

    return (
        <>

          
            <h1 className='text-center' style={{ margin: '40px 0px', marginTop: '90px' }}>NewsDaily-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            
            <InfiniteScroll
                dataLength={articles?.length}
                next={fetchMoreData}
                hasMore={articles?.length !== totalart}
                loader={<Spinner />}
            >
                <div className='container'>

                    <div className='row' >
                        {
                            articles?.map((element) => {
                                return (

                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title.slice(0, 60) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA="}
                                            newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>

                                )
                            })}

                    </div>
                </div>
            </InfiniteScroll>
            
        </>
    )
}

News.defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,

    pageSize: PropTypes,
    category: PropTypes.string,
}
export default News
