
CREATE TABLE tdl_users (
  
  Username VARCHAR(120),
  Password VARCHAR(120),
  
  PRIMARY KEY (Username)

  );

CREATE TABLE tdl_tasks(

  Id serial     --autoincremental pk
  Checked INTEGER, --INTEGER??
  TaskText TEXT,
  Emoji INTEGER NOT NULL,
  Username VARCHAR(120),

  FOREIGN KEY Username REFERENCES tdl_users(Username),
  PRIMARY KEY (Id)
  
);


-- 0: 💩
-- 1: 🐵
-- 2: 🍟
-- 3: 💲
-- 4: 👺
-- 5: 🐁
-- 6: 🏎️
-- 7: 🥑
-- 8: 🚬
-- 9: 📎