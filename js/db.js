let dbPromised = idb.open("premier-league", 1, function(upgradeDb) {
    let articlesObjectStore = upgradeDb.createObjectStore("savedTeam", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
  });

  function saveForLater(club) {
    dbPromised
      .then(function(db) {
        const tx = db.transaction("savedTeam", "readwrite");
        const store = tx.objectStore("savedTeam");
        console.log(club);
        store.put(club);
        return tx.complete;
      })
      .then(function() {
        console.log("Tim berhasil di simpan.");
      });
  }

  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("savedTeam", "readonly");
          const store = tx.objectStore("savedTeam");
          return store.getAll();
        })
        .then(function(savedTeam) {
          console.log(savedTeam);
          resolve(savedTeam);
        });
    });
  }

  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("savedTeam", "readonly");
          const store = tx.objectStore("savedTeam");
          return store.get(parseInt(id));
        })
        .then(function(savedTeam) {
          console.log(savedTeam);
          resolve(savedTeam);
        });
    });
  }

  function deleteTeam(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          const tx = db.transaction("savedTeam", "readwrite");
          const store = tx.objectStore("savedTeam");
          return store.delete(parseInt(id));
        })
        .then(function(savedTeam) {
          console.log('Tim telah di hapus');
        });
    });
  }