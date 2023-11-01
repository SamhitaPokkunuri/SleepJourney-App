import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class ArticlesRecord extends FirestoreRecord {
  ArticlesRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "title" field.
  String? _title;
  String get title => _title ?? '';
  bool hasTitle() => _title != null;

  // "shortdesc" field.
  String? _shortdesc;
  String get shortdesc => _shortdesc ?? '';
  bool hasShortdesc() => _shortdesc != null;

  // "longdesc" field.
  String? _longdesc;
  String get longdesc => _longdesc ?? '';
  bool hasLongdesc() => _longdesc != null;

  // "publishdate" field.
  String? _publishdate;
  String get publishdate => _publishdate ?? '';
  bool hasPublishdate() => _publishdate != null;

  // "imageurl" field.
  String? _imageurl;
  String get imageurl => _imageurl ?? '';
  bool hasImageurl() => _imageurl != null;

  void _initializeFields() {
    _title = snapshotData['title'] as String?;
    _shortdesc = snapshotData['shortdesc'] as String?;
    _longdesc = snapshotData['longdesc'] as String?;
    _publishdate = snapshotData['publishdate'] as String?;
    _imageurl = snapshotData['imageurl'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('articles');

  static Stream<ArticlesRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => ArticlesRecord.fromSnapshot(s));

  static Future<ArticlesRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => ArticlesRecord.fromSnapshot(s));

  static ArticlesRecord fromSnapshot(DocumentSnapshot snapshot) =>
      ArticlesRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static ArticlesRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      ArticlesRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'ArticlesRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is ArticlesRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createArticlesRecordData({
  String? title,
  String? shortdesc,
  String? longdesc,
  String? publishdate,
  String? imageurl,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'title': title,
      'shortdesc': shortdesc,
      'longdesc': longdesc,
      'publishdate': publishdate,
      'imageurl': imageurl,
    }.withoutNulls,
  );

  return firestoreData;
}

class ArticlesRecordDocumentEquality implements Equality<ArticlesRecord> {
  const ArticlesRecordDocumentEquality();

  @override
  bool equals(ArticlesRecord? e1, ArticlesRecord? e2) {
    return e1?.title == e2?.title &&
        e1?.shortdesc == e2?.shortdesc &&
        e1?.longdesc == e2?.longdesc &&
        e1?.publishdate == e2?.publishdate &&
        e1?.imageurl == e2?.imageurl;
  }

  @override
  int hash(ArticlesRecord? e) => const ListEquality()
      .hash([e?.title, e?.shortdesc, e?.longdesc, e?.publishdate, e?.imageurl]);

  @override
  bool isValidKey(Object? o) => o is ArticlesRecord;
}
