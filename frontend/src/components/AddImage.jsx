import { Box, Button, CircularProgress, IconButton, TextField, Typography, useTheme } from "@mui/material";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from "react";
import { useDropZone } from "../hooks/useDropZone";
import { deleteMedia, uploadMedia } from "../services/uploadMedia";

const ImageInputContainer = (props) => {
    return (
        <Box
            {...props}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexGrow={1}
            height='120px'
            gap={1}
            my={1}
            sx={{
                position: 'relative',
                borderRadius: '10px',
                borderStyle: 'solid',
                borderWidth: '1px',
                borderColor: 'rgb(47, 133, 247)',
                backgroundColor: 'rgba(47, 133, 247, 0.2)',
                cursor: 'pointer'
            }}>
            {props.children}
        </Box>)
}

const AddImage = ({ imageLink, setImageLink }) => {
    const options = {
        multiple: false,
        accept: 'image/*'
    }
    const { files, rootProps, inputProps, removeFile } = useDropZone(options)

    useEffect(() => {
        if (files.length > 0) {
            uploadMedia(files[0]).then((path) => {
                setImageLink(path)
            })
        }
    }, [files])

    const removeFileHandler = () => {
        if (imageLink) {
            // deleteMedia(imageLink)
        }
        setImageLink(undefined)
        removeFile()
    }

    if (imageLink) {
        return (
            <ImageInputContainer>
                <img src={imageLink} style={{ display: 'block', height: '110px' }} />
                <IconButton
                    onClick={removeFileHandler}
                    sx={{
                        position: 'absolute',
                        right: '2px',
                        bottom: '2px',
                        color: 'rgb(47, 133, 247)'
                    }}
                >
                    <EditIcon />
                </IconButton>
            </ImageInputContainer>
        )
    }

    return (
        <ImageInputContainer {...rootProps}>
            <AddAPhotoIcon sx={{ color: 'rgb(47, 133, 247)', fontSize: '25px' }} />
            <Typography sx={{ color: 'rgb(47, 133, 247)', fontSize: '15px' }}>
                Add Image
            </Typography>
            <input style={{ display: 'none' }} {...inputProps} />

        </ImageInputContainer>);
}

export default AddImage