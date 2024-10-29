import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "./Spinner";

class ImageGallery extends Component {
    state = {
        allImages: [],      // Store all images initially
        images: [],         // Displayed images
        page: 1,            // Current page
        itemsPerPage: 3,    // Number of images per scroll/page
        hasMore: true,      // Whether there are more images to load
    };

    componentDidMount() {
        this.loadAllImages();
    }

    loadAllImages = () => {
        // Load all images from the public/images folder only once
        const context = require.context("../../public/images", false, /\.(png|jpe?g|svg)$/);
        const allImages = context.keys().map((key) => key.replace("./", ""));

        this.setState({ allImages }, this.loadImages);  // Set allImages and load initial batch
    };

    loadImages = () => {
        const { allImages, page, itemsPerPage } = this.state;
        
        // Calculate start and end indexes for slicing images
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = page * itemsPerPage;

        // Slice the allImages array to get the next set of images
        const newImages = allImages.slice(startIndex, endIndex);

        this.setState((prevState) => ({
            images: [...prevState.images, ...newImages],  // Append new images to existing ones
            hasMore: endIndex < allImages.length,         // Check if there's more to load
        }));
    };

    fetchMoreData = () => {
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }),  // Increment page
            this.loadImages                                  // Load next set
        );
    };

    render() {
        const { images, hasMore } = this.state;

        return (
            <div>
                <InfiniteScroll
                    dataLength={images.length}
                    next={this.fetchMoreData}
                    hasMore={hasMore}
                    loader={<Spinner />}
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {images.map((image, index) => (
                            <div key={index} style={{ margin: '10px' }}>
                                <img
                                    src={`${process.env.PUBLIC_URL}/images/${image}`}
                                    alt={`img-${index}`}
                                    style={{ width: '200px', height: '200px' }}
                                />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        );
    }
}

export default ImageGallery;
