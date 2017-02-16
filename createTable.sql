-- Users
CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(40) NOT NULL,
    firstname VARCHAR(40),
    lastname VARCHAR(40),
    password VARCHAR(20) NOT NULL,
    address VARCHAR(100),
    zip VARCHAR(10),
    city VARCHAR(40),
    state VARCHAR(40),
    country VARCHAR(40),
    PRIMARY KEY(username)
);


-- Machines
-- machine_id is given by developers
CREATE TABLE IF NOT EXISTS machines (
    machine_id INT NOT NULL,
    idle_power FLOAT NOT NULL,
    running_time_minute INT NOT NULL,
    address VARCHAR(100),
    zip VARCHAR(10),
    city VARCHAR(40),
    state VARCHAR(40),
    country VARCHAR(40),
    PRIMARY KEY(machine_id)
);


-- Schedule
CREATE TABLE IF NOT EXISTS schedules (
    username VARCHAR(40) NOT NULL,
    machine_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME,
    PRIMARY KEY(username, machine_id, start_time),
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY (machine_id) REFERENCES machines(machine_id) ON DELETE CASCADE
);


-- Schedule without login
CREATE TABLE IF NOT EXISTS schedules_annonymous (
    machine_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    PRIMARY KEY(machine_id, start_time, end_time),
    FOREIGN KEY (machine_id) REFERENCES machines(machine_id) ON DELETE CASCADE
);
