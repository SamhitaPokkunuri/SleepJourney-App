import '/flutter_flow/flutter_flow_button_tabbar.dart';
import '/flutter_flow/flutter_flow_icon_button.dart';
import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import '/flutter_flow/flutter_flow_widgets.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:just_audio/just_audio.dart';
import 'package:provider/provider.dart';
import 'tools_model.dart';
export 'tools_model.dart';

class ToolsWidget extends StatefulWidget {
  const ToolsWidget({Key? key}) : super(key: key);

  @override
  _ToolsWidgetState createState() => _ToolsWidgetState();
}

class _ToolsWidgetState extends State<ToolsWidget>
    with TickerProviderStateMixin {
  late ToolsModel _model;

  final scaffoldKey = GlobalKey<ScaffoldState>();

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => ToolsModel());

    _model.tabBarController = TabController(
      vsync: this,
      length: 5,
      initialIndex: 0,
    )..addListener(() => setState(() {}));
    WidgetsBinding.instance.addPostFrameCallback((_) => setState(() {}));
  }

  @override
  void dispose() {
    _model.dispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (isiOS) {
      SystemChrome.setSystemUIOverlayStyle(
        SystemUiOverlayStyle(
          statusBarBrightness: Theme.of(context).brightness,
          systemStatusBarContrastEnforced: true,
        ),
      );
    }

    context.watch<FFAppState>();

    return GestureDetector(
      onTap: () => _model.unfocusNode.canRequestFocus
          ? FocusScope.of(context).requestFocus(_model.unfocusNode)
          : FocusScope.of(context).unfocus(),
      child: Scaffold(
        key: scaffoldKey,
        backgroundColor: FlutterFlowTheme.of(context).secondaryBackground,
        appBar: AppBar(
          backgroundColor: FlutterFlowTheme.of(context).primary,
          automaticallyImplyLeading: false,
          actions: [],
          flexibleSpace: FlexibleSpaceBar(
            title: Text(
              'Tools',
              style: FlutterFlowTheme.of(context).headlineLarge.override(
                    fontFamily: 'Outfit',
                    color: FlutterFlowTheme.of(context).info,
                  ),
            ),
            centerTitle: true,
            expandedTitleScale: 1.0,
          ),
          elevation: 2.0,
        ),
        body: Container(
          decoration: BoxDecoration(
            color: FlutterFlowTheme.of(context).secondaryBackground,
            image: DecorationImage(
              fit: BoxFit.cover,
              image: Image.asset(
                'assets/images/moon-and-star-png-hd-night-sky-view-with-shining-moon-and-blinking-stars-motion-background-videoblocks-1920.png',
              ).image,
            ),
          ),
          child: Column(
            mainAxisSize: MainAxisSize.max,
            children: [
              Expanded(
                child: Column(
                  children: [
                    Align(
                      alignment: Alignment(-1.0, 0),
                      child: FlutterFlowButtonTabBar(
                        useToggleButtonStyle: false,
                        isScrollable: true,
                        labelStyle: FlutterFlowTheme.of(context).titleMedium,
                        unselectedLabelStyle: TextStyle(),
                        labelColor: FlutterFlowTheme.of(context).warning,
                        unselectedLabelColor:
                            FlutterFlowTheme.of(context).secondaryText,
                        backgroundColor: FlutterFlowTheme.of(context).accent1,
                        borderColor: FlutterFlowTheme.of(context).primary,
                        borderWidth: 2.0,
                        borderRadius: 12.0,
                        elevation: 0.0,
                        labelPadding: EdgeInsetsDirectional.fromSTEB(
                            16.0, 0.0, 16.0, 0.0),
                        buttonMargin: EdgeInsetsDirectional.fromSTEB(
                            0.0, 12.0, 16.0, 0.0),
                        padding: EdgeInsetsDirectional.fromSTEB(
                            16.0, 0.0, 16.0, 0.0),
                        tabs: [
                          Tab(
                            text: 'White Noise',
                          ),
                          Tab(
                            text: 'Music',
                          ),
                          Tab(
                            text: 'Story',
                          ),
                          Tab(
                            text: 'Meditation',
                          ),
                          Tab(
                            text: 'Soundscape',
                          ),
                        ],
                        controller: _model.tabBarController,
                      ),
                    ),
                    Expanded(
                      child: TabBarView(
                        controller: _model.tabBarController,
                        children: [
                          SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              InkWell(
                                                splashColor: Colors.transparent,
                                                focusColor: Colors.transparent,
                                                hoverColor: Colors.transparent,
                                                highlightColor:
                                                    Colors.transparent,
                                                onDoubleTap: () async {
                                                  _model.soundPlayer1?.stop();
                                                },
                                                child: FlutterFlowIconButton(
                                                  borderColor:
                                                      FlutterFlowTheme.of(
                                                              context)
                                                          .primaryText,
                                                  borderRadius: 20.0,
                                                  borderWidth: 1.0,
                                                  buttonSize: 70.0,
                                                  fillColor: Color(0xFF0E4479),
                                                  icon: Icon(
                                                    Icons.water_drop,
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .info,
                                                    size: 40.0,
                                                  ),
                                                  onPressed: () async {
                                                    _model.soundPlayer1 ??=
                                                        AudioPlayer();
                                                    if (_model.soundPlayer1!
                                                        .playing) {
                                                      await _model.soundPlayer1!
                                                          .stop();
                                                    }
                                                    _model.soundPlayer1!
                                                        .setVolume(1.0);
                                                    _model.soundPlayer1!
                                                        .setUrl(
                                                            'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                        .then((_) => _model
                                                            .soundPlayer1!
                                                            .play());
                                                  },
                                                ),
                                              ),
                                              Text(
                                                'Rain',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons
                                                      .local_fire_department_sharp,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer2 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer2!.playing) {
                                                    await _model.soundPlayer2!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer2!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer2!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer2!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Camp Fire',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.waves,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer3 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer3!.playing) {
                                                    await _model.soundPlayer3!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer3!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer3!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer3!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Ocean Waves',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.music_note,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer4 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer4!.playing) {
                                                    await _model.soundPlayer4!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer4!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer4!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer4!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Flute',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.alarm,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer5 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer5!.playing) {
                                                    await _model.soundPlayer5!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer5!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer5!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer5!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Clock',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.bug_report_outlined,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer6 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer6!.playing) {
                                                    await _model.soundPlayer6!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer6!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer6!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer6!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Crickets',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.keyboard,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer7 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer7!.playing) {
                                                    await _model.soundPlayer7!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer7!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer7!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer7!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Keyboard',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              InkWell(
                                                splashColor: Colors.transparent,
                                                focusColor: Colors.transparent,
                                                hoverColor: Colors.transparent,
                                                highlightColor:
                                                    Colors.transparent,
                                                onDoubleTap: () async {
                                                  _model.soundPlayer8?.stop();
                                                },
                                                child: FlutterFlowIconButton(
                                                  borderColor:
                                                      FlutterFlowTheme.of(
                                                              context)
                                                          .primaryText,
                                                  borderRadius: 20.0,
                                                  borderWidth: 1.0,
                                                  buttonSize: 70.0,
                                                  fillColor: Color(0xFF0E4479),
                                                  icon: FaIcon(
                                                    FontAwesomeIcons.kiwiBird,
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .info,
                                                    size: 40.0,
                                                  ),
                                                  onPressed: () async {
                                                    _model.soundPlayer8 ??=
                                                        AudioPlayer();
                                                    if (_model.soundPlayer8!
                                                        .playing) {
                                                      await _model.soundPlayer8!
                                                          .stop();
                                                    }
                                                    _model.soundPlayer8!
                                                        .setVolume(1.0);
                                                    _model.soundPlayer8!
                                                        .setUrl(
                                                            'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1StvI1MwvvLOKD_uehjtcl5YLGoazEup_')
                                                        .then((_) => _model
                                                            .soundPlayer8!
                                                            .play());
                                                  },
                                                ),
                                              ),
                                              Text(
                                                'Seagull',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: FaIcon(
                                                  FontAwesomeIcons.wind,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer9 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer9!.playing) {
                                                    await _model.soundPlayer9!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer9!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer9!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer9!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Wind',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.noise_aware,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer10 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer10!.playing) {
                                                    await _model.soundPlayer10!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer10!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer10!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer10!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'White Noise',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.blur_on,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer11 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer11!.playing) {
                                                    await _model.soundPlayer11!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer11!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer11!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer11!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Blue Noise',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.gradient,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer12 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer12!.playing) {
                                                    await _model.soundPlayer12!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer12!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer12!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer12!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Green Noise',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: FaIcon(
                                                  FontAwesomeIcons.broom,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer13 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer13!.playing) {
                                                    await _model.soundPlayer13!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer13!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer13!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer13!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Brown Noise',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.fiber_pin,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer14 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer14!.playing) {
                                                    await _model.soundPlayer14!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer14!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer14!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer14!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Pink Noise',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: FaIcon(
                                                  FontAwesomeIcons.cloudRain,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer15 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer15!.playing) {
                                                    await _model.soundPlayer15!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer15!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer15!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer15!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Heavy Rain',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.thunderstorm_sharp,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer16 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer16!.playing) {
                                                    await _model.soundPlayer16!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer16!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer16!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer16!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Thunderstorm',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.piano,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer17 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer17!.playing) {
                                                    await _model.soundPlayer17!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer17!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer17!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer17!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Piano',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: FaIcon(
                                                  FontAwesomeIcons.train,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer18 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer18!.playing) {
                                                    await _model.soundPlayer18!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer18!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer18!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer18!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Train',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.bubble_chart,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer19 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer19!.playing) {
                                                    await _model.soundPlayer19!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer19!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer19!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer19!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Bubbles',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF0E4479),
                                                icon: Icon(
                                                  Icons.crop,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer20 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer20!.playing) {
                                                    await _model.soundPlayer20!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer20!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer20!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer20!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Crowd',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.speaker,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer21 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer21!.playing) {
                                                    await _model.soundPlayer21!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer21!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer21!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer21!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Sleep at Ease',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.insights,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer22 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer22!.playing) {
                                                    await _model.soundPlayer22!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer22!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer22!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer22!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Happy Night',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.developer_mode,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer23 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer23!.playing) {
                                                    await _model.soundPlayer23!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer23!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer23!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer23!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Deep',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.place,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer24 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer24!.playing) {
                                                    await _model.soundPlayer24!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer24!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer24!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer24!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Peaceful',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.stream_sharp,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer25 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer25!.playing) {
                                                    await _model.soundPlayer25!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer25!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer25!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer25!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Stress Relief',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              InkWell(
                                                splashColor: Colors.transparent,
                                                focusColor: Colors.transparent,
                                                hoverColor: Colors.transparent,
                                                highlightColor:
                                                    Colors.transparent,
                                                onDoubleTap: () async {
                                                  _model.soundPlayer26?.stop();
                                                },
                                                child: FlutterFlowIconButton(
                                                  borderColor:
                                                      FlutterFlowTheme.of(
                                                              context)
                                                          .primaryText,
                                                  borderRadius: 20.0,
                                                  borderWidth: 1.0,
                                                  buttonSize: 70.0,
                                                  fillColor: Color(0xFF1A790E),
                                                  icon: Icon(
                                                    Icons.houseboat,
                                                    color: FlutterFlowTheme.of(
                                                            context)
                                                        .info,
                                                    size: 40.0,
                                                  ),
                                                  onPressed: () async {
                                                    _model.soundPlayer26 ??=
                                                        AudioPlayer();
                                                    if (_model.soundPlayer26!
                                                        .playing) {
                                                      await _model
                                                          .soundPlayer26!
                                                          .stop();
                                                    }
                                                    _model.soundPlayer26!
                                                        .setVolume(1.0);
                                                    _model.soundPlayer26!
                                                        .setUrl(
                                                            'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                        .then((_) => _model
                                                            .soundPlayer26!
                                                            .play());
                                                  },
                                                ),
                                              ),
                                              Text(
                                                'Hope',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.monitor_heart,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer27 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer27!.playing) {
                                                    await _model.soundPlayer27!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer27!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer27!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer27!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Heart Beat',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.downhill_skiing,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer28 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer28!.playing) {
                                                    await _model.soundPlayer28!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer28!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer28!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer28!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Adventure',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      4.0, 8.0, 4.0, 0.0),
                                  child: Container(
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 8.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceEvenly,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.swipe_left_alt,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer29 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer29!.playing) {
                                                    await _model.soundPlayer29!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer29!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer29!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer29!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Sweet Dream',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.task,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer30 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer30!.playing) {
                                                    await _model.soundPlayer30!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer30!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer30!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer30!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Thankful',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.movie_filter_outlined,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer31 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer31!.playing) {
                                                    await _model.soundPlayer31!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer31!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer31!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer31!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Keep on Moving',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                          Column(
                                            mainAxisSize: MainAxisSize.max,
                                            children: [
                                              FlutterFlowIconButton(
                                                borderColor:
                                                    FlutterFlowTheme.of(context)
                                                        .primaryText,
                                                borderRadius: 20.0,
                                                borderWidth: 1.0,
                                                buttonSize: 70.0,
                                                fillColor: Color(0xFF1A790E),
                                                icon: Icon(
                                                  Icons.card_giftcard,
                                                  color: FlutterFlowTheme.of(
                                                          context)
                                                      .info,
                                                  size: 40.0,
                                                ),
                                                onPressed: () async {
                                                  _model.soundPlayer32 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer32!.playing) {
                                                    await _model.soundPlayer32!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer32!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer32!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gnGVkXnkwdKfiCNGwVUXE68-zOJAUkxR')
                                                      .then((_) => _model
                                                          .soundPlayer32!
                                                          .play());
                                                },
                                              ),
                                              Text(
                                                'Miracles',
                                                style: FlutterFlowTheme.of(
                                                        context)
                                                    .bodyMedium
                                                    .override(
                                                      fontFamily: 'Readex Pro',
                                                      color:
                                                          FlutterFlowTheme.of(
                                                                  context)
                                                              .info,
                                                    ),
                                              ),
                                            ],
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      16.0, 12.0, 16.0, 0.0),
                                  child: Container(
                                    width: double.infinity,
                                    decoration: BoxDecoration(
                                      color: FlutterFlowTheme.of(context)
                                          .primaryBackground,
                                      borderRadius: BorderRadius.circular(12.0),
                                    ),
                                    child: Padding(
                                      padding: EdgeInsetsDirectional.fromSTEB(
                                          8.0, 8.0, 12.0, 8.0),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.max,
                                        crossAxisAlignment:
                                            CrossAxisAlignment.center,
                                        children: [
                                          ClipRRect(
                                            borderRadius:
                                                BorderRadius.circular(8.0),
                                            child: Image.asset(
                                              'assets/images/The_Monkeys_Paw.jpeg',
                                              width: 70.0,
                                              height: 70.0,
                                              fit: BoxFit.cover,
                                            ),
                                          ),
                                          Padding(
                                            padding:
                                                EdgeInsetsDirectional.fromSTEB(
                                                    16.0, 0.0, 0.0, 0.0),
                                            child: Text(
                                              'The Tell-Tale Heart',
                                              style: FlutterFlowTheme.of(
                                                      context)
                                                  .bodyLarge
                                                  .override(
                                                    fontFamily: 'Readex Pro',
                                                    fontWeight: FontWeight.bold,
                                                  ),
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 175.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      8.0),
                                                          child: Image.asset(
                                                            'assets/images/The_Lottery.jpeg',
                                                            width: 107.0,
                                                            height: 105.0,
                                                            fit: BoxFit.cover,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'The Lottery',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 175.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      8.0),
                                                          child: Image.asset(
                                                            'assets/images/Little_Red_Riding_Hood.jpeg',
                                                            width: 107.0,
                                                            height: 105.0,
                                                            fit: BoxFit.cover,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Little Red Riding Hood',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceEvenly,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 175.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      8.0),
                                                          child: Image.asset(
                                                            'assets/images/The_Tell-Tale_Heart.jpeg',
                                                            width: 107.0,
                                                            height: 105.0,
                                                            fit: BoxFit.cover,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'The Tell-Tale Heart',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 175.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      8.0),
                                                          child: Image.asset(
                                                            'assets/images/The_Gift_of_the_Magi.jpeg',
                                                            width: 107.0,
                                                            height: 105.0,
                                                            fit: BoxFit.cover,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Little Red Riding Hood',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Padding(
                                  padding: EdgeInsetsDirectional.fromSTEB(
                                      16.0, 8.0, 16.0, 0.0),
                                  child: InkWell(
                                    splashColor: Colors.transparent,
                                    focusColor: Colors.transparent,
                                    hoverColor: Colors.transparent,
                                    highlightColor: Colors.transparent,
                                    onTap: () async {
                                      _model.soundPlayer33 ??= AudioPlayer();
                                      if (_model.soundPlayer33!.playing) {
                                        await _model.soundPlayer33!.stop();
                                      }
                                      _model.soundPlayer33!.setVolume(1.0);
                                      _model.soundPlayer33!
                                          .setUrl(
                                              'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gK79ABR7bxYQmfdIeake1uVRTtYUPMgi')
                                          .then((_) =>
                                              _model.soundPlayer33!.play());
                                    },
                                    onDoubleTap: () async {
                                      _model.soundPlayer33?.stop();
                                    },
                                    child: Container(
                                      width: double.infinity,
                                      decoration: BoxDecoration(
                                        color: FlutterFlowTheme.of(context)
                                            .primaryBackground,
                                        borderRadius:
                                            BorderRadius.circular(12.0),
                                      ),
                                      child: Padding(
                                        padding: EdgeInsetsDirectional.fromSTEB(
                                            8.0, 8.0, 12.0, 8.0),
                                        child: InkWell(
                                          splashColor: Colors.transparent,
                                          focusColor: Colors.transparent,
                                          hoverColor: Colors.transparent,
                                          highlightColor: Colors.transparent,
                                          onDoubleTap: () async {
                                            _model.soundPlayer33?.stop();
                                          },
                                          child: Row(
                                            mainAxisSize: MainAxisSize.max,
                                            crossAxisAlignment:
                                                CrossAxisAlignment.center,
                                            children: [
                                              InkWell(
                                                splashColor: Colors.transparent,
                                                focusColor: Colors.transparent,
                                                hoverColor: Colors.transparent,
                                                highlightColor:
                                                    Colors.transparent,
                                                onTap: () async {
                                                  _model.soundPlayer34 ??=
                                                      AudioPlayer();
                                                  if (_model
                                                      .soundPlayer34!.playing) {
                                                    await _model.soundPlayer34!
                                                        .stop();
                                                  }
                                                  _model.soundPlayer34!
                                                      .setVolume(1.0);
                                                  _model.soundPlayer34!
                                                      .setUrl(
                                                          'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1gK79ABR7bxYQmfdIeake1uVRTtYUPMgi')
                                                      .then((_) => _model
                                                          .soundPlayer34!
                                                          .play());
                                                },
                                                child: ClipRRect(
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          8.0),
                                                  child: Image.asset(
                                                    'assets/images/The_Ugly_Duckling.jpeg',
                                                    width: 70.0,
                                                    height: 70.0,
                                                    fit: BoxFit.cover,
                                                  ),
                                                ),
                                              ),
                                              Padding(
                                                padding: EdgeInsetsDirectional
                                                    .fromSTEB(
                                                        16.0, 0.0, 0.0, 0.0),
                                                child: Text(
                                                  'The Ugly Duckling',
                                                  style: FlutterFlowTheme.of(
                                                          context)
                                                      .bodyLarge,
                                                ),
                                              ),
                                            ],
                                          ),
                                        ),
                                      ),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 160.0,
                                            height: 250.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      0.0),
                                                          child: Image.asset(
                                                            'assets/images/soulconnect.jpeg',
                                                            width: 194.0,
                                                            height: 165.0,
                                                            fit: BoxFit.fill,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Soul Connect',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 160.0,
                                            height: 250.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: InkWell(
                                                      splashColor:
                                                          Colors.transparent,
                                                      focusColor:
                                                          Colors.transparent,
                                                      hoverColor:
                                                          Colors.transparent,
                                                      highlightColor:
                                                          Colors.transparent,
                                                      onTap: () async {
                                                        _model.soundPlayer35 ??=
                                                            AudioPlayer();
                                                        if (_model
                                                            .soundPlayer35!
                                                            .playing) {
                                                          await _model
                                                              .soundPlayer35!
                                                              .stop();
                                                        }
                                                        _model.soundPlayer35!
                                                            .setVolume(1.0);
                                                        _model.soundPlayer35!
                                                            .setUrl(
                                                                'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1rysi9-OJqEvYYyOGuckoHPXJoFaABqoc')
                                                            .then((_) => _model
                                                                .soundPlayer35!
                                                                .play());
                                                      },
                                                      onDoubleTap: () async {
                                                        _model.soundPlayer35
                                                            ?.stop();
                                                      },
                                                      child: Column(
                                                        mainAxisSize:
                                                            MainAxisSize.max,
                                                        children: [
                                                          InkWell(
                                                            splashColor: Colors
                                                                .transparent,
                                                            focusColor: Colors
                                                                .transparent,
                                                            hoverColor: Colors
                                                                .transparent,
                                                            highlightColor:
                                                                Colors
                                                                    .transparent,
                                                            onTap: () async {
                                                              _model.soundPlayer36 ??=
                                                                  AudioPlayer();
                                                              if (_model
                                                                  .soundPlayer36!
                                                                  .playing) {
                                                                await _model
                                                                    .soundPlayer36!
                                                                    .stop();
                                                              }
                                                              _model
                                                                  .soundPlayer36!
                                                                  .setVolume(
                                                                      1.0);
                                                              _model
                                                                  .soundPlayer36!
                                                                  .setUrl(
                                                                      'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1rysi9-OJqEvYYyOGuckoHPXJoFaABqoc')
                                                                  .then((_) => _model
                                                                      .soundPlayer36!
                                                                      .play());
                                                            },
                                                            child: ClipRRect(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          8.0),
                                                              child:
                                                                  Image.asset(
                                                                'assets/images/download.jpeg',
                                                                width: 150.0,
                                                                height: 162.0,
                                                                fit:
                                                                    BoxFit.fill,
                                                              ),
                                                            ),
                                                          ),
                                                          Padding(
                                                            padding:
                                                                EdgeInsetsDirectional
                                                                    .fromSTEB(
                                                                        16.0,
                                                                        0.0,
                                                                        0.0,
                                                                        0.0),
                                                            child: Text(
                                                              'Evening Routine',
                                                              style: FlutterFlowTheme
                                                                      .of(context)
                                                                  .bodyLarge
                                                                  .override(
                                                                    fontFamily:
                                                                        'Readex Pro',
                                                                    fontWeight:
                                                                        FontWeight
                                                                            .bold,
                                                                  ),
                                                            ),
                                                          ),
                                                        ],
                                                      ),
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 160.0,
                                            height: 250.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      8.0),
                                                          child: Image.asset(
                                                            'assets/images/lettinggo.jpeg',
                                                            width: 168.0,
                                                            height: 168.0,
                                                            fit: BoxFit.fill,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Letting Go',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 160.0,
                                            height: 250.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        InkWell(
                                                          splashColor: Colors
                                                              .transparent,
                                                          focusColor: Colors
                                                              .transparent,
                                                          hoverColor: Colors
                                                              .transparent,
                                                          highlightColor: Colors
                                                              .transparent,
                                                          onTap: () async {
                                                            _model.soundPlayer37 ??=
                                                                AudioPlayer();
                                                            if (_model
                                                                .soundPlayer37!
                                                                .playing) {
                                                              await _model
                                                                  .soundPlayer37!
                                                                  .stop();
                                                            }
                                                            _model
                                                                .soundPlayer37!
                                                                .setVolume(1.0);
                                                            _model
                                                                .soundPlayer37!
                                                                .setUrl(
                                                                    'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1rysi9-OJqEvYYyOGuckoHPXJoFaABqoc')
                                                                .then((_) => _model
                                                                    .soundPlayer37!
                                                                    .play());
                                                          },
                                                          child: ClipRRect(
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(
                                                                        8.0),
                                                            child: Image.asset(
                                                              'assets/images/forgiveness.jpeg',
                                                              width: 218.0,
                                                              height: 166.0,
                                                              fit: BoxFit.cover,
                                                            ),
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Forgiveness',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                          SingleChildScrollView(
                            child: Column(
                              mainAxisSize: MainAxisSize.max,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 150.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      0.0),
                                                          child: Image.asset(
                                                            'assets/images/rainonpuddles.jpeg',
                                                            width: 194.0,
                                                            height: 110.0,
                                                            fit: BoxFit.fill,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Rain Puddles',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 150.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        InkWell(
                                                          splashColor: Colors
                                                              .transparent,
                                                          focusColor: Colors
                                                              .transparent,
                                                          hoverColor: Colors
                                                              .transparent,
                                                          highlightColor: Colors
                                                              .transparent,
                                                          onTap: () async {
                                                            _model.soundPlayer38 ??=
                                                                AudioPlayer();
                                                            if (_model
                                                                .soundPlayer38!
                                                                .playing) {
                                                              await _model
                                                                  .soundPlayer38!
                                                                  .stop();
                                                            }
                                                            _model
                                                                .soundPlayer38!
                                                                .setVolume(1.0);
                                                            _model
                                                                .soundPlayer38!
                                                                .setUrl(
                                                                    'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1rysi9-OJqEvYYyOGuckoHPXJoFaABqoc')
                                                                .then((_) => _model
                                                                    .soundPlayer38!
                                                                    .play());
                                                          },
                                                          child: ClipRRect(
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(
                                                                        8.0),
                                                            child: Image.asset(
                                                              'assets/images/perrienight.jpeg',
                                                              width: 167.0,
                                                              height: 110.0,
                                                              fit: BoxFit.fill,
                                                            ),
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Prairie Night',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 150.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      0.0),
                                                          child: Image.asset(
                                                            'assets/images/wetland.jpeg',
                                                            width: 194.0,
                                                            height: 110.0,
                                                            fit: BoxFit.fill,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'WetLand',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 150.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        InkWell(
                                                          splashColor: Colors
                                                              .transparent,
                                                          focusColor: Colors
                                                              .transparent,
                                                          hoverColor: Colors
                                                              .transparent,
                                                          highlightColor: Colors
                                                              .transparent,
                                                          onTap: () async {
                                                            _model.soundPlayer39 ??=
                                                                AudioPlayer();
                                                            if (_model
                                                                .soundPlayer39!
                                                                .playing) {
                                                              await _model
                                                                  .soundPlayer39!
                                                                  .stop();
                                                            }
                                                            _model
                                                                .soundPlayer39!
                                                                .setVolume(1.0);
                                                            _model
                                                                .soundPlayer39!
                                                                .setUrl(
                                                                    'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1rysi9-OJqEvYYyOGuckoHPXJoFaABqoc')
                                                                .then((_) => _model
                                                                    .soundPlayer39!
                                                                    .play());
                                                          },
                                                          onDoubleTap:
                                                              () async {
                                                            _model.soundPlayer39
                                                                ?.stop();
                                                          },
                                                          child: ClipRRect(
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(
                                                                        8.0),
                                                            child: Image.asset(
                                                              'assets/images/light_rain.jpeg',
                                                              width: 167.0,
                                                              height: 110.0,
                                                              fit: BoxFit.fill,
                                                            ),
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Light Rain',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                                Row(
                                  mainAxisSize: MainAxisSize.max,
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 150.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(
                                                                      0.0),
                                                          child: Image.asset(
                                                            'assets/images/ocena_shore.jpeg',
                                                            width: 194.0,
                                                            height: 110.0,
                                                            fit: BoxFit.fill,
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Ocean Shore',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    Column(
                                      mainAxisSize: MainAxisSize.max,
                                      children: [
                                        Padding(
                                          padding:
                                              EdgeInsetsDirectional.fromSTEB(
                                                  16.0, 8.0, 16.0, 8.0),
                                          child: Container(
                                            width: 150.0,
                                            height: 150.0,
                                            decoration: BoxDecoration(
                                              color:
                                                  FlutterFlowTheme.of(context)
                                                      .secondaryBackground,
                                              borderRadius:
                                                  BorderRadius.circular(15.0),
                                            ),
                                            child: Padding(
                                              padding: EdgeInsetsDirectional
                                                  .fromSTEB(
                                                      8.0, 8.0, 12.0, 8.0),
                                              child: Row(
                                                mainAxisSize: MainAxisSize.max,
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.center,
                                                children: [
                                                  Expanded(
                                                    child: Column(
                                                      mainAxisSize:
                                                          MainAxisSize.max,
                                                      children: [
                                                        InkWell(
                                                          splashColor: Colors
                                                              .transparent,
                                                          focusColor: Colors
                                                              .transparent,
                                                          hoverColor: Colors
                                                              .transparent,
                                                          highlightColor: Colors
                                                              .transparent,
                                                          onTap: () async {
                                                            _model.soundPlayer40 ??=
                                                                AudioPlayer();
                                                            if (_model
                                                                .soundPlayer40!
                                                                .playing) {
                                                              await _model
                                                                  .soundPlayer40!
                                                                  .stop();
                                                            }
                                                            _model
                                                                .soundPlayer40!
                                                                .setVolume(1.0);
                                                            _model
                                                                .soundPlayer40!
                                                                .setUrl(
                                                                    'https://drive.google.com/uc?export=download&confirm=no_antivirus&id=1nAUHv3SB0tkvyb9IPm2u7z-SqUvXWdow')
                                                                .then((_) => _model
                                                                    .soundPlayer40!
                                                                    .play());
                                                          },
                                                          child: ClipRRect(
                                                            borderRadius:
                                                                BorderRadius
                                                                    .circular(
                                                                        8.0),
                                                            child: Image.asset(
                                                              'assets/images/images.jpeg',
                                                              width: 167.0,
                                                              height: 110.0,
                                                              fit: BoxFit.fill,
                                                            ),
                                                          ),
                                                        ),
                                                        Padding(
                                                          padding:
                                                              EdgeInsetsDirectional
                                                                  .fromSTEB(
                                                                      16.0,
                                                                      0.0,
                                                                      0.0,
                                                                      0.0),
                                                          child: Text(
                                                            'Shore Birds',
                                                            style: FlutterFlowTheme
                                                                    .of(context)
                                                                .bodyLarge
                                                                .override(
                                                                  fontFamily:
                                                                      'Readex Pro',
                                                                  fontWeight:
                                                                      FontWeight
                                                                          .bold,
                                                                ),
                                                          ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                ],
                                              ),
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
