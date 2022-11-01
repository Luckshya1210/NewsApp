import React from 'react'
import { useEffect } from 'react';
import {useState} from 'react';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";
const News=(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalart, setTotalart] = useState(0)
    
    const capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
      
    // constructor(props) {
    //     super(props);
    //     console.log("I am a constructor");
        // this.state = {
            //     //use state when variables change without loading the page
            //     articles: [],
        //     loading: true,
        //     page:1,
        //     totalart:0,
        //     // totalResults:0
        // }
        // }
        const updatec=async()=>{
            props.setprogress(0);
            let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b361606f21874591983c1913f4cbd6d1&page=${page}&pageSize=${props.pageSize}`;
            // {this.setState({loading:true})}
            setLoading(true)
            props.setprogress(30);
            let res=await fetch(url);
            let data=await res.json();
            props.setprogress(70);
            // console.log(data);
            setArticles(data.articles)
            setTotalart(data.totalResults)
            setLoading(false)
            // this.setState(
                //     {
            //         articles:data.articles,
            //         totalart:data.totalResults,
            //         loading:false,
            //     }
            // )
            props.setprogress(100);
            
        }
        useEffect(() => {
            document.title=`${capitalizeFirstLetter(props.category)} - NewsMonkey`;
            
            updatec()
             // eslint-disable-next-line
    }, [])
    
    
    //     const handleprevclick= async ()=>{
        //         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b361606f21874591983c1913f4cbd6d1&page=${this.state.page-1}&pageSize=${props.pageSize}`;
        //         {this.setState({loading:true})}
        //         let res=await fetch(url);
//         let data=await res.json();
//         // console.log(data);
    
            
//             this.setState(
//                 {
//                 articles:data.articles,
//                 page:this.state.page-1,
//                 totalart:data.totalResults,
//                 loading:false,
//             }
//         )
//     }
//    const  handleclick= async ()=>
//     {
//         if(Math.ceil(this.state.totalart/props.pageSize)<this.state.page+1){

//         }
//         else{
//             let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b361606f21874591983c1913f4cbd6d1&page=${this.state.page+1}&pageSize=${props.pageSize}`;
//             {this.setState({loading:true})}
//             let res=await fetch(url);
//             let data=await res.json();
//             // console.log(data);
//             // {this.setState({loading:false})}
                
//                 this.setState(
//                     {
//                     articles:data.articles,
//                     page:this.state.page+1,
//                     totalart:data.totalResults,
//                     loading:false,
//                 }
//             )
//         }
//     }
    const fetchMoreData = async () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        // setTimeout(() => {
        //   this.setState({
        //     items: this.state.items.concat(Array.from({ length: 20 }))
        //   });
        // }, 1500);
        // this.setState({page:this.state.page+1});
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b361606f21874591983c1913f4cbd6d1&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        // {this.setState({loading:true})}
        let res=await fetch(url);
        let data=await res.json();
        // console.log(data);
        // {this.setState({loading:false})}
            setArticles(articles.concat(data.articles))
            setTotalart(data.totalResults)
            // if(totalart==articles){
            //     setLoading(false)
            // }
            // this.setState(
            //     {
            //     articles:articles.concat(data.articles),
            //     totalart:data.totalResults,
            //     // loading:false,
            // }
        // )
      };
   
        return (
            <>
            
            {/* // <div className='container my-3'> */}
                <h1 className='text-center' style={{margin:'40px 0px',marginTop:'90px'}}>NewsMonkey-Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner/>}
                {/* map the elements */}
                <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalart}
          loader={<Spinner/>}
        >
                    <div className='container'>

                <div className='row' >
                {
                    articles.map((element)=>{
                        return (
                            
                        <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,60):""} description={element.description?element.description.slice(0,100):""} imageUrl={element.urlToImage?element.urlToImage:"https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA="}
                            newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                        
                        )
                    })}

                    </div>
                    </div>
    </InfiniteScroll>
   {/* {this.setState({loading:false})} */}
            {/* <div className='container d-flex justify-content-between'>
                  <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>&larr; Previous</button>
                 <button disabled={Math.ceil(this.state.totalart/props.pageSize)<this.state.page+1} type="button" className="btn btn-dark" onClick={this.handleclick}>Next &rarr;</button>
            </div> */}

            {/* </div> */}
            </>
        )
    }

News.defaultProps={
    country:"in",
    pageSize:9,
    category:"general"
}
News.propTypes={
    country:PropTypes.string,
    
    pageSize:PropTypes,
    category:PropTypes.string,
}
export default News
