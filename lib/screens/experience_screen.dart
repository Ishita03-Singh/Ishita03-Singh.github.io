import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:ishita_singh/utilities/appcolors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';

class ExperienceScreen extends StatefulWidget {
  final sw;
  const ExperienceScreen({super.key, this.sw});

  @override
  State<ExperienceScreen> createState() => _ExperienceScreenState();
}

class _ExperienceScreenState extends State<ExperienceScreen> {
  int id = 1;
  late Container adaptiveContainer;
  // late Container selectedbtnContainer;

  @override
  void initState() {
    adaptiveContainer = setContainerContent(id);
    // selectedbtnContainer = defaultsmallContainer(Colors.green);
  }

  @override
  Widget build(BuildContext context) {
    adaptiveContainer = setContainerContent(id);
    // print(selectedbtnContainer);
    return Padding(
      padding: EdgeInsets.only(
          left: Adaptive.w(5), right: Adaptive.w(5), bottom: Adaptive.w(20)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          "Where I've Worked",
          style: TextStyle(
              color: AppColors.headColor,
              fontSize: 18.sp,
              fontWeight: FontWeight.w700),
        ),
        Container(
          color: AppColors.greyTextColor,
          width: widget.sw,
          height: 2,
        ),
        SizedBox(
          height: Adaptive.w(6),
        ),
        IntrinsicHeight(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Padding(
                padding: EdgeInsets.only(right: Adaptive.w(5)),
                child: Container(
                  width: Adaptive.w(15),
                  color: AppColors.primaryColor,
                  child: FieldButtons(),
                ),
              ),
              adaptiveContainer
            ],
          ),
        )
      ]),
    );
  }

  FieldButtons() {
    return Column(
      children: [
        fieldbtnElement('Internships', 1),
        fieldbtnElement('Hackathons', 2),
        fieldbtnElement('Profiles', 3),
        fieldbtnElement('Volunteer', 4),
      ],
    );
  }

  fieldbtnElement(String text, int idss) {
    return IntrinsicHeight(
      child: Row(
        children: [
          selectedsmallContainer(
              id == idss ? AppColors.hoverTextColor : AppColors.darkgreyColor,
              id == idss ? Adaptive.w(0.15) : Adaptive.w(0.1)),
          Expanded(
            child: TextButton(
              style: TextButton.styleFrom(
                  backgroundColor: id == idss
                      ? AppColors.greyTextColor.withOpacity(0.08)
                      : Colors.transparent),
              onPressed: () {
                setState(() {
                  id = idss;
                  adaptiveContainer = setContainerContent(id);
                });
              },
              child: Padding(
                padding: EdgeInsets.all(12.sp),
                child: Align(
                  alignment: Alignment.topLeft,
                  child: Text(text,
                      style: TextStyle(
                          fontFamily: 'SFMono',
                          fontSize: 11.sp,
                          fontWeight: FontWeight.w600,
                          color: id == idss
                              ? AppColors.hoverTextColor
                              : AppColors.darkgreyColor)),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  setContainerContent(int id) {
    if (id == 1) {
      return internshipContainer();
    }
    if (id == 2) {
      return espContainer();
    }
    if (id == 3) {
      return profileContainer();
    }
    if (id == 4) {
      return volunteerContainer();
    }
  }

  profileContainer() {
    return Container(
        padding: EdgeInsets.all(10.sp),
        color: AppColors.primaryColor,
        width: Adaptive.w(40),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(
            'Profile Container',
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.bold),
          ),
          Text(
            'The Sparks Foundation',
            style: TextStyle(
                color: AppColors.hoverTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.bold),
          ),
          Text(
            'feb 2021 - mar 2021',
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 12.sp,
                fontWeight: FontWeight.normal),
          ),
          SizedBox(
            height: Adaptive.w(3),
          ),
          Text(
            "Added sign in feature with Google and Facebook.Worked with Firebase Authentication. Displayed data of user like name, id after sign in.",
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 14.sp,
                fontWeight: FontWeight.normal),
          ),
        ]));
  }

  internshipContainer() {
    return Container(
        padding: EdgeInsets.all(10.sp),
        color: AppColors.primaryColor,
        width: Adaptive.w(30),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(
            'Android App Development Intern',
            style: TextStyle(
                color: AppColors.headColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.w500),
          ),
          Text(
            '@ The Sparks Foundation',
            style: TextStyle(
                color: AppColors.hoverTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.w500),
          ),
          Padding(
            padding: EdgeInsets.only(top: Adaptive.h(1.5)),
            child: Text(
              'feb 2021 - mar 2021',
              style: TextStyle(
                  color: AppColors.greyTextColor,
                  fontSize: 12.sp,
                  fontFamily: 'SFMono',
                  fontWeight: FontWeight.normal),
            ),
          ),
          SizedBox(
            height: Adaptive.w(3),
          ),
          Text(
            "Added sign in feature with Google and Facebook.Worked with Firebase Authentication. Displayed data of user like name, id after sign in.",
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 14.sp,
                fontWeight: FontWeight.normal),
          ),
        ]));
  }

  espContainer() {
    return Container(
        padding: EdgeInsets.all(10.sp),
        color: AppColors.primaryColor,
        width: Adaptive.w(40),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(
            'Hackathons Container',
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.bold),
          ),
          Text(
            'The Sparks Foundation',
            style: TextStyle(
                color: AppColors.hoverTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.bold),
          ),
          Text(
            'feb 2021 - mar 2021',
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 12.sp,
                fontWeight: FontWeight.normal),
          ),
          SizedBox(
            height: Adaptive.w(3),
          ),
          Text(
            "Added sign in feature with Google and Facebook.Worked with Firebase Authentication. Displayed data of user like name, id after sign in.",
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 14.sp,
                fontWeight: FontWeight.normal),
          ),
        ]));
  }

  volunteerContainer() {
    return Container(
        padding: EdgeInsets.all(10.sp),
        color: AppColors.primaryColor,
        width: Adaptive.w(40),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(
            'Volunteer Container',
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.bold),
          ),
          Text(
            'The Sparks Foundation',
            style: TextStyle(
                color: AppColors.hoverTextColor,
                fontSize: 16.sp,
                fontWeight: FontWeight.bold),
          ),
          Text(
            'feb 2021 - mar 2021',
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 12.sp,
                fontWeight: FontWeight.normal),
          ),
          SizedBox(
            height: Adaptive.w(3),
          ),
          Text(
            "Added sign in feature with Google and Facebook.Worked with Firebase Authentication. Displayed data of user like name, id after sign in.",
            style: TextStyle(
                color: AppColors.greyTextColor,
                fontSize: 14.sp,
                fontWeight: FontWeight.normal),
          ),
        ]));
  }

  // setSmallContainerContent(int id) {
  //   if (id == 1) {
  //     return internshipContainer();
  //   }
  //   if (id == 2) {
  //     return espContainer();
  //   }
  //   if (id == 3) {
  //     return profileContainer();
  //   }
  //   if (id == 4) {
  //     return volunteerContainer();
  //   }
  // }

  selectedsmallContainer(Color color, double contWidth) {
    return Container(
      width: contWidth,
      color: color,
    );
  }

  defaultsmallContainer(Color color, double contWidth) {
    return Container(
      width: contWidth,
      color: color,
    );
  }
}
