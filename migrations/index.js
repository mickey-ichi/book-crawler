const db = require('../db');

db.query(`CREATE TABLE IF NOT EXISTS books (
          id         INT(10) AUTO_INCREMENT  PRIMARY KEY,
          name       VARCHAR(255) NOT NULL,
          upc_code   VARCHAR(20) NOT NULL,
          category   VARCHAR(255) NOT NULL,
          price      FLOAT        NULL,
          image_src  VARCHAR(255) NULL,
          status     TINYINT      NULL,
          star       TINYINT      NULL,
          CONSTRAINT upc_code
          UNIQUE (upc_code)
        ) CHARSET = utf8;
    `, function (err, result) {
        if (err) throw err;
        console.log("Table books created");
    }
);

db.query(`CREATE TABLE IF NOT EXISTS categories (
          id         INT(10) AUTO_INCREMENT  PRIMARY KEY,
          name       VARCHAR(255) NOT NULL,
                    value      VARCHAR(20) NOT NULL,
          CONSTRAINT value
          UNIQUE (value)
        ) CHARSET = utf8;
    `, function (err, result) {
        if (err) throw err;
        console.log("Table categories created");
    }
);

