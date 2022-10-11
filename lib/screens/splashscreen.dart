import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:ishita_singh/screens/home_screen.dart';
import 'package:ishita_singh/screens/main_screen.dart';
import 'package:ishita_singh/utilities/appcolors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:splash_screen_view/SplashScreenView.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SplashScreenView(
        navigateRoute: MainPage(),
        duration: 3000,
        imageSize: 130,
        imageSrc: "assets/I.png",
        text: "Hello, I am Ishita Singh",
        textType: TextType.TyperAnimatedText,
        textStyle: TextStyle(
          fontSize: 18.sp,
          fontFamily: 'SFMono',
          color: AppColors.greyTextColor,
        ),
        backgroundColor: AppColors.primaryColor,
      ),
    );
  }
}
