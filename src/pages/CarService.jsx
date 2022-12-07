import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Toast } from "../components/utility/NotifyInfo";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { REQ_URL } from "../constants";
import PropTypes from "prop-types";

const IMG_LENGTH = 5;

const validateInputs = (data, setErrors) => {
  const carmodel = data.get("carmodel");
  const price = data.get("price");
  const phoneno = data.get("phoneno");
  const images = data.getAll("images");
  const noofimages = data.get("noofimages");

  if (carmodel.length < 3) {
    Toast("error", "Car model should be atleast 3 characters long");
    setErrors((prev) => ({ ...prev, carmodel: true }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, carmodel: false }));
  }
  if (price < 1) {
    Toast("error", "Price should be atleast 1");
    setErrors((prev) => ({ ...prev, price: true }));

    return false;
  } else {
    setErrors((prev) => ({ ...prev, price: false }));
  }
  let test = !/\D/.test(phoneno);
  if (phoneno.length !== 11 || !test) {
    Toast("error", "Phone number should be 11 characters long (digits)");
    setErrors((prev) => ({ ...prev, phoneno: true }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, phoneno: false }));
  }
  if (noofimages < 1 || noofimages > 10) {
    Toast("error", "No of images should be from 1-10");
    setErrors((prev) => ({ ...prev, noofimages: true }));
    return false;
  } else {
    setErrors((prev) => ({ ...prev, noofimages: false }));
  }
  if (images.length > noofimages) {
    Toast("error", `Images should be upto  ${noofimages}`);
    setErrors((prev) => ({ ...prev, images: true }));
    return false;
  }
  setErrors((prev) => ({
    ...prev,
    carmodel: false,
    price: false,
    phoneno: false,
    noofimages: false,
    images: false,
  }));
  return true;
};

const CarService = ({ activeUser }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [errors, setErrors] = useState({
    carmodel: false,
    price: false,
    phoneno: false,
    noofimages: false,

    images: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("userid", activeUser._id);
    const isValid = validateInputs(data, setErrors);
    if (isValid) {
      axios
        .post(`${REQ_URL}/api/car/insertcar`, data)
        .then((res) => {
          if (res.data.status === "ok") {
            Toast("success", "Car added successfully");
          } else {
            Toast("error", res.data.message);
          }
        })
        .catch((err) => {
          Toast("error", err.message);
        });
    }
  };
  if (!activeUser) {
    return <h1>Not Authorized</h1>;
  }
  return (
    <div>
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Add Car
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                error={errors.carmodel}
                required
                fullWidth
                id="carmodel"
                type="text"
                label="Car Model"
                name="carmodel"
                autoComplete="carmodel"
                autoFocus
              />
              <TextField
                margin="normal"
                error={errors.price}
                required
                fullWidth
                name="price"
                label="price"
                type="number"
                id="price"
                autoComplete="price"
              />
              <TextField
                margin="normal"
                error={errors.phoneno}
                required
                fullWidth
                id="phoneno"
                type="text"
                label="Phone Number"
                name="phoneno"
                autoComplete="phoneno"
              />
              <TextField
                margin="normal"
                error={errors.noofimages}
                required
                fullWidth
                name="noofimages"
                label="No of Images"
                type="number"
                id="noofimages"
                autoComplete="noofimages"
              />
              <TextField
                margin="normal"
                error={errors.images}
                required
                fullWidth
                id="images"
                type="file"
                inputProps={{
                  multiple: true,
                }}
                onChange={(e) => {
                  setSelectedFiles(e.target.files);
                }}
                outline="none"
                name="images"
                autoComplete="images"
              />

              {/* images preview */}
              <Box>
                {selectedFiles.length > 0 && (
                  <ImageList
                    sx={{ width: 500, height: 300 }}
                    cols={3}
                    rowHeight={164}
                  >
                    {Array.from(selectedFiles).map((item) => (
                      <ImageListItem key={item.name}>
                        <Box
                          sx={{
                            width: 164,
                            height: 164,
                            margin: 1,
                            bgcolor: "grey.300",
                            borderRadius: 1,
                            overflow: "hidden",
                          }}
                        >
                          <img
                            src={URL.createObjectURL(item)}
                            alt={item.name}
                            loading="lazy"
                          />
                        </Box>
                      </ImageListItem>
                    ))}
                  </ImageList>
                )}
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
    </div>
  );
};

CarService.propTypes = {
  activeUser: PropTypes.object,
};

export default CarService;
