import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';

export function showAvatarPicker(callback) {
    let options = {
        title: '选择头像',
        takePhotoButtonTitle: '拍照...',
        chooseFromLibraryButtonTitle: '从手机相册选择',
        cancelButtonTitle: '取消',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };

    ImagePicker.showImagePicker(options, callback);
}

// Launch Camera
export function takePicture(callback) {
    let options = {};
    ImagePicker.launchCamera(options, callback);
}

// Open Image Library
export function selectFromLibrary(callback) {
    let options = {};
    ImagePicker.launchImageLibrary(options, callback);
}
