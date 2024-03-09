-- SQL scritps used to populate psql db
CREATE TABLE team (
	team_name VARCHAR(64) PRIMARY KEY,
	has_redeemed BOOLEAN DEFAULT 'false',
	redeemed_at VARCHAR(64)
);

CREATE TABLE staff (
	staff_pass_id VARCHAR(64) PRIMARY KEY,
	team_name VARCHAR(64) REFERENCES team(team_name)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ally;