import 'package:flutter/material.dart';
import 'dart:html' as html;
import 'package:url_launcher/url_launcher.dart';
import 'package:ishita_singh/utilities/appcolors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

class ConatactScreen extends StatefulWidget {
  ConatactScreen({super.key});

  @override
  State<ConatactScreen> createState() => _ConatactScreenState();
}

class _ConatactScreenState extends State<ConatactScreen> {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
          left: Adaptive.w(5), right: Adaptive.w(5), bottom: Adaptive.h(8)),
      child: Column(
        children: [
          Text(
            "What's Next?",
            style: TextStyle(
                color: AppColors.hoverTextColor,
                fontSize: 12.sp,
                fontFamily: 'SFMono'),
          ),
          Padding(
            padding: EdgeInsets.all(Adaptive.h(2)),
            child: Text(
              "Get In Touch",
              style: TextStyle(
                  color: AppColors.headColor,
                  fontWeight: FontWeight.w700,
                  fontSize: 20.sp),
            ),
          ),
          Container(
            width: Adaptive.w(30),
            child: Text(
              textAlign: TextAlign.center,
              "My inbox is always open. Whether you have a question or just want to say hello, I'll try my best to get back to you! Feel free to mail me about any relevant job updates.",
              style: TextStyle(color: AppColors.greyTextColor, fontSize: 12.sp),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(top: Adaptive.w(8)),
            child: TextButton(
                onPressed: () async {
                  var url = Uri.parse("mailto:ishitasingh150301@gmail.com");
                  if (await canLaunchUrl(url)) {
                    await launchUrl(url);
                  } else {
                    throw 'Could not launch ';
                  }
                },
                style: ButtonStyle(
                    side: MaterialStateProperty.all(BorderSide(
                        style: BorderStyle.solid,
                        color: AppColors.hoverTextColor,
                        width: 1.0))),
                child: Padding(
                  padding: const EdgeInsets.all(12.0),
                  child: Text(
                    'Mail Me',
                    style: TextStyle(
                        fontSize: 12.sp,
                        color: AppColors.hoverTextColor,
                        fontFamily: 'SFMono',
                        fontWeight: FontWeight.w200),
                  ),
                )),
          ),
        ],
      ),
    );
  }
}
//icons add
// navigation control


  // color: AppColors.expBoxColor,
        // height: 100,
        // child: Row(
        //   mainAxisAlignment: MainAxisAlignment.center,
        //   children: [
        //     InkWell(
        //       onTap: () {
        //         html.window.open(
        //             'https://www.linkedin.com/in/ishita-singh-creater/',
        //             'LinkedIn');
        //       },
        //       child: Image.asset(
        //         'linkedin.png',
        //         color: Color.fromARGB(221, 255, 255, 255),
        //       ),
        //     ),
        //     SizedBox(
        //       width: Adaptive.w(1),
        //     ),
        //     InkWell(
        //       onTap: () {
        //         html.window.open('https://github.com/Ishita03-Singh/', 'Github');
        //       },
        //       child: Image.asset(
        //         'github.png',
        //         color: Color.fromARGB(221, 255, 255, 255),
        //       ),
        //     ),
        //     SizedBox(
        //       width: Adaptive.w(1),
        //     ),
        //     InkWell(
        //       onTap: () {
        //         html.window.open(
        //             'https://www.instagram.com/iishitaaasingh/', 'instagram');
        //       },
        //       child: Image.asset(
        //         'instagram.png',
        //         color: Color.fromARGB(221, 255, 255, 255),
        //       ),
        //     ),
        //     SizedBox(
        //       width: Adaptive.w(1),
        //     ),
        //     InkWell(
        //       onTap: () {},
        //       child: Image.asset(
        //         'behance.png',
        //         color: Color.fromARGB(221, 255, 255, 255),
        //       ),
        //     ),
        //     SizedBox(
        //       width: Adaptive.w(1),
        //     ),
        //     InkWell(
        //       onTap: () {
        //         html.window
        //             .open('https://twitter.com/ISHITAS49743589', 'Twitter');
        //       },
        //       child: Image.asset(
        //         'twitter.png',
        //         color: Color.fromARGB(221, 255, 255, 255),
        //       ),
        //     ),
        //   ],
        // ),