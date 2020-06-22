import { firestoreDB, fbfs } from '../utils/firebase.js'

export var addEvent = (sev = 1, comment, lat, lng) => {

    console.log(`Add Event with Severity:${sev}, Comment:${comment}, ${lat}, ${lng}`)

    const dbPath = '/maps'

    return firestoreDB.collection(dbPath)/* .doc(autoID) */
        // add items to FS
        .add({

            loc: new fbfs.GeoPoint(lat, lng),
            // loc: [lat, lng],
            sev: sev,
            source: 'custom',
            text: comment

        })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });


}
