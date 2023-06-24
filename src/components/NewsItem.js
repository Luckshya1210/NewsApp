import React from 'react'

const NewsItem = (props) => {
    // pages=2;

    let { title, description, imageUrl, newsUrl, author, date, source } = props;
    return (
        <div className='my-3'>
            <div className="card" >
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    position: 'absolute',
                    right: '0',
                    borderRadius:'16px'
                }}>

                    <span className=" badge rounded-pill bg-danger" >
                        {source}</span>
                </div>
                <img src={imageUrl ? imageUrl : "https://media.istockphoto.com/photos/breaking-news-world-news-with-map-backgorund-picture-id1182477852?k=20&m=1182477852&s=612x612&w=0&h=I3wdSzT_5h1y9dHq_YpZ9AqdIKg8epthr8Guva8FkPA="} className="card-img-top" alt="..." height="250px" />
                <div className="card-body">
                    <h5 className="card-title">{title}...
                    </h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author ? author : "Unknown "} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                </div>
            </div>
        </div>
    )

}

export default NewsItem
