import React, { useState } from "react";
import ImageListItem from "@mui/material/ImageListItem";
import ItemProps from "../types/ItemProps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface GalleryContainerProps {
  items: ItemProps[];
  onClickEdit: (item: ItemProps) => void;
  removeItem: (item: ItemProps) => void;
  fetchMoreData: () => void;
  hasMore: boolean;
  imgWidth?: number;
  imgHeight?: number;
}

const ImageTitle = styled("p")({
  lineHeight: 1,
  overflowWrap: "anywhere",
  fontSize: 20,
  fontFamily: "fantasy",
});

const ItemMenu = styled("div")({
  position: "absolute",
  top: 10,
  right: 10,
  opacity: 50,
});

export default function GalleryContainer({
  items,
  onClickEdit,
  removeItem,
  fetchMoreData,
  hasMore,
  imgWidth = 600,
  imgHeight = 600,
}: GalleryContainerProps) {
  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {items.map((item) => (
        <ImageListItem
          key={item.id}
          sx={{
            width: 600,
            border: "3px solid gray",
            padding: 1,
            margin: 1,
            "&:hover .itemMenu": {
              display: "flex",
            },
          }}
        >
          <LazyLoadImage
            src={`${item.url}`}
            width={imgWidth}
            height={imgHeight}
          />
          <ImageTitle>{`${item.id} - ${item.title}`}</ImageTitle>
          <ItemMenu
            sx={{
              display: "none",
              flexDirection: "column",
              opacity: "30%",
              backgroundColor: "white",
              padding: 1,
            }}
            className="itemMenu"
          >
            <DeleteOutlineIcon
              sx={{ color: "#FF0000", cursor: "pointer" }}
              fontSize="large"
              onClick={() => removeItem(item)}
            />
            <EditIcon
              onClick={() => onClickEdit(item)}
              fontSize="large"
              sx={{ cursor: "pointer" }}
            />
          </ItemMenu>
        </ImageListItem>
      ))}
    </InfiniteScroll>
  );
}
