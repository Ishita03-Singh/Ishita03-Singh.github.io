import 'package:flutter/material.dart';
import 'package:ishita_singh/utilities/appcolors.dart';
import 'package:responsive_sizer/responsive_sizer.dart';
import 'dart:html' as html;

class ProjectsScreen extends StatelessWidget {
  late var sw;
  ProjectsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    sw = MediaQuery.of(context).size.width;
    return Padding(
      padding: EdgeInsets.only(
          left: Adaptive.w(5), right: Adaptive.w(5), bottom: Adaptive.w(20)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          "Some Things I've Built",
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
          padding: EdgeInsets.only(top: Adaptive.h(10)),
          child: showProjectsColumn(),
        )
      ]),
    );
  }

  showProjectsColumn() {
    return Column(
      children: [
        IntrinsicHeight(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              giveProjectCard(
                  'https://github.com/Ishita03-Singh/Avekshaka/raw/master/avekshaka%20snapshots/1656184460448_100.PNG',
                  'AvekShaka',
                  'Android Studio, Java, Firebase',
                  'Monitor the security standards of people with dementia with repeated reminders. Contains exercises and notes for motor development.',
                  'https://github.com/Ishita03-Singh/Avekshaka',
                  'AvekShaka'),
              SizedBox(
                width: Adaptive.w(10),
              ),
              giveProjectCard(
                  'https://github.com/Ishita03-Singh/Covi-Eye/raw/master/WhatsApp%20Image%202021-11-14%20at%205.40.45%20PM%20(2).jpeg',
                  'Covi-Eye',
                  'Android Studio, Java',
                  'Measure heart rate and oxygen rate with camera and flashlight. User can share resulted value with current location.',
                  'https://github.com/Ishita03-Singh/Covi-Eye',
                  'Covi-Eye'),
            ],
          ),
        ),
        SizedBox(
          height: Adaptive.h(4),
        ),
        IntrinsicHeight(
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              giveProjectCard(
                  'https://github.com/Ishita03-Singh/News-Feed/raw/master/screenshot%203.jpeg',
                  'NewsFeed',
                  'Android Studio, Kotlin, News Api',
                  'Shows trending news on daily update. It also allow users to select their field of interest and then display news related to that field of interest only.',
                  'https://github.com/Ishita03-Singh/News-Feed',
                  'NewsFeed'),
              SizedBox(
                width: Adaptive.w(10),
              ),
              giveProjectCard(
                  'https://github.com/Ishita03-Singh/Avekshaka/raw/master/avekshaka%20snapshots/1656184460448_100.PNG',
                  'AvekShaka',
                  'Android Studio, Java, Firebase',
                  'Monitor the security standards of people with dementia with repeated reminders. Contains exercises and notes for motor development.',
                  'https://github.com/Ishita03-Singh/Avekshaka',
                  'AvekShaka'),
            ],
          ),
        )
      ],
    );
  }

  giveProjectCard(String imageURL, String projectTitle, String tech,
      String description, String projectURL, String projectURLName) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.bgProgressTextColor.withOpacity(0.6),
        // borderRadius: BorderRadius.only(
        //     topRight: Radius.circular(10), bottomRight: Radius.circular(10)),
      ),
      // color: Colors.green,
      child: Row(
        children: [
          if ((sw) >= 450) giveProjectImage(imageURL),
          Container(
            width: sw <= 450 ? Adaptive.w(30) : Adaptive.w(20),
            padding: EdgeInsets.all(Adaptive.w(2)),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text(
                    projectTitle,
                    style: TextStyle(
                        color: AppColors.headColor,
                        fontWeight: FontWeight.bold,
                        fontSize: 16.sp),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: Adaptive.h(2)),
                  Text(
                    description,
                    style: TextStyle(
                        color: AppColors.greyTextColor,
                        fontWeight: FontWeight.w400,
                        fontSize: 11.sp),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: Adaptive.h(2)),
                  Container(
                    height: 1.3,
                    color: AppColors.greyTextColor,
                  ),
                  SizedBox(height: Adaptive.h(2)),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        width: Adaptive.w(10),
                        child: Text(
                          tech,
                          style: TextStyle(
                              color: AppColors.hoverTextColor,
                              fontWeight: FontWeight.w200,
                              fontFamily: 'SFMono',
                              fontSize: 10.sp),
                        ),
                      ),
                      GestureDetector(
                          onTap: () {
                            html.window.open(projectURL, projectURLName);
                          },
                          child: Image.network(
                            'https://cdn-icons-png.flaticon.com/128/2111/2111425.png',
                            width: Adaptive.w(2),
                            color: AppColors.darkgreyColor,
                          ))
                    ],
                  ),
                ]),
          )
        ],
      ),
    );
  }

  giveProjectImage(String imageURL) {
    return Container(
      child: Image.network(
        imageURL,
        fit: BoxFit.fill,
        width: Adaptive.w(10),
      ),
    );
  }
}
