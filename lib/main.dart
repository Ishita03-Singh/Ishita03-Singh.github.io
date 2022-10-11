import 'package:flutter/material.dart';
import 'package:ishita_singh/screens/splashscreen.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ResponsiveSizer(builder: (context, orientation, screenType) {
      return MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Ishita Singh',
        theme: ThemeData(
            fontFamily: 'Calibre',
            scrollbarTheme: const ScrollbarThemeData().copyWith(
                thumbColor: MaterialStateProperty.all(Colors.transparent))),
        home: SplashScreen(),
      );
    });
  }
}
//remove color stroke from scroll
