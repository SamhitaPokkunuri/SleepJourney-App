import '/flutter_flow/flutter_flow_button_tabbar.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'tools_widget.dart' show ToolsWidget;
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:just_audio/just_audio.dart';
import 'package:provider/provider.dart';

class ToolsModel extends FlutterFlowModel<ToolsWidget> {
  ///  State fields for stateful widgets in this page.

  final unfocusNode = FocusNode();
  // State field(s) for TabBar widget.
  TabController? tabBarController;
  int get tabBarCurrentIndex =>
      tabBarController != null ? tabBarController!.index : 0;

  AudioPlayer? soundPlayer1;
  AudioPlayer? soundPlayer2;
  AudioPlayer? soundPlayer3;
  AudioPlayer? soundPlayer4;
  AudioPlayer? soundPlayer5;
  AudioPlayer? soundPlayer6;
  AudioPlayer? soundPlayer7;
  AudioPlayer? soundPlayer8;
  AudioPlayer? soundPlayer9;
  AudioPlayer? soundPlayer10;
  AudioPlayer? soundPlayer11;
  AudioPlayer? soundPlayer12;
  AudioPlayer? soundPlayer13;
  AudioPlayer? soundPlayer14;
  AudioPlayer? soundPlayer15;
  AudioPlayer? soundPlayer16;
  AudioPlayer? soundPlayer17;
  AudioPlayer? soundPlayer18;
  AudioPlayer? soundPlayer19;
  AudioPlayer? soundPlayer20;
  AudioPlayer? soundPlayer21;
  AudioPlayer? soundPlayer22;
  AudioPlayer? soundPlayer23;
  AudioPlayer? soundPlayer24;
  AudioPlayer? soundPlayer25;
  AudioPlayer? soundPlayer26;
  AudioPlayer? soundPlayer27;
  AudioPlayer? soundPlayer28;
  AudioPlayer? soundPlayer29;
  AudioPlayer? soundPlayer30;
  AudioPlayer? soundPlayer31;
  AudioPlayer? soundPlayer32;
  AudioPlayer? soundPlayer33;
  AudioPlayer? soundPlayer34;
  AudioPlayer? soundPlayer35;
  AudioPlayer? soundPlayer36;
  AudioPlayer? soundPlayer37;
  AudioPlayer? soundPlayer38;
  AudioPlayer? soundPlayer39;
  AudioPlayer? soundPlayer40;

  /// Initialization and disposal methods.

  void initState(BuildContext context) {}

  void dispose() {
    unfocusNode.dispose();
    tabBarController?.dispose();
  }

  /// Action blocks are added here.

  /// Additional helper methods are added here.
}
