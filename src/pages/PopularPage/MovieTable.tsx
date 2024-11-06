import React, { useEffect } from "react";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";

const images = [
  "image1.jpg",
  "image2.jpg",
  "image3.jpg",
  "image4.jpg",
  "image5.jpg",
  "image6.jpg",
  "image7.jpg",
  "image8.jpg",
  "image9.jpg",
  "image10.jpg",
  "image11.jpg",
  "image12.jpg",
  "image13.jpg",
  "image14.jpg",
  "image15.jpg",
  "image16.jpg",
];


export default function MovieTable() {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 스크롤 금지
    document.body.style.overflow = "hidden";

    // 컴포넌트가 언마운트될 때 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트/언마운트 될 때만 실행

  return (
    <Grid container spacing={2}>
      {images.map((src, index) => (
        <Grid size={{ md: 3, sm: 4, xs: 6 }} key={index}>
          <Box
            component="img"
            src="/popular.svg"
            alt={`Image ${index + 1}`}
            sx={{
              width: "100%", // 가로폭을 100%로 설정
              height: "auto", // 비율에 맞춰 높이 자동 조절
              objectFit: "cover",
              borderRadius: 1,
              transition: "transform 0.5s ease",
              ":hover": {
                transform: `scale(1.05)`,
              },
            }}
          />
          <Typography variant="subtitle1" align="center">
            제목제목
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

