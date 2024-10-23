INSERT INTO department (name) VALUES ('Coaching Staff'), ('Player Personnel'), ('Front Office'), ('Training Staff');

INSERT INTO roles (title, salary, department_id) VALUES
  ('Head Coach', 2000000, 1),
  ('Offensive Coordinator', 1000000, 1),
  ('Defensive Coordinator', 1000000, 1),
  ('Scout', 90000, 2),
  ('General Manager', 1500000, 3),
  ('Team Attorney', 250000, 3),
  ('Strength and Conditioning Coach', 150000, 4),
  ('Athletic Trainer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Mike', 'Tomlin', 1, null),
  ('Matt', 'Canada', 2, 1),
  ('Teryl', 'Austin', 3, 1),
  ('Kevin', 'Colbert', 4, 1),
  ('Ben', 'Roethlisberger', 5, 1),
  ('Tom', 'Holt', 6, 1),
  ('Troy', 'Hand', 7, 1),
  ('John', 'Norris', 8, 1);