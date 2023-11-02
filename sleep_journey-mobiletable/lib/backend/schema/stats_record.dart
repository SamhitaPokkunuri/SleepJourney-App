import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class StatsRecord extends FirestoreRecord {
  StatsRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "InBed" field.
  String? _inBed;
  String get inBed => _inBed ?? '';
  bool hasInBed() => _inBed != null;

  // "InAsleep" field.
  String? _inAsleep;
  String get inAsleep => _inAsleep ?? '';
  bool hasInAsleep() => _inAsleep != null;

  // "InAsleepAfter" field.
  String? _inAsleepAfter;
  String get inAsleepAfter => _inAsleepAfter ?? '';
  bool hasInAsleepAfter() => _inAsleepAfter != null;

  // "Noise" field.
  String? _noise;
  String get noise => _noise ?? '';
  bool hasNoise() => _noise != null;

  // "pDeepSleep" field.
  String? _pDeepSleep;
  String get pDeepSleep => _pDeepSleep ?? '';
  bool hasPDeepSleep() => _pDeepSleep != null;

  // "pLightSleep" field.
  String? _pLightSleep;
  String get pLightSleep => _pLightSleep ?? '';
  bool hasPLightSleep() => _pLightSleep != null;

  // "pREM" field.
  String? _pREM;
  String get pREM => _pREM ?? '';
  bool hasPREM() => _pREM != null;

  // "pAwake" field.
  String? _pAwake;
  String get pAwake => _pAwake ?? '';
  bool hasPAwake() => _pAwake != null;

  // "SleepNotes" field.
  String? _sleepNotes;
  String get sleepNotes => _sleepNotes ?? '';
  bool hasSleepNotes() => _sleepNotes != null;

  // "BedStartTime" field.
  String? _bedStartTime;
  String get bedStartTime => _bedStartTime ?? '';
  bool hasBedStartTime() => _bedStartTime != null;

  // "BedEndTime" field.
  String? _bedEndTime;
  String get bedEndTime => _bedEndTime ?? '';
  bool hasBedEndTime() => _bedEndTime != null;

  // "SleepQuality" field.
  String? _sleepQuality;
  String get sleepQuality => _sleepQuality ?? '';
  bool hasSleepQuality() => _sleepQuality != null;

  // "StatImages" field.
  List<String>? _statImages;
  List<String> get statImages => _statImages ?? const [];
  bool hasStatImages() => _statImages != null;

  // "TimeAsleep" field.
  String? _timeAsleep;
  String get timeAsleep => _timeAsleep ?? '';
  bool hasTimeAsleep() => _timeAsleep != null;

  // "FellAsleepIn" field.
  String? _fellAsleepIn;
  String get fellAsleepIn => _fellAsleepIn ?? '';
  bool hasFellAsleepIn() => _fellAsleepIn != null;

  // "DeepSleepIn" field.
  String? _deepSleepIn;
  String get deepSleepIn => _deepSleepIn ?? '';
  bool hasDeepSleepIn() => _deepSleepIn != null;

  // "SnoreTimeIn" field.
  String? _snoreTimeIn;
  String get snoreTimeIn => _snoreTimeIn ?? '';
  bool hasSnoreTimeIn() => _snoreTimeIn != null;

  // "today" field.
  String? _today;
  String get today => _today ?? '';
  bool hasToday() => _today != null;

  // "SleepScoreProgress" field.
  double? _sleepScoreProgress;
  double get sleepScoreProgress => _sleepScoreProgress ?? 0.0;
  bool hasSleepScoreProgress() => _sleepScoreProgress != null;

  // "SleepScoreValue" field.
  String? _sleepScoreValue;
  String get sleepScoreValue => _sleepScoreValue ?? '';
  bool hasSleepScoreValue() => _sleepScoreValue != null;

  // "pPerDeepSleep" field.
  double? _pPerDeepSleep;
  double get pPerDeepSleep => _pPerDeepSleep ?? 0.0;
  bool hasPPerDeepSleep() => _pPerDeepSleep != null;

  // "pPerLightSleep" field.
  double? _pPerLightSleep;
  double get pPerLightSleep => _pPerLightSleep ?? 0.0;
  bool hasPPerLightSleep() => _pPerLightSleep != null;

  // "pMinDeepSleep" field.
  String? _pMinDeepSleep;
  String get pMinDeepSleep => _pMinDeepSleep ?? '';
  bool hasPMinDeepSleep() => _pMinDeepSleep != null;

  // "pMinLightSleep" field.
  String? _pMinLightSleep;
  String get pMinLightSleep => _pMinLightSleep ?? '';
  bool hasPMinLightSleep() => _pMinLightSleep != null;

  // "pPerREM" field.
  double? _pPerREM;
  double get pPerREM => _pPerREM ?? 0.0;
  bool hasPPerREM() => _pPerREM != null;

  // "pPerAwake" field.
  double? _pPerAwake;
  double get pPerAwake => _pPerAwake ?? 0.0;
  bool hasPPerAwake() => _pPerAwake != null;

  // "pMinREM" field.
  String? _pMinREM;
  String get pMinREM => _pMinREM ?? '';
  bool hasPMinREM() => _pMinREM != null;

  // "pMinAwake" field.
  String? _pMinAwake;
  String get pMinAwake => _pMinAwake ?? '';
  bool hasPMinAwake() => _pMinAwake != null;

  // "listTime" field.
  List<int>? _listTime;
  List<int> get listTime => _listTime ?? const [];
  bool hasListTime() => _listTime != null;

  // "listSleep" field.
  List<int>? _listSleep;
  List<int> get listSleep => _listSleep ?? const [];
  bool hasListSleep() => _listSleep != null;

  // "nTalks" field.
  int? _nTalks;
  int get nTalks => _nTalks ?? 0;
  bool hasNTalks() => _nTalks != null;

  // "nBrux" field.
  int? _nBrux;
  int get nBrux => _nBrux ?? 0;
  bool hasNBrux() => _nBrux != null;

  // "nSnoring" field.
  int? _nSnoring;
  int get nSnoring => _nSnoring ?? 0;
  bool hasNSnoring() => _nSnoring != null;

  // "nCoughing" field.
  int? _nCoughing;
  int get nCoughing => _nCoughing ?? 0;
  bool hasNCoughing() => _nCoughing != null;

  // "nInsomnia" field.
  int? _nInsomnia;
  int get nInsomnia => _nInsomnia ?? 0;
  bool hasNInsomnia() => _nInsomnia != null;

  // "nApnea" field.
  int? _nApnea;
  int get nApnea => _nApnea ?? 0;
  bool hasNApnea() => _nApnea != null;

  // "SleepImage" field.
  String? _sleepImage;
  String get sleepImage => _sleepImage ?? '';
  bool hasSleepImage() => _sleepImage != null;

  void _initializeFields() {
    _inBed = snapshotData['InBed'] as String?;
    _inAsleep = snapshotData['InAsleep'] as String?;
    _inAsleepAfter = snapshotData['InAsleepAfter'] as String?;
    _noise = snapshotData['Noise'] as String?;
    _pDeepSleep = snapshotData['pDeepSleep'] as String?;
    _pLightSleep = snapshotData['pLightSleep'] as String?;
    _pREM = snapshotData['pREM'] as String?;
    _pAwake = snapshotData['pAwake'] as String?;
    _sleepNotes = snapshotData['SleepNotes'] as String?;
    _bedStartTime = snapshotData['BedStartTime'] as String?;
    _bedEndTime = snapshotData['BedEndTime'] as String?;
    _sleepQuality = snapshotData['SleepQuality'] as String?;
    _statImages = getDataList(snapshotData['StatImages']);
    _timeAsleep = snapshotData['TimeAsleep'] as String?;
    _fellAsleepIn = snapshotData['FellAsleepIn'] as String?;
    _deepSleepIn = snapshotData['DeepSleepIn'] as String?;
    _snoreTimeIn = snapshotData['SnoreTimeIn'] as String?;
    _today = snapshotData['today'] as String?;
    _sleepScoreProgress =
        castToType<double>(snapshotData['SleepScoreProgress']);
    _sleepScoreValue = snapshotData['SleepScoreValue'] as String?;
    _pPerDeepSleep = castToType<double>(snapshotData['pPerDeepSleep']);
    _pPerLightSleep = castToType<double>(snapshotData['pPerLightSleep']);
    _pMinDeepSleep = snapshotData['pMinDeepSleep'] as String?;
    _pMinLightSleep = snapshotData['pMinLightSleep'] as String?;
    _pPerREM = castToType<double>(snapshotData['pPerREM']);
    _pPerAwake = castToType<double>(snapshotData['pPerAwake']);
    _pMinREM = snapshotData['pMinREM'] as String?;
    _pMinAwake = snapshotData['pMinAwake'] as String?;
    _listTime = getDataList(snapshotData['listTime']);
    _listSleep = getDataList(snapshotData['listSleep']);
    _nTalks = castToType<int>(snapshotData['nTalks']);
    _nBrux = castToType<int>(snapshotData['nBrux']);
    _nSnoring = castToType<int>(snapshotData['nSnoring']);
    _nCoughing = castToType<int>(snapshotData['nCoughing']);
    _nInsomnia = castToType<int>(snapshotData['nInsomnia']);
    _nApnea = castToType<int>(snapshotData['nApnea']);
    _sleepImage = snapshotData['SleepImage'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('stats');

  static Stream<StatsRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => StatsRecord.fromSnapshot(s));

  static Future<StatsRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => StatsRecord.fromSnapshot(s));

  static StatsRecord fromSnapshot(DocumentSnapshot snapshot) => StatsRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static StatsRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      StatsRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'StatsRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is StatsRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createStatsRecordData({
  String? inBed,
  String? inAsleep,
  String? inAsleepAfter,
  String? noise,
  String? pDeepSleep,
  String? pLightSleep,
  String? pREM,
  String? pAwake,
  String? sleepNotes,
  String? bedStartTime,
  String? bedEndTime,
  String? sleepQuality,
  String? timeAsleep,
  String? fellAsleepIn,
  String? deepSleepIn,
  String? snoreTimeIn,
  String? today,
  double? sleepScoreProgress,
  String? sleepScoreValue,
  double? pPerDeepSleep,
  double? pPerLightSleep,
  String? pMinDeepSleep,
  String? pMinLightSleep,
  double? pPerREM,
  double? pPerAwake,
  String? pMinREM,
  String? pMinAwake,
  int? nTalks,
  int? nBrux,
  int? nSnoring,
  int? nCoughing,
  int? nInsomnia,
  int? nApnea,
  String? sleepImage,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'InBed': inBed,
      'InAsleep': inAsleep,
      'InAsleepAfter': inAsleepAfter,
      'Noise': noise,
      'pDeepSleep': pDeepSleep,
      'pLightSleep': pLightSleep,
      'pREM': pREM,
      'pAwake': pAwake,
      'SleepNotes': sleepNotes,
      'BedStartTime': bedStartTime,
      'BedEndTime': bedEndTime,
      'SleepQuality': sleepQuality,
      'TimeAsleep': timeAsleep,
      'FellAsleepIn': fellAsleepIn,
      'DeepSleepIn': deepSleepIn,
      'SnoreTimeIn': snoreTimeIn,
      'today': today,
      'SleepScoreProgress': sleepScoreProgress,
      'SleepScoreValue': sleepScoreValue,
      'pPerDeepSleep': pPerDeepSleep,
      'pPerLightSleep': pPerLightSleep,
      'pMinDeepSleep': pMinDeepSleep,
      'pMinLightSleep': pMinLightSleep,
      'pPerREM': pPerREM,
      'pPerAwake': pPerAwake,
      'pMinREM': pMinREM,
      'pMinAwake': pMinAwake,
      'nTalks': nTalks,
      'nBrux': nBrux,
      'nSnoring': nSnoring,
      'nCoughing': nCoughing,
      'nInsomnia': nInsomnia,
      'nApnea': nApnea,
      'SleepImage': sleepImage,
    }.withoutNulls,
  );

  return firestoreData;
}

class StatsRecordDocumentEquality implements Equality<StatsRecord> {
  const StatsRecordDocumentEquality();

  @override
  bool equals(StatsRecord? e1, StatsRecord? e2) {
    const listEquality = ListEquality();
    return e1?.inBed == e2?.inBed &&
        e1?.inAsleep == e2?.inAsleep &&
        e1?.inAsleepAfter == e2?.inAsleepAfter &&
        e1?.noise == e2?.noise &&
        e1?.pDeepSleep == e2?.pDeepSleep &&
        e1?.pLightSleep == e2?.pLightSleep &&
        e1?.pREM == e2?.pREM &&
        e1?.pAwake == e2?.pAwake &&
        e1?.sleepNotes == e2?.sleepNotes &&
        e1?.bedStartTime == e2?.bedStartTime &&
        e1?.bedEndTime == e2?.bedEndTime &&
        e1?.sleepQuality == e2?.sleepQuality &&
        listEquality.equals(e1?.statImages, e2?.statImages) &&
        e1?.timeAsleep == e2?.timeAsleep &&
        e1?.fellAsleepIn == e2?.fellAsleepIn &&
        e1?.deepSleepIn == e2?.deepSleepIn &&
        e1?.snoreTimeIn == e2?.snoreTimeIn &&
        e1?.today == e2?.today &&
        e1?.sleepScoreProgress == e2?.sleepScoreProgress &&
        e1?.sleepScoreValue == e2?.sleepScoreValue &&
        e1?.pPerDeepSleep == e2?.pPerDeepSleep &&
        e1?.pPerLightSleep == e2?.pPerLightSleep &&
        e1?.pMinDeepSleep == e2?.pMinDeepSleep &&
        e1?.pMinLightSleep == e2?.pMinLightSleep &&
        e1?.pPerREM == e2?.pPerREM &&
        e1?.pPerAwake == e2?.pPerAwake &&
        e1?.pMinREM == e2?.pMinREM &&
        e1?.pMinAwake == e2?.pMinAwake &&
        listEquality.equals(e1?.listTime, e2?.listTime) &&
        listEquality.equals(e1?.listSleep, e2?.listSleep) &&
        e1?.nTalks == e2?.nTalks &&
        e1?.nBrux == e2?.nBrux &&
        e1?.nSnoring == e2?.nSnoring &&
        e1?.nCoughing == e2?.nCoughing &&
        e1?.nInsomnia == e2?.nInsomnia &&
        e1?.nApnea == e2?.nApnea &&
        e1?.sleepImage == e2?.sleepImage;
  }

  @override
  int hash(StatsRecord? e) => const ListEquality().hash([
        e?.inBed,
        e?.inAsleep,
        e?.inAsleepAfter,
        e?.noise,
        e?.pDeepSleep,
        e?.pLightSleep,
        e?.pREM,
        e?.pAwake,
        e?.sleepNotes,
        e?.bedStartTime,
        e?.bedEndTime,
        e?.sleepQuality,
        e?.statImages,
        e?.timeAsleep,
        e?.fellAsleepIn,
        e?.deepSleepIn,
        e?.snoreTimeIn,
        e?.today,
        e?.sleepScoreProgress,
        e?.sleepScoreValue,
        e?.pPerDeepSleep,
        e?.pPerLightSleep,
        e?.pMinDeepSleep,
        e?.pMinLightSleep,
        e?.pPerREM,
        e?.pPerAwake,
        e?.pMinREM,
        e?.pMinAwake,
        e?.listTime,
        e?.listSleep,
        e?.nTalks,
        e?.nBrux,
        e?.nSnoring,
        e?.nCoughing,
        e?.nInsomnia,
        e?.nApnea,
        e?.sleepImage
      ]);

  @override
  bool isValidKey(Object? o) => o is StatsRecord;
}
