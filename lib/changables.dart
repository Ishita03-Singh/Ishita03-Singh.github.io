import 'package:flutter/cupertino.dart';

class Changables with ChangeNotifier {
  ValueNotifier<int> changableCount = ValueNotifier<int>(0);
}

Changables changables = Changables();
