import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

Future initFirebase() async {
  if (kIsWeb) {
    await Firebase.initializeApp(
        options: FirebaseOptions(
            apiKey: "AIzaSyBEKPDFknshmq94--BRoCfaWNT1xQZK21o",
            authDomain: "sleepjourney-8606d.firebaseapp.com",
            projectId: "sleepjourney-8606d",
            storageBucket: "sleepjourney-8606d.appspot.com",
            messagingSenderId: "917592253518",
            appId: "1:917592253518:web:4c8bec82f6a52cb3e18f1f",
            measurementId: "G-V3TNV60RT5"));
  } else {
    await Firebase.initializeApp();
  }
}
