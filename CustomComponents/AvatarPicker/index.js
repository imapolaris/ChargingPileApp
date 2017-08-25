import React, {Component} from 'react';
import {View} from 'react-native';

import styles from './styles';
import {Avatar} from 'react-native-elements'
import ImagePicker from 'react-native-image-picker';

class AvatarPicker extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            avatarSource: null,
        };
    }

    _showAvatarPicker = () => {
        let options = {
            //title: '选择头像',
            customButton: [
                {name: 'selectpicture', title: '从手机相册选择'},
                {name: 'takepicture', title:'拍照'}
            ],
            storageOptions: {
                skipBackup: false,
                path: '../../Resources/Images',
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
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
        });
    };

    render() {
        return (
            <Avatar rounded
                    large
                    source={this.state.avatarSource}
                    onPress={this._showAvatarPicker}
                    activeOpacity={0.7}
            />
        );
    }
}

export default AvatarPicker;