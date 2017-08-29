package com.chargingpileapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.yunpeng.alipay.AlipayPackage;
import com.theweflex.react.WeChatPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.yunpeng.alipay.AlipayPackage;
import com.theweflex.react.WeChatPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.yunpeng.alipay.AlipayPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new AlipayPackage(),
            new WeChatPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new RCTCameraPackage(),
            new AlipayPackage(),
            new WeChatPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new RCTCameraPackage(),
            new AlipayPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new ImagePickerPackage(),
            new RCTCameraPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
