import 'package:flutter/material.dart';
import 'package:ishita_singh/changables.dart';
import 'package:ishita_singh/utilities/appcolors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'package:percent_indicator/percent_indicator.dart';

class AboutScreen extends StatelessWidget {
  late final sw;
  AboutScreen({super.key});
  late String val;

  @override
  Widget build(BuildContext context) {
    sw = MediaQuery.of(context).size.width;
    return ValueListenableBuilder(
        valueListenable: changables.changableCount,
        builder: (context, value, _) {
          print("object");
          val = value.toString();
          return Padding(
            padding: EdgeInsets.only(
                left: Adaptive.w(5),
                right: Adaptive.w(5),
                bottom: Adaptive.w(20)),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'About me',
                  style: TextStyle(
                      color: AppColors.headColor,
                      fontSize: 18.sp,
                      fontWeight: FontWeight.w700),
                ),
                Container(
                  color: AppColors.greyTextColor,
                  width: sw,
                  height: 2,
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 30),
                  child: IntrinsicHeight(
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Column(
                            crossAxisAlignment: CrossAxisAlignment.center,
                            children: [
                              Container(
                                height: Adaptive.w(15),
                                width: Adaptive.w(13),
                                decoration: BoxDecoration(
                                  border: Border.all(
                                    color: AppColors.greyTextColor,
                                    width: 1.0,
                                    style: BorderStyle.solid,
                                  ),
                                ),
                                child: Padding(
                                  padding: EdgeInsets.all(Adaptive.w(1)),
                                  child: Image.network(
                                    'https://avatars.githubusercontent.com/u/76431570?v=4',
                                  ),
                                ),
                              ),
                              (sw) < 300 ? ShowSkills() : showNull(),
                            ]),
                        SizedBox(
                          width: Adaptive.w(8),
                        ),
                        Container(
                          width: Adaptive.w(35),
                          child: Text(
                            "Hello! I'm Ishita Singh, from Gurgaon. I am a creative, time punctual, dedicated, goal-oriented individual with decent moral Values and Ethics along with a high-energy level, honed communication skills, strong organizational skills, and meticulous attention to detail. I am pursuing my Bachelors from Dronacharya College of Engineering, Gurgaon in Computer Science and Engineering (2019-2023). My current GPA is 9.25 out of 10.",
                            style: TextStyle(
                                color: AppColors.greyTextColor,
                                fontWeight: FontWeight.w400,
                                fontSize: 14.sp),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                (sw) >= 300 ? ShowSkills() : showNull(),
              ],
            ),
          );
        });
  }

  ShowSkills() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(top: 20.sp),
          child: Text(
            'Skills',
            style: TextStyle(
                color: AppColors.headColor,
                fontSize: 18.sp,
                fontWeight: FontWeight.w700),
          ),
        ),
        ((sw) >= 300) ? showSkillsinRow() : showSkillsinColumn(),
      ],
    );
  }

  showNull() {
    return Container();
  }

  showSkillsinRow() {
    return Row(
      children: [
        Column(
          children: [
            skillbar(0.8, 'Flutter'),
            skillbar(0.7, 'Android'),
            skillbar(0.9, 'C/C++'),
          ],
        ),
        SizedBox(
          width: Adaptive.w(20),
        ),
        Column(
          children: [
            skillbar(0.6, 'Java'),
            skillbar(0.6, 'MySQL'),
            skillbar(0.5, 'C/C++'),
          ],
        )
      ],
    );
  }

  showSkillsinColumn() {
    return Column(
      children: [
        skillbar(0.5, 'Android'),
        skillbar(0.5, 'C/C++'),
        skillbar(0.5, 'C/C++'),
        skillbar(0.5, 'C/C++'),
        skillbar(0.5, 'C/C++'),
        skillbar(0.5, 'C/C++'),
      ],
    );
  }

  skillbar(double percentage, String titleText) {
    // print(changables.changableCount.value);
    print("jkhkjh");
    return Padding(
      padding: EdgeInsets.only(top: 7.sp),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            titleText,
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontWeight: FontWeight.w400,
                fontSize: 12.sp),
          ),
          LinearPercentIndicator(
            key: Key(val),
            width: Adaptive.w(25),
            lineHeight: Adaptive.w(0.6),
            percent: percentage,
            animation: true,
            animationDuration: 2000,
            backgroundColor: AppColors.bgProgressTextColor,
            barRadius: Radius.circular(20.sp),
            progressColor: AppColors.hoverTextColor.withOpacity(0.7),
          ),
        ],
      ),
    );
  }
}
