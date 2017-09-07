import React, {Component} from 'react';
import {View} from 'react-native';

import {Avatar} from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';

export function showAvatarPicker(callback = ()=>{}) {
    let options = {
        title: '选择头像',
        /*customButtons: [
            {name: 'selectpicture', title: '从手机相册选择'},
            {name: 'takepicture', title:'拍照...'}
        ],*/
        takePhotoButtonTitle: '拍照...',
        chooseFromLibraryButtonTitle: '从手机相册选择',
        cancelButtonTitle: '取消',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        }
    };

    let doCallback;
    if (callback !== null && callback !== undefined){
        doCallback = callback;
    } else {
        doCallback = (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        }
    }

    ImagePicker.showImagePicker(options, doCallback);
}

class AvatarPickerDemo extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            avatarSource: null,
        };
    }

    render() {
        return (
            <Avatar rounded
                    large
                    source={this.state.avatarSource}
                    onPress={() => showAvatarPicker()}
                    activeOpacity={0.7}
            />
        );
    }
}

export default AvatarPickerDemo;